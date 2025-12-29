import mongoose from 'mongoose';    

const taskSchema = new mongoose.Schema(
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

        internship: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Internship',
            required: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        status: {
            type: String,
            enum: ['pending', 'submitted', 'reviewed'],
            default: 'pending',
        },

        dueDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true, //automatically adds createdAt and updatedAt fields
    }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;