import express, { Request, Response } from "express";
import { testConnection } from "./utils/dbConnect";
import dotenv from "dotenv";
import cors from "cors";
import { fetchCatalog } from "./utils/fetchCatalog";

dotenv.config();

const Catalog = express();

Catalog.use(express.json());

Catalog.use(cors());

const portNumber = 8000;

Catalog.listen(portNumber, () => {
    console.log(`Catalog is running on port ${portNumber}`);

    testConnection();
    
});

Catalog.get("/catalog", async (req: Request, res: Response) => {

    const catalog = await fetchCatalog();

    res.send(JSON.stringify(catalog, null, 2));

});

Catalog.post("/catalog", (req: Request, res: Response) => {
    res.send("Catalog is running");
    
});

Catalog.get("/catalog-test", (req: Request, res: Response) => {
    res.send("Catalog is running");
    
});