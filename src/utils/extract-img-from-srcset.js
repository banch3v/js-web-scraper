/**
 * Extracts the URL original image (no size).
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
  const images = srcset.split(",").map((s) => s.trim());
  if (!images.length) return "";

  const originalImage = images.filter((img) => {
    //regex for image that does not end with -<number>x<number>.<ext>
    return !img.match(/-\d+x\d+\.(webp|jpg|jpeg|png|gif|bmp|svg)(\s+\d+w)?$/i);
  });

  return originalImage[0].split(/\s+/)[0] || "";
};

export default extractImgFromSrcset;
