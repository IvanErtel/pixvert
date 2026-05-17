import { writeFileSync, mkdirSync } from 'fs';
import { deflateSync } from 'zlib';

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  crcTable[n] = c;
}
function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}
function pngChunk(type, data) {
  const lenBuf = Buffer.alloc(4); lenBuf.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crcBuf = Buffer.alloc(4); crcBuf.writeUInt32BE(crc32(td));
  return Buffer.concat([lenBuf, td, crcBuf]);
}

function makePNG(size) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 2; // 8-bit RGB

  // Build pixel data: indigo gradient with a white "P" letter area
  const cx = size / 2, cy = size / 2, r = size / 2;
  const rowLen = 1 + size * 3;
  const raw = Buffer.alloc(size * rowLen);

  for (let y = 0; y < size; y++) {
    raw[y * rowLen] = 0; // filter byte
    for (let x = 0; x < size; x++) {
      const off = y * rowLen + 1 + x * 3;
      const dx = x - cx, dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) / r;

      // Gradient: indigo #6366F1 → violet #8B5CF6
      const t = (x / size) * 0.5 + (y / size) * 0.5;
      const pr = Math.round(99  + t * (139 - 99));
      const pg = Math.round(102 + t * (92  - 102));
      const pb = Math.round(241 + t * (246 - 241));

      // "P" shape in the center (white pixels)
      const nx = (x - cx) / (size * 0.18);
      const ny = (y - cy) / (size * 0.28);
      const stemX = nx > -0.5 && nx < 0.1 && Math.abs(ny) < 1;
      const bowlX = Math.pow(nx - 0.3, 2) + Math.pow(ny + 0.3, 2) < 0.55 && ny < 0.05;
      const isP = stemX || bowlX;

      if (isP) {
        raw[off] = 255; raw[off + 1] = 255; raw[off + 2] = 255;
      } else {
        raw[off] = Math.min(255, pr); raw[off + 1] = Math.min(255, pg); raw[off + 2] = Math.min(255, pb);
      }
    }
  }

  return Buffer.concat([
    sig,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', deflateSync(raw, { level: 9 })),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

try { mkdirSync('public', { recursive: true }); } catch {}
writeFileSync('public/icon-192.png', makePNG(192));
writeFileSync('public/icon-512.png', makePNG(512));
console.log('Icons generated: public/icon-192.png, public/icon-512.png');
