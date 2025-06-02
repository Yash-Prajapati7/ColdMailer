// routerFunction.js
import jwt from 'jsonwebtoken';
import { User } from './user.models.js';
import { sendMails } from './sendEmails.js';
import CharCryptor from './encryptPass.js';
import dotenv from "dotenv";
import { upload } from './multer.js';
dotenv.config();

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

const getMailDetails = async (req, res) => {
    try {
        let { emails, subject, body } = req.body;
        const id = userId(req);
        if (!id) {
            console.log("Token null");
            return res.status(404).json({ message: "Token null" });
        }

        if (!emails) {
            return res.status(400).json({ message: "Emails are required" });
        }

        emails = emails.split(',').map(email => email.trim());

        console.log("Emails received and saved successfully!");

        let user = await User.findByIdAndUpdate(id, { emails, subject, body }, { new: true });

        console.log("Mail details received successfully");

        return res.status(200).json({ message: "Mail details received successfully", user });
    } catch (error) {
        return res.status(400).json({ message: "Failed to receive mail details.", error: error.message });
    }
}

const sendEmail = async (req, res) => {
    try {
        const id = userId(req);
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { emails, subject, body } = user;
        const { email, password } = user;

        const cryptor = new CharCryptor(user.password);
        cryptor.encryptionKey = user.encKey;
        cryptor.decrypt();
        const decryptedPassword = cryptor.getEncryptedText();

        if (!emails || !email || !password) {
            return res.status(400).json({ message: "Add all fields" });
        }

        const response = await sendMails(emails, email, decryptedPassword, subject, body, req.file);

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
            sameSite: "Strict",
            maxAge: 60 * 60 * 1000,
        });

        console.log("Successfully logged in");

        return res.status(200).json({ token });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: error.message });
    }
};


export {
    signup,
    login,
    getMailDetails,
    sendEmail,
    loginStatus,
    logout,
    upload
}