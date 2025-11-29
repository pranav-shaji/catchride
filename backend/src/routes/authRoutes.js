import express from "express"
import { register,login } from "../controllers/authController.js"
console.log("Auth routes loaded");


const router = express.Router()

router.get("/test", (req, res) => {
  res.send("Auth routes working");
});

router.post("/register",register);
router.post("/login",login)

export default router;