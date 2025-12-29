/**
 * AI Mentor Grader
 * ----------------
 * This function simulates how an AI mentor evaluates a student's work.
 * Later, this logic will be replaced by an LLM (GPT, Claude, etc).
 */

export const gradeSubmissionWithAI = async ({
    task,
    submissionContent,
    studentLevel,
  }) => {
  
    // Basic rule-based grading (MVP)
    let grade = "C";
    let score = 60;
    let feedback = "Good effort, but there is room for improvement.";
  
    // Simple heuristic checks
    if (submissionContent.length > 500) {
      grade = "B";
      score = 75;
      feedback = "Well-structured solution. Try improving clarity and edge cases.";
    }
  
    if (submissionContent.length > 1000) {
      grade = "A";
      score = 90;
      feedback =
        "Excellent work! The solution is thorough, well-explained, and complete.";
    }
  
    return {
      grade,     // Letter grade
      score,     // Numeric score
      feedback,  // Mentor-style feedback
    };
  };
  