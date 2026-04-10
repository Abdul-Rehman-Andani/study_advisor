import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { createPlan, getPlans, getTodaysPlans } from "../controllers/planner.controller";

const router = Router();

router
    .post("/", requireAuth(), createPlan)
    .get("/", requireAuth(), getPlans)
    .get("/today", requireAuth(), getTodaysPlans)

export default router;