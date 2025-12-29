import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { getMentorInternships, getMentorSubmisiions } from "../controllers/mentorController.js";

const router = express.Router();

router.get(
    '/mentor/internships',
    authMiddleware,
    roleMiddleware('mentor', 'admin'),
    getMentorInternships
);

router.get(
    '/mentor/submissions',
    authMiddleware,
    roleMiddleware('mentor', 'admin'),
    getMentorSubmisiions
);

export default router;