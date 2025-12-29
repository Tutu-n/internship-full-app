import Task from '../models/Task.js';
import Internship from '../models/Internship.js';
import { createNotification } from './notificationController.js';



// Create a new task - mentor/admin only


export const createTask = async (req, res) => {
    try {
        const internshipId = req.params.id;
        const { title, description, dueDate, status} = req.body;

        // Validate input

        if (!title || !description || !dueDate) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        // Check if internship exists

        const internship = await Internship.findById(internshipId);
        if (!internship) {
            return res.status(404).json({
                message: 'Internship not found'
            });
        }

        // Create the task
        const task = await Task.create({
            title,
            description,
            dueDate,
            internship: internshipId,
            createdBy: req.user.id,
            status
        });

        //notify students after tasks creation 
        if(internship.enrolledStudents?.length >0){
            
        for (const studentId of internship.enrolledStudents){
        await createNotification(
            studentId,
            'New Task Assigned',
            `A new task "${title}" has been assigned for your internship. Please check and complete it by ${dueDate}.`
        );
    }
}
        res.status(201).json({
            message: 'Task created successfully',
            task
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
}

// Get tasks for an internship - accessible to all roles

export const getInternshipTasks = async (req, res) => {
    try {
        const internshipId = req.params.id;

        // Check if internship exists

        const internship = await Internship.findById(internshipId);
        if (!internship) {
            return res.status(404).json({
                message: 'Internship not found'
            });
        }
               
        // Get tasks for the internship
               
        const tasks = await Task.find({ internship: internshipId }).sort({ createdAt: 1 });

        res.status(200).json({
            count: tasks.length,
            tasks
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
}