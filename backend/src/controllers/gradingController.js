import Submission from '../models/Submission.js';
import { createNotification } from './notificationController.js';

export const gradeSubmission = async (req, res) => {    
    try {
        const {submissionId} = req.params;
        const { score, feedback } = req.body;

        // Validate input
        if (score == undefined || feedback == undefined) {
            return res.status(400).json({
                message: 'Score and feedback are required'
            });
        }

        // Check if submission exists
        
        const submission = await Submission.findById(submissionId);
        
        if (!submission) {
            return res.status(404).json({
                message: 'Submission not found'
            });
        }

        // Update the submission with grade and feedback
    
        submission.score = score;
        submission.feedback = feedback;
        submission.status = 'reviewed';
        submission.reviewedAt = Date.now();
        submission.reviewedBy = req.user.id;


        await submission.save();

        //notify the student about grading

        await createNotification(
            submission.student,
            'Submission Graded',
            'Your task has been graded. Check feedback and Score');


        res.status(200).json({
            message: 'Submission graded successfully',
            submission
        });
        
        
    } catch (error) {
        res.status(500).json({
            message: 'Grading failed',
            error: error.message
        });
    }
};