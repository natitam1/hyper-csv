import { Router } from "express";
import { uploadCSV, downloadCSV } from "../controllers/csvController.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = Router();

router.post("/upload", upload.single("file"), uploadCSV);
router.get("/download/:filename", downloadCSV);

export default router;
