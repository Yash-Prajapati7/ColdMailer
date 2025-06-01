import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();  

const verify = (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).send("token null");
        }

        const verified = jwt.verify(token, process.env.secret);

        req.user = verified;
        next();
    }
    catch (error) {
        return res.status(400).send("Invalid token: " + error.message);
    }
}

export default verify;
