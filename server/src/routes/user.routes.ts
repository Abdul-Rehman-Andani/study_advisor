import { Router } from "express";
import { syncUserController } from "../controllers/user.controller";
import { requireAuth } from "@clerk/express";

const router = Router();

router.post("/sync", requireAuth(), syncUserController);


export default router;