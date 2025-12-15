import { Router } from "express";
import { UploadController } from "../controllers/upload.controller";
import { upload } from "../middleware/upload.middleware";
import { validateFileUpload } from "../middleware/validation.middleware";

const router = Router();
const uploadController = new UploadController();

// Health check endpoint
router.get("/health", uploadController.healthCheck);

// Upload CSV endpoint
router.post(
  "/upload",
  upload.single("file"),
  validateFileUpload,
  uploadController.uploadCSV
);

// Download processed file endpoint
router.get("/download/:filename", uploadController.downloadResult);

export default router;
