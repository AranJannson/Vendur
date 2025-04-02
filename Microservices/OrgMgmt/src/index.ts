import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import searchOrgMgmtue from "./utils/search";
import checkStock from "./utils/fetchIItemInfo";
import { fetchAllReviews, reviews, makeReview } from "./utils/reviews";

dotenv.config();

const OrgMgmt = express();

OrgMgmt.use(express.json());

OrgMgmt.use(cors());

const portNumber = 8000;

OrgMgmt.listen(portNumber, () => {
    console.log(`OrgMgmt is running on port ${portNumber}`);
});

