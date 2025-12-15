import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { v4 as uuidv4 } from "uuid";

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
        const outputPath = path.join(
          __dirname,
          "../../results",
          outputFileName
        );
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
