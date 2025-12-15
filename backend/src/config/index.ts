import "dotenv/config";

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  upload: {
    dir: process.env.UPLOAD_DIR || "./uploads",
    processedDir: process.env.PROCESSED_DIR || "./processed",
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || "104857600"),
    allowedTypes: (process.env.ALLOWED_FILE_TYPES || "csv").split(","),
  },
  security: {
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"),
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"),
    corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
  },
};
