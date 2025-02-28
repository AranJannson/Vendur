import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { addSeller, getSellerInfo, getAllSellers, verifySeller, banSeller } from "./utils/sellerView";

dotenv.config();

const Admin = express();

Admin.use(express.json());

Admin.use(cors());

const portNumber = 5078;

Admin.listen(portNumber, () => {
    console.log(`Admin is running on port ${portNumber}`);

});


Admin.get("/admin", async (req: Request, res: Response) => {

    const allSellers = await getAllSellers();

    res.send(allSellers);

});

// Add seller
Admin.post("/admin/add-seller", async (req: Request, res: Response) => {
    const { name, email } = req.body;
    
    const newSeller = await addSeller(name, email);

    res.send(newSeller);

});

// Get seller info
Admin.get("/admin/seller-info", async (req: Request, res: Response) => {
    const { seller_id } = req.body;

    const sellerInfo = await getSellerInfo(seller_id);

    res.send(sellerInfo);

});

// Verify seller
Admin.put("/admin/verify-seller", async (req: Request, res: Response) => {
    const { seller_id } = req.body;

    const verifiedSeller = await verifySeller(seller_id);

    res.send(verifiedSeller);
});

// Ban seller
Admin.put("/admin/ban-seller", async (req: Request, res: Response) => {
    const { seller_id } = req.body;

    const bannedSeller = await banSeller(seller_id);

    res.send(bannedSeller);

}

);

Admin.post("/admin", (req: Request, res: Response) => {
    res.send("Admin is running");
    
});