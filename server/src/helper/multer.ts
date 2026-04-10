import multer from 'multer';
import { AppError } from '../helper/error';
import path from 'path';

// 1. Define where to store the file temporarily
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    // Give it a unique name: timestamp + original name
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// 2. File Filter (Security: Only allow PDF, Word, and Images)
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = [
    'image/jpeg', 
    'image/png', 
    'application/pdf', 
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError('Invalid file type. Only JPEGs, PNGs, PDFs, and Word docs are allowed!', 400), false);
  }
};

// 3. Initialize Multer
export const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limit: 5MB
  }
});