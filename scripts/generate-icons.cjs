const https = require('https');
const fs = require('fs');
const path = require('path');
const ICON_URL = 'https://cdn-icons-png.flaticon.com/512/3665/3665924.png';
const OUT_DIR = path.join(__dirname, '..', 'public', 'icons');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}
function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  ensureDir(OUT_DIR);
  console.log('Downloading icon...');
  const buffer = await download(ICON_URL);
  const icon512 = path.join(OUT_DIR, 'icon-512.png');
  fs.writeFileSync(icon512, buffer);
  console.log('Wrote', icon512);
  try {
    const sharp = require('sharp');
    await sharp(buffer).resize(192, 192).png().toFile(path.join(OUT_DIR, 'icon-192.png'));
    console.log('Wrote icon-192.png');
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      fs.copyFileSync(icon512, path.join(OUT_DIR, 'icon-192.png'));
      console.log('Wrote icon-192.png (copy; npm install -D sharp for resize)');
    } else throw e;
  }
}
main().catch((err) => { console.error(err); process.exit(1); });
