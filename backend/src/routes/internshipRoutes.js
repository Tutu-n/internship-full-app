import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  createInternship,
  getAllInternships,
} from "../controllers/internshipController.js";


const router = express.Router();

// Route to create a new internship (mentor only)

router.post("/", authMiddleware, roleMiddleware("admin"), createInternship);

//all logged-in users can access this route to get all internships

router.get("/", authMiddleware, getAllInternships);

export default router;