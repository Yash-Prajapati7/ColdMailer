import multer from "multer";
import dotenv from 'dotenv';
dotenv.config();

const storage = multer.memoryStorage(); // This stores the file in memory as a Buffer

const upload = multer({storage});

export {upload};