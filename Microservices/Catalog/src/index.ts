import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import searchCatalogue from "./utils/search";
import checkStock from "./utils/fetchIItemInfo";

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

    return checkStock(item_id);

})

// Catalog.get("/search", async (req: Request, res: Response): Promise<any> => {
//
//     const query = req.headers.query as string;
//     req.q
//
//     const filters = req.headers.filters as string;
//     const filtersArr = filters?.split(",");
//     let search;
//
//     if (filters) {
//         search = await searchCatalogue(query, filtersArr);
//     } else {
//         search = await searchCatalogue(query);
//     }
//
//     console.log(search)
//     res.send(JSON.stringify(search, null, 2));
// });
Catalog.get("/search", async (req: Request, res: Response): Promise<any> => {
    const query = req.query.query as string;

    console.log(`query: ${query}`)
    const filters = req.query.filters as string;
    console.log(`filters: ${filters}`)
    // Filters are in the form: category_fruit,sort_price etc
    const filtersArr = filters?.split(",");
    let search;

   search = await searchCatalogue(query, filtersArr);

    // console.log(search);
    res.send(JSON.stringify(search, null, 2));
});


Catalog.post("/catalog", (req: Request, res: Response) => {
    res.send("Catalog is running");
    
});

Catalog.get("/catalog-test", (req: Request, res: Response) => {
    res.send("Catalog is running");
    
});