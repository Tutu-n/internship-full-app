import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(   
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        
        internship: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Internship",
            required: true
        },
        
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
            required: true,
        },

        content: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ['pending', 'reviewed'],
            default: 'pending',
        },

        score: {
            type: Number,
            min: 0,
            max: 100
          },

        feedback: {
            type: String,
        },
        grade:{
            type: Number,
            min: 0,
            max: 100

        },
        reviewedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        reviewedAt: {
            type: Date
        },
    },
    {
        timestamps: true, //automatically adds createdAt and updatedAt fields
    }
);

export default mongoose.model('Submission', submissionSchema);