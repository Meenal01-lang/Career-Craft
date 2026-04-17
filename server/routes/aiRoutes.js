import express from "express";
import protect from "../middlewares/authMiddleware.js";

import {
  atsScoreCheck,
  interviewPrep,
  resumeRoast,
} from "../controllers/aiController.js";

const aiRouter = express.Router();

// Only keep working routes
aiRouter.post("/ats-check", protect, atsScoreCheck);
aiRouter.post("/resume-roast", protect, resumeRoast);
aiRouter.post("/interview-prep", protect, interviewPrep);

export default aiRouter;