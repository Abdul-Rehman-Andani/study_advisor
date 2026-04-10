import { Router } from "express";
import { 
  createEducation, 
  updateEducation, 
  getEducation 
} from "../controllers/education.controller";
import { requireAuth } from "@clerk/express";

const router = Router();

// 1. FETCH: Get current education details
// GET /api/education
router.get("/", requireAuth(), getEducation);

// 2. CREATE: Initial setup (All fields required)
// POST /api/education/create
router.post("/create", requireAuth(), createEducation);

// 3. UPDATE: Modify existing details (Partial updates allowed)
// PATCH /api/education/update
router.patch("/update", requireAuth(), updateEducation);

export default router;