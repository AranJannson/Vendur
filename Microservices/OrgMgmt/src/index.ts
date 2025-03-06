import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./utils/dbConnect";
import { items, organisations } from "./drizzle/schema";

dotenv.config();

const OrgMgmt = express();

OrgMgmt.use(express.json());
OrgMgmt.use(cors());

const portNumber = 8003;

OrgMgmt.listen(portNumber, () => {
    console.log(`OrgMgmt is running on port ${portNumber}`);
});

OrgMgmt.get("/OrgMgmt", async (req: Request, res: Response) => {
    const db = await connect();

    const itemsList = await db!.select().from(items);

    console.log(JSON.stringify(itemsList, null, 2));

    res.send(JSON.stringify(itemsList, null, 2));
});

OrgMgmt.post("/OrgMgmt", async (req: Request, res: Response): Promise<any> => {
    const db = await connect();

    const { name } = req.body;
    if (!name) {
        return res.status(400).send("Name is required");
    }

    res.send(JSON.stringify(name, null, 2));

    const result = await db!.insert(organisations).values({ name });
});