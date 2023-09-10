import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createGoal,
  updateGoal,
  deleteGoal,
  getGoal,
  getGoals,
} from "../controllers/GoalController.js";

const router = express.Router();

router.get("/show/:id", protect, getGoal);
router.get("/", protect, getGoals);
router.post("/create", protect, createGoal);
router.put("/update/:id", protect, updateGoal);
router.delete("/delete/:id", protect, deleteGoal);
export default router;
