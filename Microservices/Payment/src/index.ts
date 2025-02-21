import express, { Request, Response } from "express";
import { testConnection } from "./utils/dbConnect";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const Payment = express();

Payment.use(express.json());

Payment.use(cors());

const portNumber = 8002;

Payment.listen(portNumber, () => {
    console.log(`Payment is running on port ${portNumber}`);

    testConnection();
    
});