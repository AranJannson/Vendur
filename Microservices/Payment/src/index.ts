import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
// @ts-ignore
import cookieParser from "cookie-parser";
import orderProcessing, {changeStatus, changeStatusIndividual, getOrderDetails} from "./utils/orders/orderProccessing";
import Stripe from "stripe";

dotenv.config();

const Payment = express();
const duration = 120 * 60 * 1000;
const basketCookieName = "basket";
const expiryCookieName = "expiry";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

Payment.use(express.json());
Payment.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
Payment.use(cookieParser());

const portNumber = 8002;
 
// @ts-ignore
Payment.post('/createPaymentIntent', async (req, res) => {
    try {
      const { items } = req.body;

      items.forEach((item: any) => {
        console.log("//createPaymentIntent item.id: ", item.id, ", quantity: ", item.quantity)
      });
  
      // Calculate the total price manually
      const amount = items.reduce((total: number, item: any) => {
        return total + item.price * item.quantity * 100;
      }, 0);

      console.log("AMOUNT: ", amount);
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'gbp',
        automatic_payment_methods: { enabled: true },
      });
  
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ error: error });
    }
  });

Payment.post("/updateOrderStatusByGroup", async (req: Request, res: Response) => {


    const { order_group_id, status } = req.body;

    try {
        const orderDetails = await changeStatus(order_group_id, status);

        if (orderDetails) {
            res.status(200).json({event: "Order Status Updated Successfully"});
        } else {
            res.status(500).json({error: "Order Status Was Not Retrieved Successfully"});
        }
    }catch (error){
        res.status(500).json({error: "Order Status Was Not Retrieved Successfully"});
    }


});

Payment.post("/updateOrderStatusIndividualItem", async (req: Request, res: Response) => {

    const {order_id, status} = req.body;

    try {
        const orderDetails = await changeStatusIndividual(order_id, status);

        if (orderDetails) {
            res.status(200).json({event: "Order Status Updated Successfully"});
        } else {
            res.status(500).json({error: "Order Status Was Not Retrieved Successfully"});
        }
    } catch (error) {
        res.status(500).json({error: "Order Status Was Not Retrieved Successfully"});
    }
});


Payment.post("/orderProcessing", async (req: Request, res: Response) => {

    const { basket, user_id, total_cost, delivery_address, full_name } = req.body;

    console.log("//orderProcessing user_id: ", user_id)
    console.log("//orderProcessing total_cost: ", total_cost)

    try{
        const order_group_id = await orderProcessing(basket, user_id, delivery_address, full_name, total_cost);

        res.status(200).json({event: "Order Processed Successfully", order_group_id });
    }catch (error){
        res.status(500).json({error: "Order Was Not Processed Successfully"});
    }

});

Payment.post("/getOrderDetails", async (req: Request, res: Response) => {

    const { order_id } = req.body;
    
    console.log("//getorderDetails order_id: ", order_id);

    try{
        const orderDetails = await getOrderDetails(order_id);
        console.log("//getorderDetails orderDetails: ", orderDetails);
        
        if (orderDetails){
            res.json(200).json({event: "Order Details Retrieved Successfully", orderDetails});
        }else{
            res.status(500).json({error: "Order Details Were Not Retrieved Successfully"});
        }
    }catch (error){
        res.status(500).json({error: "Order Details Were Not Retrieved Successfully"});
    }

});

Payment.post("/setcookie", (req: Request, res: Response) => {
    console.log("Cookie Setting...");
    const { name, value, action } = req.body;

    console.log(name);
    console.log(value);
    console.log("action: ", action);

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

    const existingItemIndex = basket.findIndex(
        (item: { id: string; size?: string | null }) =>
            item.id === value.id && item.size === value.size
    );

    if (action === "changeQuantity") {
        if (existingItemIndex !== -1) {
            basket[existingItemIndex].quantity += value.quantity;
            if (basket[existingItemIndex].quantity <= 0) {
                basket.splice(existingItemIndex, 1);
            }
        } else if (value.quantity > 0) {
            basket.push(value); // Optionally add if doesn't exist and quantity > 0
        }
    } else if (action === "changeSize") {
        console.log("//setcookie Changing size to ", value.newSize)
        if (existingItemIndex !== -1) {
            basket[existingItemIndex].size = value.newSize;
        } 
    } else {
        if (existingItemIndex === -1) {
            basket.push(value);
        } else {
            basket[existingItemIndex].quantity += value.quantity;
        }
    }

    res.cookie(basketCookieName, JSON.stringify(basket), {
        maxAge: duration,
        httpOnly: true,
        sameSite: "lax",
    });

    const expiryTime = Date.now();
    res.cookie(expiryCookieName, expiryTime, {
        maxAge: duration,
        httpOnly: true,
        sameSite: "lax",
    });

    res.json({ message: "Cookie set", basket });
});

// @ts-ignore
Payment.get("/getcookie", async (req: Request, res: Response) => {

    console.log("Entered Get Cookie")
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

    console.log("id: ", id)
    console.log("size: ", size)

    if (!id) {
        return res.json([]);;
    }

    let basket = req.cookies[basketCookieName] ? JSON.parse(req.cookies[basketCookieName]) : [];

    if (!Array.isArray(basket)) {
        return res.json([]);
    }

    const updatedBasket = basket.filter((item: { id: string, size?: string | null }) => !(item.id === id && item.size === size));
    
    if (updatedBasket.length == 0){
        res.clearCookie(basketCookieName);
        res.clearCookie(expiryCookieName);
        res.json({ event: "expired" });
    } else {
        res.cookie(basketCookieName, JSON.stringify(updatedBasket), {
            maxAge: duration,
            httpOnly: true,
            sameSite: "lax"
        });
        res.json({ message: "Item removed", basket: updatedBasket });
    }

});

Payment.listen(portNumber, () => {
    console.log(`Payment is running on port ${portNumber}`);

});
