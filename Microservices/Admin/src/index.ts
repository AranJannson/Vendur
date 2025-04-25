import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getAllOrgs, deleteProductById, orgDetails, updateOrganisationByID } from "./utils/management";

dotenv.config();

const Admin = express();

Admin.use(express.json());

Admin.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

const portNumber = 5078;

Admin.listen(portNumber, () => {
    console.log(`Admin is running on port ${portNumber}`);

});

Admin.post('/admin/deleteProduct', async (req: Request, res: Response): Promise<any> => {
    const { id } = req.body;
    const { error } = await deleteProductById(id);
    
    if (error) {
      return res.status(500).json({ message: error });
    }
  
    return res.status(200).json({ message: 'Product deleted successfully' });
  });

Admin.get('/admin/getAllOrgs', async (req: Request, res: Response): Promise<any> => {
    const orgs = await getAllOrgs();
    if (!orgs) {
        return res.status(500).json({ error: "Failed to fetch organisations" });
      }
    
      res.json(orgs);
});

Admin.post('/admin/orgDetails', async (req: Request, res: Response): Promise<any> => {
    const { vendur_id } = req.body;
    console.log(vendur_id);
    const org = await orgDetails(vendur_id);
    console.log(org);
    if (!org) {
        return res.status(500).json({ error: "Failed to fetch organisation" });
      }
    
      res.json(org.data);
  });

Admin.put('/admin/editOrgDetails', async (req, res): Promise<any> => {
    try {
      const { id, email, name, description, telephone, website, address } = req.body;
      const updateData = { name, description, email, telephone, website, address }
      const { data, error } = await updateOrganisationByID(id, updateData);

      return res.status(200).json({ message: "Organisation updated successfully", data });
      
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ message: "Failed to update organisation" });
    }
}
  );








// Admin.get("/admin", async (req: Request, res: Response) => {

//     const allSellers = await getAllSellers();

//     res.send(allSellers);

// });

// // Add seller
// Admin.post("/admin/add-seller", async (req: Request, res: Response) => {
//     const { name, email } = req.body;
    
//     const newSeller = await addSeller(name, email);

//     res.send(newSeller);

// });

// // Get seller info
// Admin.get("/admin/seller-info", async (req: Request, res: Response) => {
//     const { seller_id } = req.body;

//     const sellerInfo = await getSellerInfo(seller_id);

//     res.send(sellerInfo);

// });

// // Verify seller
// Admin.put("/admin/verify-seller", async (req: Request, res: Response) => {
//     const { seller_id } = req.body;

//     const verifiedSeller = await verifySeller(seller_id);

//     res.send(verifiedSeller);
// });

// // Ban seller
// Admin.put("/admin/ban-seller", async (req: Request, res: Response) => {
//     const { seller_id } = req.body;

//     const bannedSeller = await banSeller(seller_id);

//     res.send(bannedSeller);

// }

// );

// Admin.post("/admin", (req: Request, res: Response) => {
//     res.send("Admin is running");
    
// });

