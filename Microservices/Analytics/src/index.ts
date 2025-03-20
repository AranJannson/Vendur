import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getOrderAverage} from "./utils/orderAverage";
import { lowStock } from "./utils/lowStock";
import { mostPopularDate } from "./utils/timeAnalytics";
import { mostPopularCategory } from "./utils/productAnalytics" 
import { fetchAllProducts } from "./utils/fetchAllProducts";
import { inventoryValue, lowerStock, outOfStock, mostValuableStockItem } from "./utils/stockAnalysis";

dotenv.config();

const Analytics = express();

Analytics.use(express.json());

Analytics.use(cors());

const portNumber = 8001;

Analytics.listen(portNumber, () => {
    console.log(`Analytics is running on port ${portNumber}`);
});

// Analytics.get("/orderAverage", async (req: Request, res: Response) => {

//     const orderAvg = await getOrderAverage()

//     console.log("This is the Order Average:", orderAvg);

// }); 

// Analytics.get("/lowStock", async (req: Request, res: Response) => {

//     const lowStockItems = await lowStock()

//     console.log("These are the items with stock running out:", lowStockItems);

// }); 

// Analytics.get("/orderDates", async (req: Request, res: Response) => {

//     const popularDay = await mostPopularDate()

//     console.log("This was the most popular day:", popularDay);

// }); 

// Analytics.get("/newerPopularProducts", async (req: Request, res: Response) => {

//     const popularProductsListVar = await popularProduct()

//     console.log("The newer output for products is:", popularProductsListVar);

// }); 

Analytics.get("/fetchAllProducts", async (req: Request, res: Response) => {

    const productList = await fetchAllProducts()

    console.log("The modified version with catalog is:", productList);

}); 

Analytics.get("/popularCategory", async (req: Request, res: Response) => {

    const productList = await mostPopularCategory()

    console.log("The most popular category is:", productList);

}); 

// Stock Analytic Tests

Analytics.get("/inventoryValue", async (req: Request, res: Response) => {

    const totalInvValue = await inventoryValue()

    console.log("The inventory value is:", totalInvValue);

}); 


Analytics.get("/lowerStock", async (req: Request, res: Response) => {

    const lowStockList = await lowerStock()

    console.log("These are the items that are low on stock:", lowStockList);

}); 

Analytics.get("/outOfStock", async (req: Request, res: Response) => {

    const outOfStockList = await outOfStock()

    console.log("These are the items out of stock:", outOfStockList);

}); 

Analytics.get("/highValueStockItem", async (req: Request, res: Response) => {

    const highStockItem = await mostValuableStockItem()

    console.log("This item has the highest value:", highStockItem);

}); 
