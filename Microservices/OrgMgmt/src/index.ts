import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
    applyDiscount,
    createProduct,
    deleteProduct,
    getOrgInfo,
    getProducts,
    updateProduct,
    getProductByID,
    getOrgByName,
} from "./utils/productManagement";
import {requestVerification} from "./utils/verification";
import {getOrderById} from "./utils/orderManagment";

dotenv.config();

const OrgMgmt = express();

OrgMgmt.use(express.json());

OrgMgmt.use(cors());

const portNumber = 8003;

OrgMgmt.listen(portNumber, () => {
    console.log(`OrgMgmt is running on port ${portNumber}`);
});
OrgMgmt.post("/organisation", async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const data = await getOrgInfo(id);
        res.status(200).send(JSON.stringify(data));
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send({ error: "Failed to fetch products" });
    }
})


OrgMgmt.post("/getOrgByName", async (req: Request, res: Response) => {

    try {
        const { name } = req.body;
        const data = await getOrgByName(name);
        res.status(200).send(JSON.stringify(data));
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send({ error: "Failed to fetch products" });
    }

})

// CRUD Operations for products
// Fetch all products from an organisation
OrgMgmt.get("/products", async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const data = await getProducts(id)
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

// Verification Operations


OrgMgmt.post("/request-verification", async (req: Request, res: Response): Promise<any> => {
    try {
        const { org_id, name, email, description, productInfo, shippingMethod } = req.body.product;
        console.log('Received org_id:', org_id);
        console.log("Received request body:", req.body);
        let org_info = await getOrgInfo(org_id);
        if (!org_info) {
            return res.status(404).send({ error: "Organisation not found" });
        }
        if (org_info[0].is_verified) {
            return res.status(400).send({ error: "Organisation already verified" });
        } else {
            await requestVerification(org_id, name, email, description, productInfo, shippingMethod);
            return res.status(200).send({ message: "Verification requested successfully" });
        }
    } catch (error) {
        console.error("Error requesting verification:", error);
        res.status(500).send({ error: "Failed to request verification" });
    }
})

// Verification Status
OrgMgmt.post("/verification-status", async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.body;
        const org_info = await getOrgInfo(id);

        if (!org_info) {
            return res.status(404).send({ error: "Organisation not found" });
        }
        const is_verified = org_info[0].is_verified;
        if (is_verified) {
            return res.status(200).send({ verified: true });
        } else if (!is_verified) {
            return res.status(200).send({ verified: false });
        } else {
            return res.status(400).send({ error: "Verification status unknown" });
        }
    } catch (error) {
        console.error("Error fetching verification status:", error);
        res.status(500).send({ error: "Failed to fetch verification status" });

    }
})

// Order operations
// Get order by id
OrgMgmt.get("/order", async (req: Request, res: Response) => {
    try {
        const { order_id } = req.body;
        const data = await getOrderById(order_id)
        res.status(200).send(JSON.stringify(data));
    } catch (error) {
        console.error("Error fetching order:", error);
    }
})


//Delete Item by ID
OrgMgmt.post('/deleteProduct', async (req: Request, res: Response): Promise<any> => {
    const { id } = req.body;
    const { error } = await deleteProduct(id);
    
    if (error) {
      return res.status(500).json({ message: error });
    }
  
    return res.status(200).json({ message: 'Product deleted successfully' });
  });

//Get Item by ID
  OrgMgmt.get("/getProductByID", async (req, res): Promise<any> => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).send({ error: "Product ID is required" });
        }

        const data = await getProductByID(id);
        
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send({ error: "Failed to fetch product" });
    }
});

// Ban Organisation
OrgMgmt.post("/fetch-org-status", async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.body;
        const org_info = await getOrgInfo(id);

        if (!org_info) {
            return res.status(404).send({ error: "Organisation not found" });
        }
        const active = org_info[0].active;
        if (active) {
            return res.status(200).send({ active: true });
        } else if (!active) {
            return res.status(200).send({ active: false });
        } else {
            return res.status(400).send({ error: "Status unknown" });
        }
    } catch (error) {
        console.error("Error fetching:", error);
        res.status(500).send({ error: "Failed to fetch" });

    }
})