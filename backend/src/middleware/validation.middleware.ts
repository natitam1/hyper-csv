import { Request, Response, NextFunction } from "express";
import { AppError } from "./error.middleware";

export const validateFileUpload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return next(new AppError(400, "No file uploaded"));
  }

  if (req.file.size === 0) {
    return next(new AppError(400, "Uploaded file is empty"));
  }

  next();
};
