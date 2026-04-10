import { Router } from "express";
import { getTotalStats } from "../controllers/stats.controller";
import { requireAuth } from "@clerk/express";

const router = Router();

router.get("/total",requireAuth(),getTotalStats);

export default router