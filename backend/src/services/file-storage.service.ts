import fs from "fs/promises";
import path from "path";
import { config } from "../config";
import { logger } from "../utils/logger";
import { AppError } from "../middleware/error.middleware";

export class FileStorageService {
  private uploadDir: string;
  private processedDir: string;

  constructor() {
    this.uploadDir = config.upload.dir;
    this.processedDir = config.upload.processedDir;
    this.ensureDirectories();
  }

  private async ensureDirectories(): Promise<void> {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
      await fs.mkdir(this.processedDir, { recursive: true });
      logger.info("Storage directories initialized");
    } catch (error) {
      logger.error("Failed to create storage directories:", error);
      throw new AppError(500, "Failed to initialize storage");
    }
  }

  async saveProcessedFile(filename: string, content: string): Promise<string> {
    try {
      const filePath = path.join(this.processedDir, filename);
      await fs.writeFile(filePath, content);
      logger.info(`Processed file saved: ${filename}`);
      return filePath;
    } catch (error) {
      logger.error("Failed to save processed file:", error);
      throw new AppError(500, "Failed to save processed file");
    }
  }

  async getProcessedFile(filename: string): Promise<string> {
    try {
      const filePath = path.join(this.processedDir, filename);
      await fs.access(filePath);
      return filePath;
    } catch (error) {
      logger.error("Processed file not found:", error);
      throw new AppError(404, "Processed file not found");
    }
  }

  async cleanupUploadedFile(filepath: string): Promise<void> {
    try {
      await fs.unlink(filepath);
      logger.debug(`Cleaned up uploaded file: ${filepath}`);
    } catch (error) {
      logger.warn("Failed to cleanup uploaded file:", error);
    }
  }
}
