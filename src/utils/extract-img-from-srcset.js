/**
 * Extracts the URL of the last image from a srcset attribute string.
 * Example: <img srcset="https://technogroup.bg/wp-content/uploads/2025/07/invertoren-stenen-klimatik-fujitsu-aseh09knca-681b30a6d3d64-150x150.webp 150w,
 *          https://technogroup.bg/wp-content/uploads/2025/07/invertoren-stenen-klimatik-fujitsu-aseh09knca-681b30a6d3d64-300x300.webp 300w,
 *          https://technogroup.bg/wp-content/uploads/2025/07/invertoren-stenen-klimatik-fujitsu-aseh09knca-681b30a6d3d64-1024x1024.webp 1024w,
 *          https://technogroup.bg/wp-content/uploads/2025/07/invertoren-stenen-klimatik-fujitsu-aseh09knca-681b30a6d3d64-768x768.webp 768w,
 *          https://technogroup.bg/wp-content/uploads/2025/07/invertoren-stenen-klimatik-fujitsu-aseh09knca-681b30a6d3d64-600x600.webp 600w,
 *          https://technogroup.bg/wp-content/uploads/2025/07/invertoren-stenen-klimatik-fujitsu-aseh09knca-681b30a6d3d64-80x80.webp 80w,
 *          https://technogroup.bg/wp-content/uploads/2025/07/invertoren-stenen-klimatik-fujitsu-aseh09knca-681b30a6d3d64.webp 1099w"
 *          />
 * The function will return: "https://technogroup.bg/wp-content/uploads/2025/07/invertoren-stenen-klimatik-fujitsu-aseh09knca-681b30a6d3d64.webp"
 *
 * @param {*} srcset
 * @returns {string} - The URL of the last image in the srcset or empty string.
 */
const extractImgFromSrcset = (srcset) => {
  if (!srcset || typeof srcset !== "string") return "";
  const parts = srcset
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!parts.length) return "";
  // last part like: "https://...-1024x1024.webp 1024w" -> take first token
  const last = parts[parts.length - 1];
  const url = last.split(/\s+/)[0];
  return url || "";
};

export default extractImgFromSrcset;
