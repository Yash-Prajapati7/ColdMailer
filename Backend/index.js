import dotenv from "dotenv";
import connectDB from "./databaseConnection.js";
import express from "express";
import router from "./routes.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
dotenv.config();

connectDB();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors({
    credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended : false }));
app.use('/v1', router);
app.listen(port, console.log("Server is online at " + port));