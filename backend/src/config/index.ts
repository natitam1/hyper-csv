import path from "path";
import "dotenv/config";

export const config = {
  port: process.env.PORT || 3000,
  // file storage paths
  paths: {
    // navigate to the root and then into uploads/processed
    uploads: path.join(__dirname, "../../uploads"),
    processed: path.join(__dirname, "../../processed"),
  },
  // cors setup
  cors: {
    // Allow origin from any origin
    origin: "*",
  },
};
