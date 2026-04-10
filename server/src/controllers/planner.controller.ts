import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import ayncHandler from "express-async-handler";
import { Planner } from "../models/planner.model";

export const createPlan = ayncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = getAuth(req);

    const { title, summary, start, end } = req.body;

    const plan = await Planner.create({ clerkId: userId, title, summary, start, end });

    res.json({
        success: true,
        data: plan,
        message: "Plan created successfully"
    });

});

export const getPlans = ayncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = getAuth(req);
    const plans = await Planner.find({ clerkId: userId });

    res.json({
        success: true,
        data: plans,
        message: "Plans fetched successfully"
    });
})

export const getTodaysPlans = ayncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = getAuth(req);

    // Get the very start of today (00:00:00)
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // Get the very end of today (23:59:59)
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // Query for anything starting between the start and end of TODAY
    const plans = await Planner.find({
        clerkId: userId,
        start: {
            $gte: startOfToday,
            $lte: endOfToday
        }
    }).sort({ start: 1 });

    console.log("Plans found for today:", plans.length);

    res.json({
        success: true,
        data: plans,
        message: "Today's plans fetched successfully"
    });
});