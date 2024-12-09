import express from "express";
import { getCurrentEntry, pushComment} from "../controllers/response.js";

const router = express.Router();

/* 
  Get req to the route /currentDate/:date calling the function getCurrentEntry where data is a parameter which is the current day.
*/
router.get("/currentDate/:date", getCurrentEntry);
router.post("/currentDate/comment", pushComment);





export default router;