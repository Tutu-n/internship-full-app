import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema(   
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        internship: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Internship',
            required: true,
        },

        status: {
            type: String,
           enum: ['enrolled', 'completed'],
           default: 'enrolled',
        },

        completedAt:{
            type:Date
        },
    },
    {
        timestamps: true, //automatically adds createdAt and updatedAt fields
    }
);

export default mongoose.model('Enrollment', enrollmentSchema);