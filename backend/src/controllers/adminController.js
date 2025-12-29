import User from '../models/User.js';
import Internship from '../models/Internship.js';
import Submission from '../models/Submission.js';
import Enrollment from '../models/Enrollment.js';

export const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalMentors = await User.countDocuments({ role: 'mentor' });
const totalInternships = await Internship.countDocuments();
const activeInternships = await Internship.countDocuments({ status: "active" });
        const totalSubmissions = await Submission.countDocuments();
        const totalEnrollments = await Enrollment.countDocuments();

        res.status(200).json({
            users: {
                total: totalUsers,
                students: totalStudents,
                mentors: totalMentors
            },
            internships: {
                total: totalInternships,
                active: activeInternships
            },
            
            activity: { 
                submissions: totalSubmissions,
                enrollments: totalEnrollments
            },
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
}