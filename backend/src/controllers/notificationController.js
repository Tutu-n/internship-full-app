import Notification from "../models/Notifications.js";

//cretae an in-app notification for a user. This function will be reused everywhere we need to create a notification.

export const createNotification = async (userId, title, message) => {
    await Notification.create({ 
        user: userId,
        title,
        message
    });
};


//get notifications for logged in user

export const getMyNotifications = async (req, res) => {
    const notifications = await Notification.find({
        user: req.user.id,
    }).sort({ createdAt: -1 }); // Sort by most recent first

    res.json({notifications});
};


//mark a notification as read

export const markNotificationAsRead = async (req, res) => { 
    await Notification.findByIdAndUpdate(   req.params.id, {
        isRead: true
    });
    res.json({ message: 'Notification marked as read' });
};