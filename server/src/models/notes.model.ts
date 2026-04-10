import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  clerkId: { type: String, required: true }, // Changed to String to match Clerk
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  file: { type: String, required: true }, // This will store the Cloudinary URL
  cloudinary_id: { type: String }, // Good practice for deleting files later
}, { timestamps: true });

export const Note = mongoose.model("Note", NotesSchema);