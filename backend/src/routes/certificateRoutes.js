import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Certificate from "../models/Certificate.js";

const router = express.Router();

// Route to access certificates (logged-in users only)

router.get("/certificates/me", authMiddleware, 
    async (req, res) => {
        const certificates = await Certificate.find({ 
            student: req.user.id,
        }).populate('internship');
        res.json(certificates); 
    }
);

export default router;
