import { Router } from "express";
import { createNote, getNotes } from "../controllers/notes.controller";
import { requireAuth } from "@clerk/express";
import { upload } from "../helper/multer";

const router = Router();

router
    .post("/", requireAuth(), upload.single("file"), createNote)
    .get("/:id", requireAuth(), getNotes)

export default router;