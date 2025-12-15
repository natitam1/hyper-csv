import { Request, Response } from "express";
import { processCSV } from "../services/csvService";
import path from "path";

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

  const filePath = path.join(__dirname, "../../results", filename);
  res.download(filePath);
};
