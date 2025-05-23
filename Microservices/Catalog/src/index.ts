import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import searchCatalogue from "./utils/search";
import checkStock from "./utils/fetchIItemInfo";
import {fetchAllReviews, reviews, makeReview, checkIfItemHasReview} from "./utils/reviews";
import {fetchCatalouge, fetchItemsBasedOnCategory, fetchOrgProducts, fetchStock} from "./utils/fetchCatalog";
import {modifyStockQuantity} from "./utils/modifyStock";
import {fetchItemsByID} from "./utils/fetchItemByID";

dotenv.config();

const Catalog = express();

Catalog.use(express.json());

Catalog.use(cors({
    origin: '*',
}));

const portNumber = 8000;

Catalog.listen(portNumber, () => {
    console.log(`Catalog is running on port ${portNumber}`);
});

Catalog.get("/getItems", async (req: Request, res: Response) => {

    try{
        const data = await fetchCatalouge();

        res.status(200).send(JSON.stringify(data));

    }catch(error){
        res.status(500).send({error: "Could not fetch the catalogue"});
    }


});

Catalog.post("/getItemByID", async (req: Request, res: Response) => {
    const { id } = req.body;

    const item = await fetchItemsByID(id);
    res.send(JSON.stringify(item, null, 2));
});


Catalog.post("/modifyStockQuantity", async (req: Request, res: Response) => {

    const { item_id, quantity } = req.body;

    console.log(`modifyStockQuantity// item_id: ${item_id}, quantity: ${quantity}`)

    try{
        await modifyStockQuantity(item_id, quantity);
        res.status(200).send({ message: "Stock modified successfully" });
    }catch (error){
        res.status(500).send({error: `Could not modify the stock for item ${item_id}`});
    }

});

Catalog.post("/getOrgItems", async (req: Request, res: Response) => {

    const { org_id } = req.body;

    try{
        const data = await fetchOrgProducts(org_id);

        res.status(200).send(data);

    }catch (error){
        res.status(500).send({error: `Could not fetch the products of ID: ${org_id}`});
    }

});


Catalog.post("/getStock", async (req: Request, res: Response) => {

    const { item_id } = req.body;

    console.log("getStock// item id: ", item_id)

    try{

        const data = await fetchStock(item_id);

        res.send(data);

    }catch (error){
        res.status(500).send({error: `Could not fetch the stock for item ${item_id}`});

    }

});

Catalog.post("/getItemsBasedOnCategory", async (req: Request, res: Response) => {

    const { category } = req.body;

    try{
        const data = await fetchItemsBasedOnCategory(category);

        res.status(200).send(data);
    }catch (error){
        res.status(500).send({error: `Items in category ${category} could not be found`})
    }


});

Catalog.post("/checkIfItemHasReview", async (req: Request, res: Response) => {

    const { item_id } = req.body;

    try{
        const data = await checkIfItemHasReview(item_id);

        res.status(200).send(data);
    }catch (error){
        res.status(500).send({error: `Could not find reviews for item ${item_id}`});
    }

});

Catalog.get("/stock", async (req: Request, res: Response): Promise<any> => {

    const { item_id } = req.body;

    res.send(checkStock(item_id));

})

Catalog.get("/search", async (req: Request, res: Response): Promise<any> => {
    const query = req.query.query as string;

    console.log(`query: ${query}`)
    const filters = req.query.filters as string;
    console.log(`filters: ${filters}`)
    // Filters are in the form: category_fruit,sort_price etc
    const filtersArr = filters?.split(",");
    let search;

   search = await searchCatalogue(query, filtersArr);

    res.send(JSON.stringify(search, null, 2));
});

// Reviews
Catalog.get("/reviews/:item_id", async (req: Request, res: Response): Promise<any> => {
    const item_id = req.params.item_id as string;

    const reviews = await fetchAllReviews(item_id);

    res.send(JSON.stringify(reviews, null, 2));

});

Catalog.get("/review/:review_id", async (req: Request, res: Response): Promise<any> => {
    const review_id = req.params.review_id as string;

    const review = await reviews(review_id);

    res.send(JSON.stringify(review, null, 2));

});

Catalog.post("/review", async (req: Request, res: Response): Promise<any> => {
    const { item_id, rating, reviewText, user_id } = req.body;
    const newReview = await makeReview(item_id, rating, reviewText, user_id);

    res.send(JSON.stringify(newReview, null, 2));
});