import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { createObjectCsvWriter } from "csv-writer";
import { DepartmentTotal, ProcessingResult } from "../types";
import { FileStorageService } from "./file-storage.service";
import { logger } from "../utils/logger";
import { AppError } from "../middleware/error.middleware";
import { generateUniqueFileName, formatProcessingTime } from "../utils/helpers";

export class CSVProcessorService {
  private fileStorage: FileStorageService;

  constructor() {
    this.fileStorage = new FileStorageService();
  }

  /**
   * Processes CSV file using streaming for memory efficiency
   * Time Complexity: O(n) where n is number of rows
   * Space Complexity: O(k) where k is number of unique departments
   */
  async processCSV(filepath: string): Promise<ProcessingResult> {
    const startTime = Date.now();
    const departmentTotals = new Map<string, number>();

    try {
      logger.info(`Starting CSV processing: ${filepath}`);

      // Stream CSV file for memory efficiency
      await new Promise<void>((resolve, reject) => {
        fs.createReadStream(filepath)
          .pipe(csv())
          .on("data", (row) => {
            try {
              const department = row["Department Name"]?.trim();
              const sales = parseInt(
                row["Number of Sales"] || row["Number of sales"] || "0"
              );

              if (department && !isNaN(sales)) {
                const currentTotal = departmentTotals.get(department) || 0;
                departmentTotals.set(department, currentTotal + sales);
              }
            } catch (error) {
              logger.warn("Error processing row:", error);
            }
          })
          .on("end", () => {
            logger.info(
              `CSV processing completed. Departments: ${departmentTotals.size}`
            );
            resolve();
          })
          .on("error", (error) => {
            logger.error("CSV stream error:", error);
            reject(new AppError(500, "Failed to process CSV file"));
          });
      });

      // Generate output file
      const result = await this.generateOutputFile(departmentTotals);
      const processingTime = formatProcessingTime(startTime);

      // Cleanup uploaded file
      await this.fileStorage.cleanupUploadedFile(filepath);

      return {
        success: true,
        message: "CSV processed successfully",
        downloadUrl: `/download/${path.basename(result.filePath)}`,
        processingTime,
        departmentsCount: departmentTotals.size,
      };
    } catch (error) {
      logger.error("CSV processing failed:", error);
      throw error;
    }
  }

  private async generateOutputFile(
    departmentTotals: Map<string, number>
  ): Promise<{ filePath: string }> {
    const outputFilename = `processed_${generateUniqueFileName("result.csv")}`;

    // Convert map to array for CSV writing
    const records: DepartmentTotal[] = Array.from(departmentTotals.entries())
      .map(([departmentName, totalSales]) => ({
        departmentName,
        totalSales,
      }))
      .sort((a, b) => a.departmentName.localeCompare(b.departmentName));

    // Create CSV content
    let csvContent = "Department Name,Total Number of Sales\n";
    records.forEach((record) => {
      csvContent += `${record.departmentName},${record.totalSales}\n`;
    });

    // Save processed file
    const filePath = await this.fileStorage.saveProcessedFile(
      outputFilename,
      csvContent
    );

    return { filePath };
  }

  async downloadProcessedFile(filename: string): Promise<string> {
    return this.fileStorage.getProcessedFile(filename);
  }
}
