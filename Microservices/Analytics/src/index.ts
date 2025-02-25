import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { popularProducts, mostPopularProduct } from "./utils/mostPopularProducts";

dotenv.config();

const Analytics = express();

Analytics.use(express.json());

Analytics.use(cors());

const portNumber = 8001;

Analytics.listen(portNumber, () => {
    console.log(`Analytics is running on port ${portNumber}`);
});

Analytics.get("/mostPopularProducts", async (req: Request, res: Response) => {

    const pp = await popularProducts();

    const mpp = await mostPopularProduct();


    console.log(JSON.stringify(pp))
    console.log(JSON.stringify(mpp))

}); 

Analytics.get("/mostPopularCategories", async (req: Request, res: Response) => {

}); 

