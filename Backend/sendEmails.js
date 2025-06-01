import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs"
dotenv.config();

export const sendMails = async (emails, userEmail, userPass, sub, body, filename) => {
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

        // If filename is provided, add attachments
        if (filename) {
            const fileLocation = `${process.env.COLDMAILER_UPLOADS_PATH}\\${filename}`;
            console.log(fileLocation);
            mailOptions.attachments = [
                {
                    filename: filename,
                    path: fileLocation
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
