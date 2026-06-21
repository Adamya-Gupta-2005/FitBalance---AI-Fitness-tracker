import express from 'express';

import {protect} from '../middleware/authMiddleware.js';

import { getWeeklyStats } from '../controller/dashboardController.js';

const router = express.Router();

router.get('/weekly', protect, getWeeklyStats);

export default router;