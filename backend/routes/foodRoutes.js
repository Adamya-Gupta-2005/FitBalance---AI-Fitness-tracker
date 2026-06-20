import express from "express"
import { getFoods, deleteFood, addFood, getDashboardStats } from "../controller/foodController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addFood);
router.get("/", protect, getFoods);
router.delete("/:id", protect, deleteFood);

router.get("/dashboard", protect, getDashboardStats)

export default router;