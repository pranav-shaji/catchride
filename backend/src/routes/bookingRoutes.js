import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { bookRideImmediate } from "../controllers/bookingController.js"

const router = express.Router();

router.post("/book", protect, bookRideImmediate);

export default router;