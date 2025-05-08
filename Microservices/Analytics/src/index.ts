import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
    itemSalesList,
    mostPopularCategoryByItemsListed,
    mostPopularCategoryBySalesList,
    avgItemPricePerCategory,
    categoriesByItemsListed,
    categoriesByAverageItemPrice, get_category_sales_summary, top5ProductsBySales
} from "./utils/productAnalytics"
import { inventoryValue, lowerStock, outOfStock, listOfItemStockValue } from "./utils/stockAnalysis";
import {
    listOfReviewsPerDay,
    orgListOfReviewsPerDay,
    } from "./utils/reviewAnalytics";
import {listOfAllOrgInvValue,
    averageOrganisationProductRating,
    orgNumberOfSales,
    orgTotalRevenueList,
    orgInvValue,
    orgProductRatingList,
    oneOrgItemSalesAnalytics,
    oneOrgItemRevenueAnalytics,
    orgsAverageOrderValue
} from "./utils/organisationsAnalytics"
import { totalSalesEver, orderNumberDailyList, totalRevenuePerDayList, averageOrderValuePerDayList, avgQuantityPerItemInOrder } from "./utils/orderAnalytics";
import trackClicks, {returnAllClickCountPages} from "./utils/track-clicks";
import {recordView, getRecentViews} from "./utils/historyAnalytics";

dotenv.config();

const Analytics = express();

Analytics.use(express.json());

Analytics.use(cors());

const portNumber = 8001;

Analytics.listen(portNumber, () => {
    console.log(`Analytics is running on port ${portNumber}`);
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

Analytics.get("/orgInvList", async (req: Request, res: Response) => {

    const mostReviewedItem = await listOfAllOrgInvValue()

    console.log(mostReviewedItem);
    res.send(JSON.stringify(mostReviewedItem, null, 2))
});

Analytics.get("/listItemStockValue", async (req: Request, res: Response) => {

    const itemStockValueList = await listOfItemStockValue()

    console.log(itemStockValueList);
    res.send(JSON.stringify(itemStockValueList, null, 2))
});

Analytics.get("/avgOrgProd", async (req: Request, res: Response) => {

    const ratingDistributionResult = await averageOrganisationProductRating()

    console.log(ratingDistributionResult);
    res.send(JSON.stringify(ratingDistributionResult, null, 2))
});

Analytics.get("/popularCategorySalesList", async (req: Request, res: Response) => {

    const popularCategorySalesList = await mostPopularCategoryBySalesList()

    console.log(popularCategorySalesList);
    res.send(JSON.stringify(popularCategorySalesList, null, 2))
});

Analytics.get("/itemSalesList", async (req: Request, res: Response) => {

    const itemList = await itemSalesList()

    console.log(itemList);
    res.send(JSON.stringify(itemList, null, 2))
});

Analytics.get("/orgNumberSales", async (req: Request, res: Response) => {

    const orgSalesList = await orgNumberOfSales()

    console.log(orgSalesList);
    res.send(JSON.stringify(orgSalesList, null, 2))
});

Analytics.get("/orgRevenueList", async (req: Request, res: Response) => {

    const orgRevenueList = await orgTotalRevenueList()

    console.log(orgRevenueList);
    res.send(JSON.stringify(orgRevenueList, null, 2))
});


Analytics.get("/totalSales", async (req: Request, res: Response) => {

    const total = await totalSalesEver()

    console.log(total);
    res.send(JSON.stringify(total, null, 2))
});

Analytics.get("/totalSalesDaily", async (req: Request, res: Response) => {

    const dailyTotal = await orderNumberDailyList()

    console.log(dailyTotal);
    res.send(JSON.stringify(dailyTotal, null, 2))
});

Analytics.get("/numberSalesDaily", async (req: Request, res: Response) => {

    const dailyTotal = await orderNumberDailyList()

    console.log(dailyTotal);
    res.send(JSON.stringify(dailyTotal, null, 2))
});

Analytics.get("/totalRevenueDaily", async (req: Request, res: Response) => {

    const revenueList = await totalRevenuePerDayList()

    console.log(revenueList);
    res.send(JSON.stringify(revenueList, null, 2))
});

Analytics.get("/avgOrderPerDayList", async (req: Request, res: Response) => {

    const avgDayList = await averageOrderValuePerDayList()

    console.log(avgDayList);
    res.send(JSON.stringify(avgDayList, null, 2))
});

Analytics.get("/avgQuantityOrderList", async (req: Request, res: Response) => {

    const avgQuantityList = await avgQuantityPerItemInOrder()

    console.log(avgQuantityList);
    res.send(JSON.stringify(avgQuantityList, null, 2))
});

Analytics.post("/track-clicks", async (req: Request, res: Response): Promise<any> => {

    const { page } = req.body;

    const output = await trackClicks(page);

    if (!output) {
        return res.status(400).json({ message: "Click failed to be registered" });
    }

    res.status(200).json({message: "Success"});

});

Analytics.get("/pages-clicks", async (req: Request, res: Response): Promise<any> => {
    const { data, error } = await returnAllClickCountPages();

    if (error) {
        return res.status(500).json({ error });
    }

    res.status(200).json(data);
});

Analytics.post("/avgItemPriceCategory", async (req: Request, res: Response) => {

    const { org_id } = req.body;
    const avgItemPrice = await avgItemPricePerCategory(org_id)

    console.log(avgItemPrice);
    res.send(JSON.stringify(avgItemPrice, null, 2))
});

Analytics.post("/popularCategory", async (req: Request, res: Response) => {

    const {org_id} = req.body
    const productList = await mostPopularCategoryByItemsListed(org_id)

    console.log("The most popular category is:", productList);
    res.send(JSON.stringify(productList, null, 2))
});

Analytics.get("/category-sales-summary", async (req: Request, res: Response) => {
    const { org_id } = req.body;
    const categorySalesSummary = await get_category_sales_summary();

    res.status(200).json(categorySalesSummary);

});

Analytics.get("/top-5-products-by-sales", async (req: Request, res: Response) => {
    const top5Products = await top5ProductsBySales();
    res.status(200).json(top5Products);
});

Analytics.post("/revampedOrgInvList", async (req: Request, res: Response) => {

    const {org_id} = req.body
    const inventoryValue = await orgInvValue(org_id)

    console.log(inventoryValue);
    res.send(JSON.stringify(inventoryValue, null, 2))
});

Analytics.post("/orgRatingList", async (req: Request, res: Response) => {
    const { org_id } = req.body;
    const ratingList = await orgProductRatingList(org_id);

    console.log(ratingList);
    res.send(JSON.stringify(ratingList, null, 2));
});

Analytics.post("/reviewsPerDay", async (req: Request, res: Response) => {
    const { org_id } = req.body;
    const dailyReviews = await orgListOfReviewsPerDay(org_id)

    console.log(dailyReviews);
    res.send(JSON.stringify(dailyReviews, null, 2))
});

Analytics.get("/categoriesItemListed", async (req: Request, res: Response) => {

    const total = await categoriesByItemsListed()

    console.log(total);
    res.send(JSON.stringify(total, null, 2))
});

Analytics.get("/categoriesAverageItemPrice", async (req: Request, res: Response) => {

    const total = await categoriesByAverageItemPrice()

    console.log(total);
    res.send(JSON.stringify(total, null, 2))
});

Analytics.get("/dailyReviewsSitewide", async (req: Request, res: Response) => {

    const total = await listOfReviewsPerDay()

    console.log(total);
    res.send(JSON.stringify(total, null, 2))
});

Analytics.post("/oneOrgSalesCountTest", async (req: Request, res: Response) => {
    const { org_id } = req.body;
    const total = await oneOrgItemSalesAnalytics(org_id)

    console.log(total);
    res.send(JSON.stringify(total, null, 2))
});

// Browsing History Analytics
Analytics.post("/record-view", async (req: Request, res: Response) => {
    try {
        // Check if there is a viewed at property in the request body
        if (!req.body.viewed_at) {
            const { session_id, category, item_id } = req.body;
            const event = {
                session_id,
                category,
                item_id,
            };
            const data = await recordView(event);
            res.status(200).json(data);
        } else {
            const { session_id, category, item_id, viewed_at } = req.body;
            const event = {
                session_id,
                category,
                item_id,
                viewed_at,
            };
            const data = await recordView(event);
            res.status(200).json(data);
        }
    } catch (error) {
        console.error("Error recording view:", error);
        res.status(500).json({ error: "Error recording view" });
    }
})

Analytics.get("/recent-views", async (req: Request, res: Response) => {
    try {
        const { session_id, limit } = req.body;
        const data = await getRecentViews(session_id, limit);

        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching recent views:", error);
        res.status(500).json({ error: "Error fetching recent views" });
    }
});

Analytics.post("/oneOrgRevTest", async (req: Request, res: Response) => {
    const { org_id } = req.body;
    const total = await oneOrgItemRevenueAnalytics(org_id)

    console.log(total);
    res.send(JSON.stringify(total, null, 2))
});

Analytics.get("/allOrgNumSales", async (req: Request, res: Response) => {

    const total = await orgNumberOfSales()

    console.log(total);
    res.send(JSON.stringify(total, null, 2))
});

Analytics.get("/allOrgRevenue", async (req: Request, res: Response) => {

    const total = await orgTotalRevenueList()

    console.log(total);
    res.send(JSON.stringify(total, null, 2))
});

Analytics.get("/allOrgAOV", async (req: Request, res: Response) => {

    const total = await orgsAverageOrderValue()

    console.log(total);
    res.send(JSON.stringify(total, null, 2))
});