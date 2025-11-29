import express from "express"
import { createRide,searchRides,confirmRide } from "../controllers/rideController.js"
import { protect } from "../middleware/authMiddleware.js"   

const router = express.Router()

router.post("/create",protect,createRide);
router.get("/search",searchRides)
router.get("/:id",confirmRide)
 
export default router;