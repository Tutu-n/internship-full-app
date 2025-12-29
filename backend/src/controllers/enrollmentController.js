import Internship from '../models/Internship.js';
import Enrollment from '../models/Enrollment.js';
import { createNotification } from './notificationController.js';
import { assignAIMentor } from '../utils/aiMentor/assignAIMentor.js';

export const enrollInInternship = async (req, res) => { 
    try{
        const internshipId = req.params.id; //get internship ID from URL params from auth middleware
        
        const studentId = req.user.id; //get student ID from req.user set by auth middleware
        
        const userRole = req.user.role; //get user role from req.user

        if(userRole !== 'student') {    
            return res.status(403).json({
                message: 'Only students can enroll in internships'
            });
        }

        const internship = await Internship.findById(internshipId);
        
        //check if internship exists

        if(!internship) {
            return res.status(404).json({
                message: 'Internship not found'
            });
        }
        
        //check if internship is active

        if(internship.status !== 'active') {
            return res.status(400).json({
                message: 'Internship is closed'
            });
        }
        //check if user already enrolled, prevent duplicate enrollment

        const existingEnrollment = await Enrollment.findOne({
            student: studentId,
            internship: internshipId
        });

        if(existingEnrollment) {
            return res.status(400).json({
                message: 'User already enrolled in this internship'
            });
        }
        
        //enroll student
        const enrollment = await Enrollment.create({
            student: studentId,
            internship: internshipId
        });

        //assign AI mentor

        await assignAIMentor({
            studentId,
            internshipId,
            domain: internship.domain,
            level: internship.level
    });
        
        
        //notification called after successful enrollment

        await createNotification(
            studentId,
            'Internship Enrollment Successful',
            `You have successfully enrolled in the internship: ${internship.title}`
        );

        
        res.status(200).json({
            message: 'Enrolled in internship successfully',
            enrollmentId: enrollment._id
        });
        

    }catch(error){
        res.status(500).json({
            message: 'Enrollment failed',
            error: error.message
        });
    }
};