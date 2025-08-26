import { writeToPath } from "@fast-csv/format";
import fs from "fs";
import normalizeResult from "../utils/normalize.js";

/**
 * Writes scraped results to a timestamped CSV file.
 * @param {Array} results - The array of scraped data objects.
 */
function generateScrapedDataCSV(results) {
  const outputDir = "./output";
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const timestamp = new Date()
    .toISOString()
    .replace(/:/g, "-")
    .replace(/\.\d{3}Z$/, "");

  const normalizedResults = normalizeResult(results);

  writeToPath(`${outputDir}/table-${timestamp}.csv`, normalizedResults, {
    headers: true,
  }).on("finish", () => console.log("✅ CSV successfully created"));
}

export default generateScrapedDataCSV;
