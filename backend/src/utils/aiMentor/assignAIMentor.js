import AIMentor from "../../models/AIMentor.js";
import Enrollment from "../../models/Enrollment.js";

/**
 * Automatically assigns an AI mentor to a student
 */
export const assignAIMentor = async ({
  studentId,
  internshipId,
  domain,
  level
}) => {

      // Check if enrollment exists
  const enrollment = await Enrollment.findOne({
    student: studentId,
    internship: internshipId
  });

  if (!enrollment) {
    throw new Error("Enrollment not found");
  }
  
  // Prevent duplicate mentor assignment
  
  if (enrollment.aiMentor) {
    return enrollment.aiMentor;
  }

    //  Create AI mentor
    const aiMentor = await AIMentor.create({
        name: `AI Mentor (${domain})`,
        domain,
        level,
        assignedStudents: [studentId],
        internships: [internshipId]
      });
    
        //  Attach mentor to enrollment
        
  enrollment.aiMentor = aiMentor._id;
  await enrollment.save();

  return aiMentor;
};
