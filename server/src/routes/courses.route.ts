import { Router } from "express";
import { createCourse, deleteCourse, getCourseById, getCourses } from "../controllers/course.controller";
import { requireAuth } from "@clerk/express";

const router = Router();

router
    .post("/", requireAuth() ,createCourse)
    .get("/", requireAuth(), getCourses)
    .get("/:id", requireAuth(), getCourseById)
    .delete("/:id", requireAuth(), deleteCourse)

export default router;