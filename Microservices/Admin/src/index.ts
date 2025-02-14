import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const Admin = express();

Admin.use(express.json());

Admin.use(cors());

const portNumber = 5078;

Admin.listen(portNumber, () => {
    console.log(`Admin is running on port ${portNumber}`);

});


Admin.get("/admin", async (req: Request, res: Response) => {


    // res.send(JSON.stringify(catalog, null, 2));

});

Admin.post("/admin", (req: Request, res: Response) => {
    res.send("Catalog is running");
    
});