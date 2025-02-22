import express, { Request, Response } from "express";
import { testConnection } from "./utils/dbConnect";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const Payment = express();

Payment.use(express.json());
Payment.use(cors());
Payment.use(cookieParser());

const portNumber = 8002;

Payment.get("/payment", async (req: Request, res: Response) => {

    console.log("Payment is running")

    res.cookie('my_cookie', 'cookie_value', {httpOnly: true});

    res.send('Cookie sent')

});

Payment.get("/getcookie", (req: Request, res: Response) => {

    const cookies = req.cookies;

    res.json(cookies);
})

Payment.listen(portNumber, () => {
    console.log(`Payment is running on port ${portNumber}`);

    testConnection();
    
});
