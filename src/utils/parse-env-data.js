/**
 *
 * @param {*} raw
 * @returns
 * Parses environment variable string for website category URLs into array of arrays.
 * Supported input forms:
 * 1) JSON single-line: '[ ["url1","url2"], ["url3"] ]'  (preferred)
 * 2) Readable bracketed blocks:
 *    [\n+url1,\nurl2,\n];\n[\nurl3\n]
 *
 * @example
 * // Input:
 * const raw = '[ ["http://example.com/cat1","http://example.com/cat2"], ["http://example.com/cat3"] ]';
 *
 * // Output:
 * [
 *   ["http://example.com/cat1", "http://example.com/cat2"],
 *   ["http://example.com/cat3"]
 * ]
 */
function parseEnvCategoryUrls(raw) {
  if (!raw) return [];

  // 1) Try JSON parse first (preferred single-line JSON array-of-arrays)
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every((a) => Array.isArray(a))) {
      return parsed.map((cluster) =>
        cluster.map((u) => (u || "").trim()).filter(Boolean)
      );
    }
  } catch (err) {
    // ignore and try the tolerant parser below
  }

  // 2) Tolerant parser: extract groups between square brackets and split by commas
  const clusters = [];
  const regex = /\[([\s\S]*?)\]/g; // matches content between [ and ] non-greedily
  let match;
  while ((match = regex.exec(raw)) !== null) {
    const inside = match[1];
    // split on commas, trim, remove surrounding quotes and empty strings
    const urls = inside
      .split(",")
      .map((s) => s.trim())
      .map((s) => s.replace(/(^['"]|['"]$)/g, ""))
      .filter(Boolean);
    if (urls.length) clusters.push(urls);
  }

  return clusters;
}

export default parseEnvCategoryUrls;
