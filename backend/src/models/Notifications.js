import mongoose from "mongoose";

//each notification belongs to one user and it describes what happened and whether it was read

const notificationSchema = new mongoose.Schema(

 {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title:{
        type: String,
        required: true
    },

    message:{
        type: String,
        required: true
    },

    isRead: {
        type: Boolean,
        default: false
    }
},
{
timestamps: true //automatically adds createdAt and updatedAt fields
}
);

export default mongoose.model('Notification', notificationSchema);