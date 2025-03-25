import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
// @ts-ignore
import cookieParser from "cookie-parser";

dotenv.config();

const Payment = express();
const duration = 120 * 60 * 1000;
const basketCookieName = "basket";
const expiryCookieName = "expiry";

Payment.use(express.json());
Payment.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
Payment.use(cookieParser());

const portNumber = 8002;

Payment.post("/setcookie", (req: Request, res: Response) => {
    console.log("Cookie Setting...")
    const { name, value } = req.body;
    
    console.log(name)
    console.log(value)
    
    if (!name || !value) {
        return;
    }

    let basket = [];

    if (req.cookies[basketCookieName]) {
        basket = JSON.parse(req.cookies[basketCookieName]);
        if (!Array.isArray(basket)) {
            basket = [];
        }
    }

    console.log(typeof(value));

    const existingItemIndex = basket.findIndex((item: { id: string; size?: string | null }) => 
        item.id === value.id && item.size === value.size
    );

    if (existingItemIndex === -1) {
        basket.push(value);
    } else {
        basket[existingItemIndex].quantity += value.quantity;
    }
    
    res.cookie(basketCookieName, JSON.stringify(basket), {maxAge: duration, httpOnly: true, sameSite: "lax", domain: "localhost"});
    
    const expiryTime = Date.now()
    res.cookie(expiryCookieName, expiryTime, { maxAge: duration });

    res.json({ message: "Cookie set", basket });

});

// @ts-ignore
Payment.get("/getcookie", async (req: Request, res: Response) => {

    console.log("Enetered Get Cookie")
    const cookies = req.cookies[basketCookieName];

    console.log("cookies: ", cookies);

    if (!cookies) {
        return res.json([]);
    }

    const parsedValue = JSON.parse(cookies); 
    console.log("parsed cookies: ", parsedValue)

    res.json(parsedValue);

});

// @ts-ignore
Payment.get("/getcookieage", async (req: Request, res: Response) => {

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    
    const sendTimerUpdate = () => {
        const expiryTime = req.cookies[expiryCookieName]
        
        if (!expiryTime) {
            return res.json([]);
        }

        const ageSeconds = (duration / 1000) - ((Date.now() - expiryTime) / 1000);
        const minutes = Math.floor((ageSeconds / 60) % 60);
        const seconds = Math.floor(ageSeconds % 60);
        const hours = Math.floor(ageSeconds / 3600);
        const ageString = String( hours + "hr " + minutes + "m " + seconds + "s");
        
        res.write(`data: ${JSON.stringify({ age: ageString }) }\n\n`)
    };

    const interval = setInterval(sendTimerUpdate, 1000)

    req.on("close", () => {
        console.log("Client disconnected from SSE");
        clearInterval(interval);
    });

});

Payment.delete("/deletecookie", async (req: Request, res: Response) => {
    res.clearCookie(basketCookieName);
    res.clearCookie(expiryCookieName);
    res.json({event: "expired"});
});

// @ts-ignore
Payment.delete("/deletevalue", async (req: Request, res: Response) => {
    
    const { id, size } = req.body;

    if (!id) {
        return res.json([]);;
    }

    let basket = req.cookies[basketCookieName] ? JSON.parse(req.cookies[basketCookieName]) : [];

    if (!Array.isArray(basket)) {
        return res.json([]);
    }

    const updatedBasket = basket.filter((item: { id: string, size?: string | null }) => !(item.id === id && item.size === size));
    
    res.cookie(basketCookieName, JSON.stringify(updatedBasket), { maxAge: duration, httpOnly: true, sameSite: "lax", domain: "localhost"});
    
    if (updatedBasket.length == 0){
        res.clearCookie(expiryCookieName);
        res.json({event: "expired"});
    } else (
        res.json({ message: "Item removed", basket: updatedBasket })
    );

});

Payment.listen(portNumber, () => {
    console.log(`Payment is running on port ${portNumber}`);

});
