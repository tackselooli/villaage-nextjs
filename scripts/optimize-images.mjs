// Optimize property images: resize to max 1200x900, convert to JPEG quality 78
import sharp from "sharp";
import fs from "fs";
import path from "path";

const DIR = "/home/z/my-project/public/images/properties";
const MAX_W = 1200;
const MAX_H = 900;
const QUALITY = 78;

async function main() {
  const files = fs.readdirSync(DIR).filter((f) => /\.(jpg|jpeg|png)$/i.test(f));
  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of files) {
    const inPath = path.join(DIR, file);
    const stat = fs.statSync(inPath);
    totalOriginal += stat.size;

    const buf = await sharp(inPath)
      .resize(MAX_W, MAX_H, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toBuffer();

    // Always output .jpg
    const outName = file.replace(/\.(png|jpeg)$/i, ".jpg");
    const outPath = path.join(DIR, outName);
    fs.writeFileSync(outPath, buf);
    totalOptimized += buf.length;

    // Remove original if name changed
    if (outName !== file) fs.unlinkSync(inPath);

    console.log(`${file} → ${outName}: ${(stat.size / 1024).toFixed(0)}KB → ${(buf.length / 1024).toFixed(0)}KB`);
  }

  console.log(`\nTotal: ${(totalOriginal / 1024 / 1024).toFixed(1)}MB → ${(totalOptimized / 1024 / 1024).toFixed(1)}MB`);
}

main().catch(console.error);
