import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import cloudinary from "../helper/cloudinary";
import { Note } from "../models/notes.model";
import { AppError } from "../helper/error";
import fs from "fs";
import asyncHandler from "express-async-handler";

export const createNote = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = getAuth(req);
  const { title, courseId } = req.body;

  // 1. Auth & File Guards
  if (!userId) {
    return next(new AppError("Unauthorized: No user ID found", 401));
  }

  if (!req.file) {
    return next(new AppError("Please upload a file", 400));
  }

  try {
    // 2. Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "study_notes",
      resource_type: "raw",
      type : "upload", // Handles PDF, DOCX, and Images
      access_mode : "public",
    });

    // 3. Save to Database
    const newNote = await Note.create({
      title,
      clerkId: userId,
      courseId,
      file: result.secure_url,
      cloudinary_id: result.public_id,
    });

    // 4. Local Cleanup
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(201).json({
      status: "success",
      data: newNote,
    });

  } catch (error) {
    // Crucial: Delete the temp file if Cloudinary or DB fails
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    // Re-throw to let asyncHandler catch it
    throw error;
  }
});

export const getNotes = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = getAuth(req);
  const {id} = req.params;

  if (!userId) {
    return next(new AppError("Unauthorized", 401));
  }

  const tasks = await Note.find({  courseId : id }).sort({createdAt : -1});

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
    message: "Tasks fetched successfully",
  });
});