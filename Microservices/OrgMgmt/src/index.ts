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
    getItemStock,
    updateItemStock
} from "./utils/productManagement";
import {getAllVerifiedOrgs, requestVerification} from "./utils/verification";
import {getOrdersByItemId, 
        getAllOrders, 
        deleteOrder, 
        updateOrderStatus, 
        getOrderGroupById, 
        getOrderStatusByOrderId, 
        updateOrderStatusByOrderId,
        updateOrderGroupStatus,
        getGroupOrderStatusByOrderId
        } from "./utils/orderManagment";
import {createOrg, getAllOrgs} from "./utils/orgDetails";

dotenv.config();

const OrgMgmt = express();

OrgMgmt.use(express.json());

OrgMgmt.use(cors({
    origin: "*",
    credentials: true
}));

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


OrgMgmt.post("/createOrg", async (req: Request, res: Response) => {


    try {
        const { org_id, name, description, email, telephone, address } = req.body;
        const data = await createOrg(org_id, name, description, email, telephone, address);
        res.status(200).send(JSON.stringify(data));
    } catch (error) {
        console.error("Error creating organisation:", error);
        res.status(500).send({ error: "Failed to create organisation" });
    }




})

OrgMgmt.get("/getVerifiedOrgs", async (req: Request, res: Response) => {

    try {
        const data = await getAllVerifiedOrgs();

        res.status(200).send(JSON.stringify(data));
    }catch (error) {
        console.error("Error fetching verified orgs:", error);
        res.status(500).send({ error: "Failed to fetch verified orgs" });
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
        const { id, org_id } = req.body;
        const data = await deleteProduct(id, org_id);
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
        const { org_id, name, email, description, productInfo, shippingMethod, image_document, image_thumbnail } = req.body.product;
        console.log('Received org_id:', org_id);
        console.log("Received request body:", req.body);
        let org_info = await getOrgInfo(org_id);
        if (!org_info) {
            return res.status(404).send({ error: "Organisation not found" });
        }
        if (org_info[0].is_verified) {
            return res.status(400).send({ error: "Organisation already verified" });
        } else {
            await requestVerification(org_id, name, email, description, productInfo, shippingMethod, image_document, image_thumbnail);
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
// Get all order groups for an org
OrgMgmt.post("/getOrderGroups", async (req: Request, res: Response) => {
    try {
        const { org_id } = req.body;
        const allItems = await getProducts(org_id)
        const matchedItems = [];
        console.log(org_id);
        for (const item of allItems) {
            console.log(item.id);
            const orders = await getOrdersByItemId(item.id);
            for (const order of orders) {
                const order_groups = await getOrderGroupById(order.group_id);  // assuming this returns array or single
                matchedItems.push({ item, order, order_groups });
            }
        }

        res.status(200).json(matchedItems);
    } catch (error) {
        console.error("Error fetching order [getOrderGroups]:", error);
        res.status(500).send("Internal Server Error");
    }
})

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

// Order Management
OrgMgmt.post("/orders", async (req: Request, res: Response) => {
    try {
        const { org_id } = req.body;
        const data = await getAllOrders(org_id)
        res.status(200).send(JSON.stringify(data));
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).send({ error: "Failed to fetch orders" });
    }
})

// Update order status
OrgMgmt.put("/update-order-status", async (req: Request, res: Response) => {
    try {
        const { order_id, status } = req.body;
        const data = await updateOrderStatus(order_id, status);
        res.status(200).send(JSON.stringify(data));
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).send({ error: "Failed to update order status" });
    }
})

// Delete order
OrgMgmt.delete("/delete-order", async (req: Request, res: Response) => {
    try {
        const { order_id } = req.body;
        const data = await deleteOrder(order_id);
        res.status(200).send(JSON.stringify(data));
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).send({ error: "Failed to delete order" });
    }
})

OrgMgmt.get('/getAllOrgs', async (req: Request, res: Response): Promise<any> => {
    const orgs = await getAllOrgs();
    if (!orgs) {
        return res.status(500).json({ error: "Failed to fetch organisations" });
      }
      res.json(orgs);
});

// Get Order Status
OrgMgmt.post("/getOrderStatus", async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const data = await getOrderStatusByOrderId(id);
        res.status(200).send(JSON.stringify(data));
    } catch (error) {
        console.error("Error retrieving data", error);
        res.status(500).send({ error: "Failed to get status" });
    }
})

// Update Order Status
// Express example for /updateOrderStatus

OrgMgmt.post("/updateOrderStatus", async (req: Request, res: Response): Promise<any> => {
    try {
        const { id, status } = req.body;

        // Update single order item
        const updatedItem = await updateOrderStatusByOrderId(id, status);

        if (!updatedItem) {
            return res.status(404).send({ error: "Order item not found" });
        }

        const orderGroupId = updatedItem.group_id;

        if (!orderGroupId) {
            return res.status(400).send({ error: "Order group ID missing" });
        }

        // Update order group status based on item statuses
        const updatedGroup = await updateOrderGroupStatus(orderGroupId);

        return res.status(200).json({ updatedItem, updatedGroup });
    } catch (error) {
        console.error("Error handling update:", error);
        res.status(500).send({ error: "Failed to process status update" });
    }
});

// Get Group Order Status
OrgMgmt.post("/getGroupOrderStatus", async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const data = await getGroupOrderStatusByOrderId(id);
        res.status(200).send(JSON.stringify(data));
    } catch (error) {
        console.error("Error retrieving data", error);
        res.status(500).send({ error: "Failed to get status" });
    }
})

//Get Stock
OrgMgmt.post("/getItemStock", async (req: Request, res: Response) => {
    try {
        const { item_id } = req.body;
        const data = await getItemStock(item_id);
        res.status(200).send(JSON.stringify(data));
    } catch (error) {
        console.error("Error retrieving data", error);
        res.status(500).send({ error: "Failed to get stock" });
    }
})