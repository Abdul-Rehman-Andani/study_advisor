import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  clerkId: { type: String, required: true }, 
  title: { type: String, required: true },  
  category: { type: String, required: true },
}, {timestamps : true});

export const Course = mongoose.model("Course", courseSchema);