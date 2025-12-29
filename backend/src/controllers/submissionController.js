import Submission from '../models/Submission.js';  
import Task from '../models/Task.js';
import { completeInternshipIfEligible } from './internshipController.js';
import { createNotification } from './notificationController.js';
import { gradeSubmissionWithAI } from '../utils/aiMentor/aiGrader.js';


export const submitTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const { content } = req.body;

        // Validate input
        if (!content) {
            return res.status(400).json({
                message: 'Submission content is required'
            });
        }


        // Check if task exists
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        const existingSubmission = await Submission.findOne({
            student: req.user.id,
            task: taskId
        });

        if (existingSubmission) {
            return res.status(400).json({
                message: 'You have already submitted this task'
            });
        }

        //AI Mentor Grades Submission

        const aiResults = await gradeSubmissionWithAI({
            task,
            submissionContent: content,
            studentLevel: req.user.level || "beginner"
        });
        
        // Create the submission
        const submission = await Submission.create({
            
            student: req.user.id,
            internship: task.internship,
            task: taskId,
            content,
            grade: aiResults.grade,
            score: aiResults.score,
            feedback: aiResults.feedback,
            reviewedBy: 'AI Mentor'
            
        });

        // Create a notification for the student
        
        await createNotification(   
            req.user.id,
            'Task Submitted',
            `Your submission for the task "${task.title}" has been submitted for review.`
        );

        // Check if internship can be marked as complete

        await completeInternshipIfEligible(
            submission.student,
            submission.internship
        );

        

        res.status(201).json({
            message: 'Task submitted successfully',
            submission
        });


    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};