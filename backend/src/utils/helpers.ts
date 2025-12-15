import { v4 as uuidv4 } from "uuid";

/**
 * Generates a unique filename with UUID
 */
export const generateUniqueFileName = (originalName: string): string => {
  const extension = originalName.split(".").pop();
  const uniqueId = uuidv4();
  return `${uniqueId}.${extension}`;
};

/**
 * Validates if a file is a CSV
 */
export const isValidCSV = (mimetype: string, originalname: string): boolean => {
  const validMimeTypes = ["text/csv", "application/csv", "text/plain"];
  const validExtension = originalname.toLowerCase().endsWith(".csv");
  return validMimeTypes.includes(mimetype) && validExtension;
};

/**
 * Formats processing time
 */
export const formatProcessingTime = (startTime: number): number => {
  return parseFloat(((Date.now() - startTime) / 1000).toFixed(2));
};
