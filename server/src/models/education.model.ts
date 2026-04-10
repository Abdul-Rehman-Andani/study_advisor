import mongoose from "mongoose";

const eductionSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true },
    university: { type: String, required: true },
    program: { type: String, required: true },
    semester: { type: String, required: true }
}, { timestamps: true });

export const Education = mongoose.model("Education", eductionSchema);