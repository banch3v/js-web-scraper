import { writeToPath } from "@fast-csv/format";
import fs from "fs";

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

  writeToPath(`${outputDir}/table-${timestamp}.csv`, results, {
    headers: true,
  }).on("finish", () => console.log("CSV written"));
}

export default generateScrapedDataCSV;
