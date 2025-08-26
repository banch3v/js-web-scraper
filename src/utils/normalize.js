/**
 * Ensures all records have the same set of keys for consistent CSV output.
 * Adds any missing keys to each record with an empty string as the value.
 * This guarantees every row has all columns, preventing missing headers/columns
 * resulting in incomplete data in the CSV.
 * @param {Array} results - The raw scraped product data.
 * @returns {Array} - The normalized product data.
 */
const normalizeResult = (results) => {
  const set = new Set();

  results.forEach((obj) => {
    Object.keys(obj).forEach((key) => set.add(key));
  });

  return results.map((obj) => {
    const normalized = {};
    set.forEach((key) => {
      normalized[key] = obj[key] || ""; //better for csv format as treated as blank cell
    });
    return normalized;
  });
};

export default normalizeResult;
