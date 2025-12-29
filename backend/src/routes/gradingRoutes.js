import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { gradeSubmission } from "../controllers/gradingController.js";


const router = express.Router();

// Route to grade a submission (mentor or admin only)

router.put(
    "/submissions/:submissionId/grade",
    authMiddleware,
    roleMiddleware("mentor", "admin"),
    gradeSubmission
);
export default router;