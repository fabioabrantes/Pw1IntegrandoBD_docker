import { Request, Response, NextFunction } from 'express';
import { AppErrosCustom } from '../errors/AppCustomError';

export function exceptionsHandle(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppErrosCustom) {
    res.status(err.statusCode).json({ message: err.message });
  }

  res.status(500).json({
    status: "Error",
    message: "Internal server error"
  });
} 