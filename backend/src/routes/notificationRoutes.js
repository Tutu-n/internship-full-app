import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";   
import { getMyNotifications, markNotificationAsRead } from "../controllers/notificationController.js";

const router = express.Router();

// Route to get notifications for the logged-in user

router.get('/', 
    authMiddleware, 
    getMyNotifications
);

// Route to mark a notification as read

router.patch('/:id/read', 
    authMiddleware, 
    markNotificationAsRead
);

export default router;