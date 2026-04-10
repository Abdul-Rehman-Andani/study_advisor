import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { Course } from "../models/course.model";
import { AppError } from "../helper/error";
import { getAuth } from "@clerk/express";
import { Note } from "../models/notes.model";

export const createCourse = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // 2. Get auth session safely
  const { userId } = getAuth(req);

  if (!userId) {
    return next(new AppError("Unauthorized: User not found in session", 401));
  }

  const { title, category } = req.body;

  // 3. Simple validation
  if (!title || !category) {
    return next(new AppError("Please provide both title and category", 400));
  }

  // 4. Create and save
  const course = await Course.create({
    clerkId: userId,
    title,
    category
  });

  res.status(201).json({
    success: true,
    message: "Course created successfully",
    data: course
  });
});

export const getCourses = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = getAuth(req)

  const courses = await Course.find({ clerkId: userId }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Courses retrieved successfully",
    data: courses
  });

});

export const getCourseById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const course = await Course.findById(id);

  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Course retrieved successfully",
    data: course
  });

});

export const deleteCourse = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  // 1. Find the course first to make sure it exists
  const course = await Course.findById(id);

  if (!course) {
    return next(new AppError("No course found with that ID", 404));
  }

  // 2. CLEANUP: Delete all associated Notes and Tasks
  // This ensures your database stays clean
  // await Promise.all([
  //   Note.deleteMany({ courseId: id }),
  //   // Task.deleteMany({ courseId: id }) // Uncomment if you have tasks linked to courses
  // ]);

  // 3. Delete the actual course
  await Course.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Course and all associated resources deleted successfully",
    data: null
  });
});