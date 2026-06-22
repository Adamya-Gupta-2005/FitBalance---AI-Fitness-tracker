import express from "express"
import { getFoods, deleteFood, addFood, getDashboardStats, analyzeFood } from "../controller/foodController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", protect, addFood);
router.get("/", protect, getFoods);
router.delete("/:id", protect, deleteFood);

router.get("/dashboard", protect, getDashboardStats);

router.post('/analyze', protect, upload.single('image'), analyzeFood);

export default router;