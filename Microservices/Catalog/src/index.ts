import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import searchCatalogue from "./utils/search";
import checkStock from "./utils/fetchIItemInfo";
import { fetchAllReviews, reviews, makeReview } from "./utils/reviews";

dotenv.config();

const Catalog = express();

Catalog.use(express.json());

Catalog.use(cors());

const portNumber = 8000;

Catalog.listen(portNumber, () => {
    console.log(`Catalog is running on port ${portNumber}`);
});

Catalog.get("/catalog", async (req: Request, res: Response) => {

    // const catalog = await fetchCatalog();

    // res.send(JSON.stringify(catalog, null, 2));

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
    const { item_id, rating, reviewText } = req.body;
    const newReview = await makeReview(item_id, rating, reviewText);

    res.send(JSON.stringify(newReview, null, 2));
});

Catalog.post("/catalog", (req: Request, res: Response) => {
    res.send("Catalog is running");

});

Catalog.get("/catalog-test", (req: Request, res: Response) => {
    res.send("Catalog is running");
    
});