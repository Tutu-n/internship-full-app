import Enrollment from '../models/Enrollment.js';
import Task from '../models/Task.js';


const enrollmentMiddleware = async (req, res, next) => {
    try {
      const userId = req.user.id;
  
      // Admin bypass
      if (req.user.role === "admin") {
        return next();
      }
  
      let internshipId;
  
      // Case 1: Internship ID is in URL (tasks listing, etc)
      if (req.params.id) {
        internshipId = req.params.id;
      }
  
      // Case 2: Submission route → derive internship from task
      if (req.params.taskId) {
        const task = await Task.findById(req.params.taskId);
        if (!task) {
          return res.status(404).json({ message: "Task not found" });
        }
        internshipId = task.internship;
      }


      if (!internshipId) {
        return res.status(400).json({ message: 'Internship context missing' });
      }
    
      //check if user is enrolled in the internship

const enrollment  = await Enrollment.findOne({
    student: userId,
    internship: internshipId
});

//if not enrolled, return 403 forbidden/block

if(!enrollment){
    return res.status(403).json({
        massage: "You are not enrolled in this internship"
    });
}

//user is enrolled, proceed to next middleware/controller

next();
        
    } catch(error){   
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

export default enrollmentMiddleware;