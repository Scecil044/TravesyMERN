import asyncHandler from "express-async-handler";
import { Goal } from "../models/goal.js";

//@description
//@route
//@access
export const getGoals = asyncHandler(async (req, res) => {
  //Check if the user has an authentication token
  if (!req.user) {
    res.status(403);
    throw new Error("You have no permission to view any goals");
  }
  const goals = await Goal.find({ user: req.user.id });
  if (goals) {
    res.status(200).json(goals);
  }
});
//@description
//@route
//@access
export const getGoal = asyncHandler(async (req, res) => {
  //find goal
  const goal = await Goal.findById(req.params.id);

  if (goal) {
    if (goal.user.toString() !== req.user.id) {
      res.status(403);
      throw new Error("You have no permission to view this goals");
    }
    res.status(200).json(goal);
  } else {
    res.status(400);
    throw new Error(`Goal with id ${req.params.id} was not found `);
  }
});
//@description
//@route
//@access
export const createGoal = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(422);
    throw new Error("Enter an accompanying text");
  }
  //Check if the user has an authentication token
  if (!req.user) {
    res.status(403);
    throw new Error("You have no permission to perform this action");
  }

  //create goal
  const goal = await Goal.create({
    user: req.user.id,
    text: text,
  });
  //Chek if the process foes to completion
  if (goal) {
    res.status(200).json(goal);
  } else {
    res.status(400);
    throw new Error("An error was encountered when attempting to save goal");
  }
});
//@description
//@route
//@access
export const updateGoal = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(422);
    throw new Error("Enter an accompanying text");
  }
  //find goal in database
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(422);
    throw new Error("Goal not found");
  }
  if (goal.user.toString() !== req.user.id) {
    res.status(422);
    throw new Error("You have no permission to perform this action");
  } else {
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true }
    );
    if (updatedGoal) {
      res.status(201).json(updatedGoal);
    } else {
      res.status(400);
      throw new Error("Something went wrong");
    }
  }
});
//@description
//@route
//@access
export const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error(`Goal with the id ${req.params.id} not found`);
  }
  if (goal.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You do not have permission to perform this action");
  }
  const deleteGoal = await Goal.findByIdAndRemove(req.params.id);
  if (deleteGoal) {
    res.status(200).json({ id: req.params.id });
  } else {
    res.status(403);
    throw new Error("Oops, something ent wrong");
  }
});
