import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendMails = async (emails, userEmail, userPass, sub, body, fileObject) => {
    try {
        if (!emails || emails.length === 0) {
            return { success: false, message: "Enter at least one email" };
        }

        const transporter = nodemailer.createTransport({
            secure: true,
            host: "smtp.gmail.com",
            service: "gmail",
            port: 465,
            auth: {
                user: userEmail,
                pass: userPass
            }
        });

        const mailOptions = {
            from: userEmail,
            bcc: emails,
            subject: sub,
            text: body
        };

        // If a fileObject (from req.file) is provided, add attachments
        if (fileObject) {
            console.log("Attachment recieved for sending mail");
            mailOptions.attachments = [
                {
                    filename: fileObject.originalname, // Use the original name from the file object
                    content: fileObject.buffer,        // Use the buffer directly
                    contentType: fileObject.mimetype   // Use the mimetype from the file object
                }
            ];
        }
        await transporter.sendMail(mailOptions);

        console.log("Emails sent successfully as BCC");

        return { success: true, message: "Emails sent successfully as BCC" };
    } catch (err) {
        console.log(`Error: ${err.message}`);
        return { success: false, message: `Some error occurred while sending mail: ${err.message}` };
    }
};