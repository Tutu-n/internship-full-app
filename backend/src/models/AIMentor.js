import mongoose from "mongoose";

/*
  This schema represents ONE AI mentor
  Think of it as a "profile" for an AI personality
*/

const aiMentorSchema = new mongoose.Schema(
  {
    // Human-readable name
    name: {
      type: String,
      required: true,
    },

    // What domain this mentor specializes in
    // Example: "Web Development", "AI", "Data Structures"
    domain: {
      type: String,
      required: true,
    },

    // Education level it supports
    // Example: beginner / intermediate / advanced
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },

    // Short description shown to students
    description: {
      type: String,
    },

    // Prompt that defines mentor behavior
    // This will later be used when calling the AI model
    systemPrompt: {
      type: String,
      required: true,
    },

    // Whether this mentor is active or retired
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

export default mongoose.model("AIMentor", aiMentorSchema);
