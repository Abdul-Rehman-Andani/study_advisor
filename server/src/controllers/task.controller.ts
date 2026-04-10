import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Task } from "../models/task.model";
import { AppError } from "../helper/error";
import { getAuth } from "@clerk/express";
import mongoose from "mongoose";

export const createTask = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = getAuth(req);
  
  if (!userId) {
    return next(new AppError("Unauthorized: User not found", 401));
  }

  const { title, description, dueDate, priority, status } = req.body;

  // 1. Basic Validation
  if (!title ) {
    return next(new AppError("Title and Course ID are required", 400));
  }

  // 2. Validate Course ID format


  // 3. Create Task
  const task = await Task.create({
    clerkId: userId,
    title,
    description,
    status
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: task
  });
});

export const getTasks = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = getAuth(req);
  const tasks = await Task.find({ clerkId: userId }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Tasks retrieved successfully",
    data: tasks
  });
});

export const deleteTask = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = getAuth(req);
  const { id } = req.params;  

  // 1. Find the task and ensure it belongs to the authenticated user
  const task = await Task.findOne({ _id: id, clerkId: userId });

  if (!task) {
    return next(new AppError("Task not found or you do not have permission", 404));
  }

  // 2. Perform the deletion
  await Task.deleteOne({ _id: id });

  // 3. Return a 200 (OK) or 204 (No Content) response
  res.status(200).json({
    status: "success",
    message: "Task deleted successfully",
    data: null,
  });
});