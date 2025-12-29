import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { getMe, getAllUsers, getUserById, updateProfile, changeUserRole} from "../controllers/userController.js";


const router = express.Router();

//route to get current(login) user profile

router.get('/me', authMiddleware, getMe);

//route to get all users (admin only)

router.get('/', authMiddleware, roleMiddleware('admin'), getAllUsers);

//route to get any logged-in user by ID (self or admin logic only)

router.get('/:id', authMiddleware, getUserById);

//route to update user profile (self only)

router.put('/me', authMiddleware, updateProfile);

//route to change user role (admin only)

router.patch('/:id/role', authMiddleware, roleMiddleware('admin'), changeUserRole);



export default router;