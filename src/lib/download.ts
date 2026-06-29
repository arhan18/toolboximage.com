/**
 * Download helper — single files + in-browser ZIP archive (no deps).
 *
 * ZIP layout (PKZip 2.0, STORE method — no recompression, since the files
 * inside are already compressed images). For the "CompressionStream" path
 * to be used we'd need DEFLATE; for image tools STORE is correct and fast.
 *
 * Public API:
 *   downloadBlob(blob, filename)              — single file
 *   downloadFiles(items, filename)            — items: {name, blob}[] → ZIP
 */

interface ZipEntry {
  name: string;
  blob: Blob;
  /** CRC-32 of the uncompressed bytes. */
  crc32: number;
  size: number;
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(bytes: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    c = CRC_TABLE[(c ^ (bytes[i] ?? 0)) & 0xff]! ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

const UTF8 = new TextEncoder();

/** Triggers a browser download for a single blob. */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Defer revoke so the click handler can read the URL in some browsers.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Build a ZIP (STORE method) from a list of {name, blob} entries and
 * trigger a download. STORE = no recompression; correct for already-
 * compressed image bytes (JPG / WebP / AVIF).
 */
export async function downloadFiles(
  files: Array<{ name: string; blob: Blob }>,
  archiveName = 'toolboximage.zip'
): Promise<void> {
  if (files.length === 0) return;
  if (files.length === 1) {
    const f = files[0]!;
    downloadBlob(f.blob, f.name);
    return;
  }

  const entries: ZipEntry[] = await Promise.all(
    files.map(async ({ name, blob }) => {
      const buf = new Uint8Array(await blob.arrayBuffer());
      return {
        name,
        blob,
        size: buf.length,
        crc32: crc32(buf),
      };
    })
  );

  // Build central directory + local file headers.
  const parts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let offset = 0;

  const now = dosDateTime(new Date());

  for (const entry of entries) {
    const nameBytes = UTF8.encode(entry.name);
    const local = buildLocalHeader(entry, nameBytes, now);
    parts.push(local);

    const buf = new Uint8Array(await entry.blob.arrayBuffer());
    parts.push(buf);
    entry.size = buf.length; // redundant; kept for clarity

    const central = buildCentralHeader(entry, nameBytes, now, offset);
    centralParts.push(central);

    offset += local.length + buf.length;
  }

  const centralStart = offset;
  for (const c of centralParts) {
    parts.push(c);
    offset += c.length;
  }
  const centralSize = offset - centralStart;

  const eocd = buildEndOfCentralDirectory(entries.length, centralSize, centralStart);
  parts.push(eocd);

  const zip = concat(parts);
  downloadBlob(new Blob([zip], { type: 'application/zip' }), archiveName);
}

function buildLocalHeader(entry: ZipEntry, nameBytes: Uint8Array, dt: number): Uint8Array {
  const buf = new Uint8Array(30 + nameBytes.length);
  const dv = new DataView(buf.buffer);
  dv.setUint32(0, 0x04034b50, true); // local file header signature
  dv.setUint16(4, 20, true);          // version needed (2.0)
  dv.setUint16(6, 0, true);           // flags
  dv.setUint16(8, 0, true);           // compression: STORE
  dv.setUint16(10, dt.time, true);
  dv.setUint16(12, dt.date, true);
  dv.setUint32(14, entry.crc32, true);
  dv.setUint32(18, entry.size, true); // compressed size (same as uncompressed for STORE)
  dv.setUint32(22, entry.size, true); // uncompressed size
  dv.setUint16(26, nameBytes.length, true);
  dv.setUint16(28, 0, true);          // extra field length
  buf.set(nameBytes, 30);
  return buf;
}

function buildCentralHeader(
  entry: ZipEntry,
  nameBytes: Uint8Array,
  dt: number,
  localOffset: number
): Uint8Array {
  const buf = new Uint8Array(46 + nameBytes.length);
  const dv = new DataView(buf.buffer);
  dv.setUint32(0, 0x02014b50, true); // central directory header signature
  dv.setUint16(4, 20, true);          // version made by
  dv.setUint16(6, 20, true);          // version needed
  dv.setUint16(8, 0, true);           // flags
  dv.setUint16(10, 0, true);          // compression: STORE
  dv.setUint16(12, dt.time, true);
  dv.setUint16(14, dt.date, true);
  dv.setUint32(16, entry.crc32, true);
  dv.setUint32(20, entry.size, true);
  dv.setUint32(24, entry.size, true);
  dv.setUint16(28, nameBytes.length, true);
  dv.setUint16(30, 0, true);          // extra
  dv.setUint16(32, 0, true);          // comment
  dv.setUint16(34, 0, true);          // disk number
  dv.setUint16(36, 0, true);          // internal attrs
  dv.setUint32(38, 0, true);          // external attrs
  dv.setUint32(42, localOffset, true);
  buf.set(nameBytes, 46);
  return buf;
}

function buildEndOfCentralDirectory(count: number, size: number, offset: number): Uint8Array {
  const buf = new Uint8Array(22);
  const dv = new DataView(buf.buffer);
  dv.setUint32(0, 0x06054b50, true);
  dv.setUint16(4, 0, true);
  dv.setUint16(6, 0, true);
  dv.setUint16(8, count, true);
  dv.setUint16(10, count, true);
  dv.setUint32(12, size, true);
  dv.setUint32(16, offset, true);
  dv.setUint16(20, 0, true);
  return buf;
}

function concat(parts: Uint8Array[]): Uint8Array {
  let total = 0;
  for (const p of parts) total += p.length;
  const out = new Uint8Array(total);
  let off = 0;
  for (const p of parts) {
    out.set(p, off);
    off += p.length;
  }
  return out;
}

function dosDateTime(d: Date): { date: number; time: number } {
  const date =
    ((d.getFullYear() - 1980) << 9) |
    ((d.getMonth() + 1) << 5) |
    d.getDate();
  const time =
    (d.getHours() << 11) |
    (d.getMinutes() << 5) |
    (d.getSeconds() >> 1);
  return { date, time };
}