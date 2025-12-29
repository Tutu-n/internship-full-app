import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema( {

    actor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    action: {
        type: String,
        required: true,
    },

    entity: {
        type: String,
        required: true,
    },

    entityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
},
{
    timestamps: true, //automatically adds createdAt and updatedAt fields
}
);

export default mongoose.model('AuditLog', auditLogSchema);