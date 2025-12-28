import jwt from 'jsonwebtoken';
import { User } from './user.models.js';
import { sendMails } from './sendEmails.js';
import CharCryptor from './encryptPass.js';
import dotenv from "dotenv";
import nodemailer from 'nodemailer';
dotenv.config();

// Store OTPs temporarily (in production, use Redis or database)
const otpStore = new Map();

const loginStatus = async (req, res) => {
    if (req.cookies.token) {
        console.log("isAuthenticated: true");
        res.json({ isAuthenticated: true });
    } else {
        console.log("isAuthenticated: false");
        res.json({ isAuthenticated: false });
    }
}

const logout = async (req, res) => {
    res.clearCookie("token");
    console.log("Logged Out");
    res.json({ message: "Logged out successfully" });
}

function userId(req) {
    const token = req.cookies.token;
    if (!token) {
        return ""
    }
    return jwt.verify(token, process.env.secret).id;
}

const sendEmail = async (req, res) => {
    try {
        const id = userId(req);
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let { emails, subject, body } = req.body;

        if (typeof emails === 'string') {
            emails = emails.split(',').map(email => email.trim());
        }

        const { email: userEmail, password: userStoredEncryptedPassword } = user;

        const cryptor = new CharCryptor(userStoredEncryptedPassword);
        cryptor.encryptionKey = user.encKey;
        cryptor.decrypt();
        const decryptedPassword = cryptor.getEncryptedText();

        if (!emails || emails.length === 0 || !userEmail || !decryptedPassword || !subject || !body) {
            return res.status(400).json({ message: "All required fields (recipients, subject, body, sender's credentials) must be provided." });
        }

        if(req.file) {
            console.log("Attachment uploaded");
        }

        // Pass the file object directly to sendMails
        const response = await sendMails(emails, userEmail, decryptedPassword, subject, body, req.file);

        if (response.success) {
            console.log("Emails sent!");
            return res.status(200).json({ message: "Emails sent!" });
        } else {
            return res.status(400).json({ message: response.message });
        }
    } catch (err) {
        console.log("Some error occurred\n" + err.message);
        return res.status(500).json({ message: "Failed to send emails.", error: err.message });
    }
};

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: "User already exists" });
        }

        const cryptor = new CharCryptor(password);
        cryptor.encrypt();
        const encryptedPassword = cryptor.getEncryptedText();
        const encryptionKey = cryptor.getEncryptionKey();

        const newUser = new User({ email: email, password: encryptedPassword, encKey: encryptionKey });

        await newUser.save();
        return res.status(201).json({ message: "Signup successful" });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Signup failed", error: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Enter email and password" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const cryptor = new CharCryptor(user.password);
        cryptor.encryptionKey = user.encKey;
        cryptor.decrypt();
        const decryptedPassword = cryptor.getEncryptedText();

        if (password !== decryptedPassword) {
            return res.status(404).json({ message: "Incorrect password" });
        }

        const payload = { id: user._id };
        const token = jwt.sign(payload, process.env.secret);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None", // for cross-site cookie sending
            maxAge: 60 * 60 * 1000,
        });

        console.log("Successfully logged in");

        return res.status(200).json({ token });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: error.message });
    }
};

const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Store OTP with expiration (5 minutes)
        otpStore.set(email, {
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000
        });

        // Send OTP via email
        const transporter = nodemailer.createTransport({
            secure: true,
            host: "smtp.gmail.com",
            service: "gmail",
            port: 465,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset OTP - ColdMailer",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #7c3aed;">Password Reset Request</h2>
                    <p>You requested to reset your password for ColdMailer.</p>
                    <p>Your OTP is:</p>
                    <h1 style="background-color: #f3f4f6; padding: 20px; text-align: center; letter-spacing: 5px;">${otp}</h1>
                    <p style="color: #ef4444;">This OTP will expire in 5 minutes.</p>
                    <p>If you didn't request this, please ignore this email.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        console.log(`OTP sent to ${email}`);
        return res.status(200).json({ message: "OTP sent to your email" });

    } catch (error) {
        console.error("Password reset request error:", error);
        return res.status(500).json({ message: "Failed to send OTP", error: error.message });
    }
};

const verifyOtpAndResetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword, confirmPassword } = req.body;

        if (!email || !otp || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const storedOtpData = otpStore.get(email);

        if (!storedOtpData) {
            return res.status(400).json({ message: "OTP not found or expired" });
        }

        if (Date.now() > storedOtpData.expiresAt) {
            otpStore.delete(email);
            return res.status(400).json({ message: "OTP has expired" });
        }

        if (storedOtpData.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Find user and update password
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Encrypt new password
        const cryptor = new CharCryptor(newPassword);
        cryptor.encrypt();
        const encryptedPassword = cryptor.getEncryptedText();
        const encryptionKey = cryptor.getEncryptionKey();

        user.password = encryptedPassword;
        user.encKey = encryptionKey;
        await user.save();

        // Clear OTP from store
        otpStore.delete(email);

        console.log(`Password reset successful for ${email}`);
        return res.status(200).json({ message: "Password reset successful" });

    } catch (error) {
        console.error("Password reset error:", error);
        return res.status(500).json({ message: "Failed to reset password", error: error.message });
    }
};

export {
    signup,
    login,
    sendEmail,
    loginStatus,
    logout,
    requestPasswordReset,
    verifyOtpAndResetPassword,
};