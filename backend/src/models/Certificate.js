import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(  
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

        issueAt: {
            type: Date,
            default: Date.now,
        },

        certificateCode: {
            type: String,
            unique: true,
            required: true,
        },
    },
    {
        timestamps: true, //automatically adds createdAt and updatedAt fields
    }
);

//Prevent duplicate certificates for same student and internship

certificateSchema.index(
    {student: 1, internship: 1}, 
    {unique: true}
);


export default mongoose.model('Certificate', certificateSchema);