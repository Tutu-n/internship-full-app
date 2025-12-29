import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import enrollmentMiddleware from "../middleware/enrollmentMiddleware.js";
import { submitTask } from "../controllers/submissionController.js";
import Submission from "../models/Submission.js"


const router = express.Router();

//students submit task

router.post(
    '/tasks/:taskId/submit',
    authMiddleware,
    enrollmentMiddleware,
    submitTask
);


router.get(
    '/my/submissions',
    authMiddleware,
    async(req, res) =>{
        const submissions = await Submission.find({
            student: req.user.id
        })
        .populate('task', 'title')
        .populate('internship', 'title');

        res.json(submissions)
    }
)

export default router;