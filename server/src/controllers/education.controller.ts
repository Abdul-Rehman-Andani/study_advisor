import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { Education } from "../models/education.model";
import { AppError } from "../helper/error"; // Adjust this path to your actual utils folder

/** * @desc    CREATE: Initial setup for user education
 * @route   POST /api/education/create
 */
export const createEducation = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = getAuth(req);
    const { university, program, semester } = req.body;

    if (!userId) return next(new AppError("User not authenticated", 401));

    // 1. Check if user already has an education profile
    const existing = await Education.findOne({ clerkId: userId });
    if (existing) {
        return next(new AppError("Education profile already exists. Use update instead.", 400));
    }

    // 2. Create new record
    const education = await Education.create({
        clerkId: userId,
        university,
        program,
        semester
    });

    res.status(201).json({
        success: true,
        data: education
    });
});

/** * @desc    UPDATE: Modify existing education details
 * @route   PATCH /api/education/update
 */
export const updateEducation = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = getAuth(req);
    const updates = req.body;

    if (!userId) return next(new AppError("User not authenticated", 401));

    const education = await Education.findOneAndUpdate(
        { clerkId: userId },
        { $set: updates },
        { new: true, runValidators: true }
    );

    if (!education) {
        return next(new AppError("No education profile found to update.", 404));
    }

    res.status(200).json({
        success: true,
        data: education
    });
});

/** * @desc    FETCH: Get the user's details
 * @route   GET /api/education
 */
export const getEducation = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = getAuth(req);

    if (!userId) return next(new AppError("User not authenticated", 401));

    const education = await Education.findOne({ clerkId: userId });

    // We don't throw an error if education is null; 
    // the frontend needs data: null to show the setup UI.
    res.status(200).json({
        success: true,
        data: education
    });
});