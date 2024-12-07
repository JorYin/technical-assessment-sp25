import express from "express";
import { getCurrentEntry } from "../controllers/response.js";

const router = express.Router();


router.get("/currentDate/:date", getCurrentEntry)





export default router;