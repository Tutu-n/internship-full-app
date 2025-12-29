import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';   
import roleMiddleware from '../middleware/roleMiddleware.js';   
import { getAdminStats } from '../controllers/adminController.js';

const router = express.Router();

// Route to get admin statistics (admin only)

router.get( 
    '/admin/statistics',
    authMiddleware,
    roleMiddleware('admin'),
    getAdminStats
);

export default router;