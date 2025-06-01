import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    emails: {
        type: [String],
        required: false
    },
    subject: {
        type: String,
        required: false
    },
    body: {
        type: String,
        required: false
    },
    attachments: {
        type: String,  // File path or filename for attachments
        required: false
    },
    encKey: {
        type: [Number],
        required: true
    }
});

export const User = mongoose.model('User', userSchema);
