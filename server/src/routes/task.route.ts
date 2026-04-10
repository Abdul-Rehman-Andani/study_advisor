import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { createTask, deleteTask, getTasks } from "../controllers/task.controller";

const router = Router();

router
.post("/", requireAuth() ,createTask)
.get("/", requireAuth(), getTasks)
.delete("/:id", requireAuth(), deleteTask)

export default router;