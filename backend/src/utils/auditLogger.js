import AuditLog from '../models/AuditLog.js';

// Function to log audit events-reusable throughout the application

export const logAuditEvent = async (actorId, action, entity, entityId) => {
    await AuditLog.create({
        actor: actorId,
        action,
        entity,
        entityId,
    });
};