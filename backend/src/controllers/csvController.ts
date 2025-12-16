import { Request, Response } from "express";
import { processCSV } from "../services/csvService.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// ESM __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure results folder exists
const resultsFolder = path.resolve(__dirname, "../../results");
if (!fs.existsSync(resultsFolder)) {
  fs.mkdirSync(resultsFolder, { recursive: true });
}

export const uploadCSV = async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  try {
    const resultFile = await processCSV(req.file.path);
    const downloadLink = `/api/csv/download/${resultFile}`;
    res.json({ message: "File processed", downloadLink });
  } catch (err) {
    res.status(500).json({ message: "Error processing CSV", error: err });
  }
};

export const downloadCSV = (req: Request, res: Response) => {
  const filename = req.params.filename;

  if (!filename) {
    return res.status(400).json({ message: "filename is required" });
  }

  const filePath = path.resolve(resultsFolder, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found" });
  }

  res.download(filePath);
};
