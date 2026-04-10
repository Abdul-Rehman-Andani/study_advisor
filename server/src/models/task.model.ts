import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  clerkId: { 
    type: String, 
    required: true,
    index: true 
  },
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  description: { 
    type: String, 
  },
  
  status: { 
    type: String, 
    enum: ["todo", "in-progress", "completed"], 
  },

}, { timestamps: true });

export const Task = mongoose.model("Task", taskSchema);