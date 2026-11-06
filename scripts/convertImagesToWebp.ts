import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceRoot = path.resolve('assets-source');
const outputRoot = path.resolve('public/images');
const supportedExtensions = new Set(['.svg', '.png', '.jpg', '.jpeg']);

// Vector sources are rendered at 4x so they stay sharp on high-density screens.
const svgDensity = 288;

async function convertFolder(folder: string): Promise<void> {
  const entries = await readdir(folder, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(folder, entry.name);

    if (entry.isDirectory()) {
      await convertFolder(sourcePath);
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (!supportedExtensions.has(extension)) continue;

    const relativePath = path.relative(sourceRoot, sourcePath);
    const outputPath = path
      .join(outputRoot, relativePath)
      .replace(/\.[^.]+$/, '.webp');

    await mkdir(path.dirname(outputPath), { recursive: true });

    const options = extension === '.svg' ? { density: svgDensity } : {};
    const result = await sharp(sourcePath, options)
      .webp({ quality: 90, alphaQuality: 100 })
      .toFile(outputPath);

    console.log(
      `${relativePath} -> ${result.width}x${result.height}, ${Math.round(result.size / 1024)} KB`,
    );
  }
}

await convertFolder(sourceRoot);
