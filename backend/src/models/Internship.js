import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema(
    { 
     title: {
        type: String,
        required: true,
        trim: true,
     },


        description: {
            type: String,
            required: true,
        },


        createdBy: {    
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },


        mentors: [
            {    
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],


    /*enrolledStudents: [
        {    
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
    ],*/


    status: {
        type: String,
        enum: ['draft', 'active', 'completed'],
        default: 'draft',
        required: true,
    }
},
{
    timestamps: true, //automatically adds createdAt and updatedAt fields
}
);

const Internship = mongoose.model('Internship', internshipSchema);

export default Internship;
