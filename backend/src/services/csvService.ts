import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";

// ESM __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure results folder exists
const resultsFolder = path.resolve(__dirname, "../../results");
if (!fs.existsSync(resultsFolder)) {
  fs.mkdirSync(resultsFolder, { recursive: true });
}

export const processCSV = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const salesMap = new Map<string, number>();

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        const department = row["Department Name"];
        const sales = parseInt(row["Number of Sales"], 10);
        if (!salesMap.has(department)) salesMap.set(department, 0);
        salesMap.set(department, salesMap.get(department)! + sales);
      })
      .on("end", () => {
        const outputFileName = `${uuidv4()}.csv`;
        const outputPath = path.resolve(resultsFolder, outputFileName);

        const header = "Department Name,Total Number of Sales\n";
        const rows = Array.from(salesMap.entries())
          .map(([dept, total]) => `${dept},${total}`)
          .join("\n");

        fs.writeFileSync(outputPath, header + rows);
        resolve(outputFileName);
      })
      .on("error", reject);
  });
};
