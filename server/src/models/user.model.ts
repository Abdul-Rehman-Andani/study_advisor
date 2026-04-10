import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, unique: true, required: true },
    email: String,
    firstName: String,
    lastName: String,
    imageUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);