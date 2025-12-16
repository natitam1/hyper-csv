import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Get current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use path.resolve for safety
const uploadFolder = path.resolve(__dirname, "../../uploads");

// Ensure uploads folder exists safely
if (!fs.existsSync(uploadFolder)) {
  try {
    fs.mkdirSync(uploadFolder, { recursive: true });
    console.log(`Upload folder created at: ${uploadFolder}`);
  } catch (err) {
    console.error("Failed to create upload folder:", err);
    process.exit(1); // Stop server if folder can't be created
  }
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// Export multer instance
export const upload = multer({ storage });
