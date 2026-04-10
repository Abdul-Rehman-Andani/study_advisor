import { Request, Response, NextFunction } from 'express';

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Default to 500 if no status code is provided
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log the error for the developer
  console.error(`[ERROR] ${req.method} ${req.url} - ${message}`);

  res.status(statusCode).json({
    success: false,
    message: message,
    // Only show stack trace in development mode
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};