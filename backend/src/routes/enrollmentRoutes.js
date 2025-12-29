import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {enrollInInternship} from "../controllers/enrollmentController.js";


const router = express.Router();

// Route to enroll in an internship (student only)
router.post('/internships/:id/enroll', authMiddleware, roleMiddleware('student'), enrollInInternship);

export default router;