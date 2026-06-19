import express from 'express';
import { goalSetup, aboutMe } from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/goal-setup', protect, goalSetup);
router.get('/me', protect, aboutMe);

export default router;