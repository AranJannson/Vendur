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

    let basket = [];

    if (req.cookies["basket"]) {
        basket = JSON.parse(req.cookies["basket"]);
        if (!Array.isArray(basket)) {
            basket = [];
        }
    }

    basket.push(JSON.parse(value));

    res.cookie(name, JSON.stringify(basket), {maxAge: 2 * 60 * 1000, httpOnly: true, sameSite: "lax"});

    res.json({ message: "Cookie set", basket });

});

// @ts-ignore
Payment.get("/getcookie", async (req: Request, res: Response) => {

    const cookies = req.cookies["basket"];

    console.log("cookies: ", cookies);

    if (!cookies) {
        return res.json([]);
    }

    const parsedValue = JSON.parse(cookies); 
    console.log("parsed cookies: ", parsedValue)

    res.json(parsedValue);

});

Payment.delete("/deletecookie", async (req: Request, res: Response) => {
    res.clearCookie("basket");
    res.end()
});

Payment.listen(portNumber, () => {
    console.log(`Payment is running on port ${portNumber}`);

    testConnection();
    
});
