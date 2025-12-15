import { Request, Response, NextFunction } from "express";
import { CSVProcessorService } from "../services/csv-processor.service";
import { logger } from "../utils/logger";
import { AppError } from "../middleware/error.middleware";

export class UploadController {
  private csvProcessor: CSVProcessorService;

  constructor() {
    this.csvProcessor = new CSVProcessorService();
  }

  uploadCSV = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        throw new AppError(400, "No file uploaded");
      }

      logger.info(`Processing upload: ${req.file.originalname}`);

      // Process the CSV file
      const result = await this.csvProcessor.processCSV(req.file.path);

      res.status(200).json({
        success: true,
        message: "File processed successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  downloadResult = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { filename } = req.params;

      if (!filename) {
        throw new AppError(400, "Filename is required");
      }

      const filePath = await this.csvProcessor.downloadProcessedFile(filename);

      res.download(filePath, filename, (err) => {
        if (err) {
          logger.error("Download failed:", err);
          next(new AppError(500, "Failed to download file"));
        }
      });
    } catch (error) {
      next(error);
    }
  };

  healthCheck = (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "CSV Processor API is running",
      timestamp: new Date().toISOString(),
    });
  };
}
