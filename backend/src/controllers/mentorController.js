import Internship from "../models/Internship.js";
import Task from "../models/Task.js";
import Submission from "../models/Submission.js";

export const getMentorInternships = async (req, res) =>{

try{

    const mentorId = req.user.id;

    const internships = await Internship.find({
        mentors: mentorId // find internshipd attached to mentor id
    });

    res.json({
        count: internships.length, //find the number of internships attached to mentor id and populate them
        internships
    });

}catch(error){

    res.status(500).json({
        message: "Failed to fetch mentor internships",
        error: error.message
    });
}

};


export const getMentorSubmisiions = async (req, res) =>{

try{

    // Extract mentor ID from the authenticated user
    const mentorId = req.user.id;

// Find all tasks that were created by this mentor
    const tasks = await Task.find({createdBy: mentorId });

    // Extract only the task IDs from the task documents
    const taskIds = tasks.map(task => task._id);

    // Find all submissions where the 'task' field
    // matches any of the mentor's task IDs
    const submissions = await Submission.find({
        task: {$in: taskIds} // MongoDB $in operator
    })
    
    // Replace student ObjectId with actual student data
      // Only fetch name and email fields

    .populate('student', 'name email')
    
    // Replace task ObjectId with task title
    .populate('task', 'title');


    // Send successful response with:
    // - total number of submissions
    // - the submissions themselves
    
    res.json({
        count: submissions.length,
        submissions
    });

}catch (error) {
    res.status(500).json({
        message: 'Failed to fetch submissions',
        error: error.message
    });
}

}