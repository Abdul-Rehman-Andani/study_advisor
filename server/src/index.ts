import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from "./helper/databse";
import { globalErrorHandler } from "./middlewares/globalErrrorHandler";
import { AppError } from "./helper/error";
import userRouter from "../src/routes/user.routes";
import plannerRouter from "../src/routes/planner.route";
import courseRouter from "../src/routes/courses.route";
import notesRouter from "../src/routes/notes.route";
import taskRouter from "../src/routes/task.route";
import educationRouter from "../src/routes/education.route";
import statsRouter from "../src/routes/stats.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9001;

// global middlwares
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));


app.use(clerkMiddleware());

// API routes
app.use("/api/users", userRouter);
app.use("/api/plans", plannerRouter);
app.use("/api/courses", courseRouter);
app.use("/api/notes", notesRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/education", educationRouter);
app.use("/api/stats", statsRouter);

app.all('*splat', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
// THE GLOBAL ERROR HANDLER (MUST BE LAST)
app.use(globalErrorHandler);

console.log(process.env.CLOUDINARY_API_KEY)

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});