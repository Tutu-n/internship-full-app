import express from "express";  
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import enrollmentMiddleware from "../middleware/enrollmentMiddleware.js";
import {
  createTask,
  getInternshipTasks,
  
} from "../controllers/taskController.js";


const router = express.Router();

// Route to create a new task (mentor or admin only)

router.post(
    "/internships/:id/tasks",
    authMiddleware,
    roleMiddleware("mentor", "admin"),
    createTask
    );

    
    //Rout to view task for an internship

router.get(
    "/internships/:id/tasks",
    authMiddleware, enrollmentMiddleware,
    getInternshipTasks
    );

export default router;  