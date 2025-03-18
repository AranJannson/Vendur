import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import {getRandomItemImages} from "./utils/displayImage";

dotenv.config();

const OrgMgmt = express();

OrgMgmt.use(express.json());
OrgMgmt.use(cors());

const portNumber = 8003;

OrgMgmt.listen(portNumber, () => {
    console.log(`OrgMgmt is running on port ${portNumber}`);
});

// OrgMgmt.get("/OrgGet", async (req: Request, res: Response) => {
//     const db = await connect();
//
//     const itemsList = await db.from('items').select('*');
//
//     console.log(JSON.stringify(itemsList, null, 2));
//
//     res.send(JSON.stringify(itemsList, null, 2));
// });
//
// OrgMgmt.post("/OrgPost", async (req: Request, res: Response): Promise<any> => {
//
//     const supabase = await connect();
//
//     await supabase.from('items').insert({
//         name: 'Pyoro',
//         image: "https://mario.wiki.gallery/images/5/5d/WWGIT_CS_Pyoro.png",
//         price: 4000,
//         description: "A cute little bird that eats bugs."
//     });
//
// });

OrgMgmt.get("/display-random-item-images", async (req: Request, res: Response): Promise<any> => {

    const { imageCount } = req.body;

    const data = await getRandomItemImages(imageCount);

    if (!data) {
        return res.status(500).send({ error: "Failed to fetch images" });
    }

    res.status(200).send(data);
});
