import express from 'express';
import { goalSetup } from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/goal-setup', protect, goalSetup);

export default router;