import express from 'express';

import { addActivity, getActivities, deleteActivity, getActivityDashboard } from '../controller/activityController.js';

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/', protect, addActivity);
router.get('/', protect, getActivities);

router.delete('/:id', protect, deleteActivity);

router.get('/dashboard', protect, getActivityDashboard)

export default router;