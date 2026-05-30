import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const IMAGES_DIR = '/Users/johnhofstetter/Library/CloudStorage/GoogleDrive-john@stateofthedesign.com/My Drive/The Agency/Moto Nineties/Website/moto-nineties/public/images';
const JPG_QUALITY = 82;
const PNG_QUALITY = 80;
const MAX_WIDTH = 1920;

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getFiles(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

const files = await getFiles(IMAGES_DIR);
const images = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

let saved = 0;
let count = 0;

for (const file of images) {
  const ext = extname(file).toLowerCase();
  const before = (await stat(file)).size;

  try {
    const img = sharp(file);
    const meta = await img.metadata();

    let pipeline = img;
    if (meta.width && meta.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
    }

    let buf;
    if (ext === '.jpg' || ext === '.jpeg') {
      buf = await pipeline.jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toBuffer();
    } else if (ext === '.png') {
      buf = await pipeline.png({ compressionLevel: 9, palette: true }).toBuffer();
    } else if (ext === '.webp') {
      buf = await pipeline.webp({ quality: JPG_QUALITY }).toBuffer();
    }

    if (buf && buf.length < before) {
      const { writeFile } = await import('fs/promises');
      await writeFile(file, buf);
      const after = buf.length;
      const pct = Math.round((1 - after / before) * 100);
      saved += before - after;
      count++;
      console.log(`✓ ${basename(file)} — ${(before/1024/1024).toFixed(1)}MB → ${(after/1024/1024).toFixed(1)}MB (${pct}% smaller)`);
    } else {
      console.log(`  ${basename(file)} — already optimal, skipped`);
    }
  } catch (e) {
    console.log(`  ✗ ${basename(file)} — ${e.message}`);
  }
}

console.log(`\nDone. Optimized ${count} images, saved ${(saved/1024/1024).toFixed(1)}MB total.`);
