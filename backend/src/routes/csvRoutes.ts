import { Router } from "express";
import { uploadCSV, downloadCSV } from "../controllers/csvController";
import { upload } from "../middlewares/uploadMiddleware";

const router = Router();

router.post("/upload", upload.single("file"), uploadCSV);
router.get("/download/:filename", downloadCSV);

export default router;
