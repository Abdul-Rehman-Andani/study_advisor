import { Request, Response } from "express";
import User from "../models/user.model";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const syncUserController = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const clerkId: string = req.auth.userId; // Clerk middleware adds auth to req

    let user = await User.findOne({ clerkId });

    if (!user) {
      // Fetch full user info from Clerk
      const clerkUser = await clerkClient.users.getUser(clerkId);

      user = await User.create({
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl,
      });
    }

    res.json(user);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};