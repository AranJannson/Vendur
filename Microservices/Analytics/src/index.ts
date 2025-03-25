import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getOrderAverage} from "./utils/orderAverage";
import { mostPopularDate } from "./utils/timeAnalytics";
import { mostPopularCategory } from "./utils/productAnalytics" 
import { fetchAllProducts } from "./utils/fetchAllProducts";
import { inventoryValue, lowerStock, outOfStock, mostValuableStockItem, listOfItemStockValue } from "./utils/stockAnalysis";
import { mostReviewedProduct, highestReviewedProduct, productsByReviewValue, dateWithMostReviews, listOfReviewsPerDay, ratingDistribution} from "./utils/reviewAnalytics";
import {listOfOrgInvValue, averageOrganisationProductRating} from "./utils/organisationsAnalytics"


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

// Analytics.get("/orderDates", async (req: Request, res: Response) => {

//     const popularDay = await mostPopularDate()

//     console.log("This was the most popular day:", popularDay);

// }); 

Analytics.get("/fetchAllProducts", async (req: Request, res: Response) => {

    const productList = await fetchAllProducts()

    console.log("The modified version with catalog is:", productList);

    res.send(JSON.stringify(productList, null, 2))
}); 

Analytics.get("/popularCategory", async (req: Request, res: Response) => {

    const productList = await mostPopularCategory()

    console.log("The most popular category is:", productList);
    res.send(JSON.stringify(productList, null, 2))
}); 

// Stock Analytic Tests

Analytics.get("/inventoryValue", async (req: Request, res: Response) => {

    const totalInvValue = await inventoryValue()

    console.log("The inventory value is:", totalInvValue);
    res.send(JSON.stringify(totalInvValue, null, 2))
}); 


Analytics.get("/lowerStock", async (req: Request, res: Response) => {

    const lowStockList = await lowerStock()

    console.log("These are the items that are low on stock:", lowStockList);
    res.send(JSON.stringify(lowStockList, null, 2))
}); 

Analytics.get("/outOfStock", async (req: Request, res: Response) => {

    const outOfStockList = await outOfStock()

    console.log("These are the items out of stock:", outOfStockList);
    res.send(JSON.stringify(outOfStockList, null, 2))
}); 

Analytics.get("/highValueStockItem", async (req: Request, res: Response) => {

    const highStockItem = await mostValuableStockItem()

    console.log("This item has the highest value:", highStockItem);
    res.send(JSON.stringify(highStockItem, null, 2))
});

Analytics.get("/mostReviewedProduct", async (req: Request, res: Response) => {

    const mostReviewedItem = await mostReviewedProduct()

    console.log("This is the product with the most reviews", mostReviewedItem);
    res.send(JSON.stringify(mostReviewedItem, null, 2))
});

Analytics.get("/productReviewList", async (req: Request, res: Response) => {

    const mostReviewedItem = await productsByReviewValue()

    console.log("List of products by reviews", mostReviewedItem);
    res.send(JSON.stringify(mostReviewedItem, null, 2))
});

Analytics.get("/highRatedProduct", async (req: Request, res: Response) => {

    const mostReviewedItem = await highestReviewedProduct()

    console.log("This is the product with the highest rating", mostReviewedItem);
    res.send(JSON.stringify(mostReviewedItem, null, 2))
});

Analytics.get("/dateWithMostReviews", async (req: Request, res: Response) => {

    const mostReviewedItem = await dateWithMostReviews()

    console.log(mostReviewedItem);
    res.send(JSON.stringify(mostReviewedItem, null, 2))
});

Analytics.get("/listOfReviewsPerDay", async (req: Request, res: Response) => {

    const mostReviewedItem = await listOfReviewsPerDay()

    console.log(mostReviewedItem);
    res.send(JSON.stringify(mostReviewedItem, null, 2))
});


Analytics.get("/orgInvList", async (req: Request, res: Response) => {

    const mostReviewedItem = await listOfOrgInvValue()

    console.log(mostReviewedItem);
    res.send(JSON.stringify(mostReviewedItem, null, 2))
});

Analytics.get("/listItemStockValue", async (req: Request, res: Response) => {

    const itemStockValueList = await listOfItemStockValue()

    console.log(itemStockValueList);
    res.send(JSON.stringify(itemStockValueList, null, 2))
});

Analytics.get("/ratingDistribution", async (req: Request, res: Response) => {

    const ratingDistributionResult = await ratingDistribution()

    console.log(ratingDistributionResult);
    res.send(JSON.stringify(ratingDistributionResult, null, 2))
});

Analytics.get("/avgOrgProd", async (req: Request, res: Response) => {

    const ratingDistributionResult = await averageOrganisationProductRating()

    console.log(ratingDistributionResult);
    res.send(JSON.stringify(ratingDistributionResult, null, 2))
});