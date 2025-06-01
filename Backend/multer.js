import multer from "multer";
import dotenv from 'dotenv';
dotenv.config();

let filename = '';
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        return cb(null, `${process.env.COLDMAILER_UPLOADS_PATH}`);
    },
    filename : (req, file, cb) => {
        filename = `${Date.now()}-${file.originalname}`
        req.filename = filename;
        return cb(null, req.filename);
    }
});

const upload = multer({storage});

export {upload, filename};