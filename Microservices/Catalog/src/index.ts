import express, { Request, Response } from "express";
import { testConnection } from "./utils/dbConnect";
import dotenv from "dotenv";
import cors from "cors";
import searchCatalogue from "./utils/search";

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

Catalog.get("/search", async (req: Request, res: Response): Promise<any> => {

    const query = req.headers.query as string;

    const filters = req.headers.filters as string;

    const search = await searchCatalogue(query, filters);

    console.log(search)
    res.send(JSON.stringify(search, null, 2));
});

Catalog.post("/catalog", (req: Request, res: Response) => {
    res.send("Catalog is running");
    
});

Catalog.get("/catalog-test", (req: Request, res: Response) => {
    res.send("Catalog is running");
    
});