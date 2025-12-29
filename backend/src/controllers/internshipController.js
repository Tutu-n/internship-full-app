import Internship from '../models/Internship.js';
import Task from '../models/Task.js';
import Submission from '../models/Submission.js';
import Enrollment from '../models/Enrollment.js';
import { generateCertificate } from './certificateController.js';
import { createNotification } from './notificationController.js';

// Create a new internship - admin only

export const createInternship = async (req, res) => {
    try{
        const {title, description, status} = req.body;
        if(!title || !description) {
            return res.status(400).json({
                message: 'Title and description are required'
            });
        }
        const internship = await Internship.create({
            title,
            description,
            createdBy: req.user.id,
            status 
        });
        res.status(201).json({
            message: 'Internship created successfully',
            internship
        });
    } catch(error){
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// Get all internships - accessible to all roles

export const getAllInternships = async (req, res) => {
    try{
        const internships = await Internship.find().populate('createdBy', 'name email role');
        res.status(200).json({
            internships
        });
    } catch(error){
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

export const completeInternshipIfEligible = async (studentId, internshipId) =>{  //student we checking and the internship being checked

//Get enrollment record for the student and internship

    const enrollment = await Enrollment.findOne({
        student: studentId,
        internship: internshipId
    });

    //if no enrollment found, do nothing and return
    if(!enrollment){
        return;
    }

    //if already completed, STOP further processing

    if(enrollment.status === 'completed'){
        return;
    }

    const tasks = await Task.find({internship: internshipId}); //queries tasks collection, getting all tasks related to internship

    const submissions = await Submission.find({
        student: studentId, //filter submissions belonging to the student only
        internship: internshipId, //filter submissions related to the internship only
        grade: {$exists: true} //only consider submissions that have been graded
    });

    //check completion condition

    if (tasks.length === 0) return;

if(tasks.length === submissions.length){ 
    
    //update enrollment status to completed

    enrollment.status = 'completed';
    enrollment.completedAt = new Date();
    await enrollment.save();

//Generate certificate for student(idempotent function - multiple calls will not create multiple certificates)
    await generateCertificate(studentId, internshipId); //call certificate generation function

    //notify student about completion
   
 await createNotification(
        studentId,
        'Internship Completed',
        `Congratulations! You have completed the internship and earned a certificate.`
    );
    
}

};