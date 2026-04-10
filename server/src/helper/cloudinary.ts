import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// 1. Force the environment variables to load immediately in this file
dotenv.config();

// 2. Validate before configuring (This will tell you EXACTLY what's wrong in the console)
const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

if (!cloud_name || !api_key || !api_secret) {
  console.error("❌ CLOUDINARY ERROR: Missing environment variables!");
  console.log("Values found:", { cloud_name, api_key: !!api_key, api_secret: !!api_secret });
}

// 3. Apply the config
cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
  secure: true, // Recommended for production
});

export default cloudinary;