import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { popularProducts, mostPopularProduct } from "./utils/mostPopularProducts";
import { mostPopularCategory, popularCategories } from "./utils/mostPopularCategory";
import { getTotalSales} from "./utils/sales";
import { getOrderAverage} from "./utils/orderAverage";

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


    console.log("This is the pp variable:", JSON.stringify(pp));
    console.log("This is the mpp variable:", JSON.stringify(mpp));

}); 

Analytics.get("/mostPopularCategories", async (req: Request, res: Response) => {

    const pc = await popularCategories()
    const mpc = await mostPopularCategory()

    console.log("This is the pc variable:", JSON.stringify(pc));
    console.log("This is the mpc variable:", JSON.stringify(mpc))
}); 

Analytics.get("/sales", async (req: Request, res: Response) => {

    const sales = await getTotalSales()

    console.log("This is the sales variable:", sales);

}); 

Analytics.get("/orderAverage", async (req: Request, res: Response) => {

    const sales = await getOrderAverage()

    console.log("This is the Order Average:", sales);

}); 

