import express from "express";
import cors from "cors";
import protectedRoutes from "./routes/protectedRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js"
import gradingRoutes from "./routes/gradingRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";


const app = express();

//middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

//Mount auth routes

app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/users', userRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api', enrollmentRoutes);
app.use('/api', taskRoutes);
app.use('/api', submissionRoutes);
app.use('/api', gradingRoutes);
app.use('/api', certificateRoutes);
app.use('/api', mentorRoutes);
app.use('/api', adminRoutes);
app.use('/api/notifications', notificationRoutes); 

/*
app.get("/api/test", (req, res) => {
    res.json({ message: "API is working" });
  });

  app.get("/api/protected", protect, (req, res) => {
    res.json({
      message: "You accessed a protected route",
      user: req.user,
    });
  });
  */

export default app;