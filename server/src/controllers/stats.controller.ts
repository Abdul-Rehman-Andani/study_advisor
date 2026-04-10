import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { AppError } from "../helper/error";
import { Course } from "../models/course.model";
import { Task } from "../models/task.model";


export const getTotalStats = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = getAuth(req);

    if (!userId) {
        return next(new AppError("Unauthorized: User not found", 401));
    }

    const [totalCourses, totalTasks] = await Promise.all([
        Course.countDocuments({clerkId : userId}),
        Task.countDocuments({clerkId : userId})
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalCourses,
        totalTasks
      }
    });


});