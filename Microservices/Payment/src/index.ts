import express, { Request, Response } from "express";
import { testConnection } from "./utils/dbConnect";
import dotenv from "dotenv";
import cors from "cors";
// @ts-ignore
import cookieParser from "cookie-parser";

dotenv.config();

const Payment = express();

Payment.use(express.json());
Payment.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
Payment.use(cookieParser());

const portNumber = 8002;

Payment.post("/setcookie", async (req: Request, res: Response) => {

    console.log("/setcookie is running")

    const { name, value } = req.body;
    
    console.log(name)
    console.log(value)

    if (!name || !value) {
        return;
    }

    const parsedValue = JSON.parse(value);

    console.log("Parsed itemId:", parsedValue.itemId);
    console.log("Parsed price:", parsedValue.price);
    console.log("Parsed size:", parsedValue.size);
    console.log("Parsed quantity:", parsedValue.quantity);

    res.cookie(name, JSON.stringify(value), {httpOnly: true});

    res.send('Cookie set')

});

Payment.get("/getcookie", (req: Request, res: Response) => {

    const cookies = req.cookies;

    console.log(cookies);

    Object.keys(cookies).forEach((key => {
        try {
            console.log("doing ", key)
            cookies[key] = JSON.parse(cookies[key]);
        } catch (error) {
            console.error("error");
        }
    }));

    res.json(cookies);
});

Payment.listen(portNumber, () => {
    console.log(`Payment is running on port ${portNumber}`);

    testConnection();
    
});
