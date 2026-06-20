import express from 'express';
import { goalSetup, aboutMe, getProfile, updateProfile, logoutUser } from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/goal-setup', protect, goalSetup);
router.get('/me', protect, aboutMe);

//profile
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/logout', logoutUser);

export default router;