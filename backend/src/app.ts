import express from "express";
import cors from "cors";
import csvRoutes from "./routes/csvRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/csv", csvRoutes);

export default app;
