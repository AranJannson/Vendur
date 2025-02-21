import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const Catalog = express();

Catalog.use(express.json());

Catalog.use(cors());

const portNumber = 8001;

Catalog.listen(portNumber, () => {
    console.log(`Catalog is running on port ${portNumber}`);
    console.log(`Noah use brain`)

    
});

Catalog.get("/catalog", async (req: Request, res: Response) => {


});

Catalog.post("/catalog", (req: Request, res: Response) => {
    res.send("Catalog is running");
    
});

Catalog.get("/catalog-test", (req: Request, res: Response) => {
    res.send("Catalog is running");
    
});