import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import {applyDiscount, createProduct, deleteProduct, getOrgProducts, updateProduct} from "./utils/productManagement";

dotenv.config();

const OrgMgmt = express();

OrgMgmt.use(express.json());

OrgMgmt.use(cors());

const portNumber = 8003;

OrgMgmt.listen(portNumber, () => {
    console.log(`OrgMgmt is running on port ${portNumber}`);
});

// CRUD Operations for products
OrgMgmt.get("/products", async (req: Request, res: Response) => {
    try {
        const { org_id } = req.body;
        const data = await getOrgProducts(org_id);
        res.status(200).send(JSON.stringify(data));
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send({ error: "Failed to fetch products" });
    }
})

// Create a new product
OrgMgmt.post("/products", async (req: Request, res: Response) => {
    try {
        const { product } = req.body;
        const data = await createProduct(product);
        res.status(200).send(JSON.stringify(data));
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).send({ error: "Failed to create product" });
    }
})

// Update an existing product
OrgMgmt.put("/update-product", async (req: Request, res: Response) => {
    try {
        let { id, product } = req.body;
        product.id = id;
        const data = await updateProduct(id, product);
        res.status(200).send(JSON.stringify(data));
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send({ error: "Failed to update product" });
    }
})

// Delete a product
OrgMgmt.delete("/delete-product", async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const data = await deleteProduct(id);
        res.status(200).send(JSON.stringify(data));
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send({ error: "Failed to delete product" });
    }
})

// Apply a discount to a product
OrgMgmt.put("/apply-discount", async (req: Request, res: Response) => {
    try {
        const { id, discount } = req.body;
        const data = await applyDiscount(id, discount);
        res.status(200).send(JSON.stringify(data));
    } catch (error) {
        console.error("Error applying discount:", error);
        res.status(500).send({ error: "Failed to apply discount" });
    }
})