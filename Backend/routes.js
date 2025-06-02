import { Router } from "express";
import { login, getMailDetails, signup, sendEmail, loginStatus, logout } from "./routerFunction.js";
import verify from "./authVerify.js";
import { upload } from "./multer.js";


const router = new Router();
router.get('/', (req, res) => {
    res.json({message : "You are on the Home route"});
    console.log("You are on the home route");
});

router.put('/signup', signup);
router.put('/login', login);
router.post('/details', verify, getMailDetails);
router.post('/sendEmails', verify, upload.single("attachment"), sendEmail);
router.get('/auth/status', loginStatus);
router.post('/auth/logout', logout);
export default router;