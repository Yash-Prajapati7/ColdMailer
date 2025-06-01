import jwt from 'jsonwebtoken';
import { User } from './user.models.js';
import { sendMails } from './sendEmails.js';
import { filename } from './multer.js';
import CharCryptor from './encryptPass.js';
import dotenv from "dotenv";
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
        let { emails, subject, body } = req.body;  // Get subject and body from request body
        const id = userId(req);
        if (!id) {
            console.log("Token null");
            return res.status(404).json({ message: "Token null" });
        }

        if (!emails) {
            return res.status(400).json({ message: "Emails are required" });
        }

        // Convert the string into an array of emails (trim to remove any extra spaces)
        emails = emails.split(',').map(email => email.trim());

        console.log("Emails received and saved successfully!");

        // Update user record with subject and body
        let user = await User.findByIdAndUpdate(id, { emails, subject, body }, { new: true });

        console.log("Mail details received successfully");

        return res.status(200).json({ message: "Mail details received successfully", user });
    } catch (error) {
        return res.status(400).json({ message: "Failed to receive mail details.", error: error.message });
    }
}

const getAttachments = async (req, res) => {
    try {
        if (!req.file) {
            console.log("File not found");
            return res.status(400).json({ message: "File not found" });
        }

        const id = userId(req);
        const user = await User.findById(id);

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }

        const attachmentPath = req.file.path;  // File path for attachment

        // Update the user record with the file path (attachment)
        user.attachments = attachmentPath;
        await user.save();

        return res.status(200).json({ message: "Attachment uploaded successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error uploading file.", error: error.message });
    }
}

const sendEmail = async (req, res) => {
    try {
        const id = userId(req);
        const user = await User.findById(id);  // Fetch user details by ID
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { emails, subject, body } = user;  // Get user email details from database

        // Get credentials from the request body
        const { email, password } = user;

        // Decrypt the stored password using the encryption key
        const cryptor = new CharCryptor(user.password);
        cryptor.encryptionKey = user.encKey;  // Assign the stored encryption key
        cryptor.decrypt();
        const decryptedPassword = cryptor.getEncryptedText();

        if (!emails || !email || !password) {
            return res.status(400).json({ message: "Add all fields" });
        }

        // Send emails using stored attachments and other details
        const response = await sendMails(emails, email, decryptedPassword, subject, body, filename);

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

        // Encrypt the userpass
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

        // Decrypt the stored password using the encryption key
        const cryptor = new CharCryptor(user.password);
        cryptor.encryptionKey = user.encKey;  // Assign the stored encryption key
        cryptor.decrypt();
        const decryptedPassword = cryptor.getEncryptedText();

        // Compare the decrypted password with the password provided by the user
        if (password !== decryptedPassword) {
            return res.status(404).json({ message: "Incorrect password" });
        }

        const payload = { id: user._id };
        const token = jwt.sign(payload, process.env.secret);

        res.cookie("token", token, {
            httpOnly: true,  // Prevents XSS attacks
            secure: true,    // Use only with HTTPS
            sameSite: "Strict", // Prevent CSRF attacks
            maxAge: 60 * 60 * 1000, // 1 hour
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
    getAttachments,
    sendEmail,
    loginStatus,
    logout
}
