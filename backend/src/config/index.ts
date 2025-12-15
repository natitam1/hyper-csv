import path from "path";
import "dotenv/config";

export const config = {
  port: process.env.PORT || 3000,
  paths: {
    // navigate to the root and then into uploads/processed
    uploads: path.join(__dirname, "../../uploads"),
    processed: path.join(__dirname, "../../processed"),
  },
  cors: {
    origin: "*",
  },
};
