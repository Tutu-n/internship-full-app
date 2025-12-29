import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";   



const router = express.Router();


/*any logined-in user can access this route
router.get('/profile', authMiddleware, (req, res) => {
    res.json({
        message: 'Profile accessed',
        user: req.user
    });
});
*/

//only admins can access this route

router.get('/admin', authMiddleware, roleMiddleware('admin'), 
(req, res) => {
res.json({
    message: 'Welcome Admin',
    
});
});

//student only route
router.get('/student', 
    authMiddleware, 
    roleMiddleware('student'),
    (req, res) => {
        res.json({
            message: 'Welcome Student',
            
        });
    });

//mentor only route

router.get('/mentor', 
    authMiddleware, 
    roleMiddleware('mentor'),
    (req, res) => {
        res.json({
            message: 'Welcome Mentor',
            
        });
    });

export default router;