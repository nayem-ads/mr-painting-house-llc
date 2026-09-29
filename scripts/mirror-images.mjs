// Copies every photo the site uses from the old site's CDN into /public/media,
// so the site keeps working after the old site builder is cancelled.
// Usage: npm run images:mirror  → then set NEXT_PUBLIC_LOCAL_MEDIA=1 and rebuild.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "public", "media");
fs.mkdirSync(out, { recursive: true });

const ids = new Set();
const scan = (txt) => { for (const m of txt.matchAll(/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(?:jpe?g|png))/g)) ids.add(m[1]); };
scan(fs.readFileSync(path.join(root, "lib", "site.ts"), "utf8"));
scan(fs.readFileSync(path.join(root, "content", "showcases.json"), "utf8"));
const LOGO = "bcb5e698-0361-4a63-9b78-3f5a1de63595.png";
ids.delete(LOGO);

const cf = (id) => `https://d3p2r6ofnvoe67.cloudfront.net/fit-in/1600x1600/filters:format(jpg)/filters:strip_exif()/filters:no_upscale()/media/${id}`;
async function get(url, file) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
}

let ok = 0, fail = 0;
await get(`https://landing-page-app-hero-images.s3.amazonaws.com/media/${LOGO}`, path.join(out, "logo.png")).then(() => ok++).catch((e) => { fail++; console.error(e.message); });
for (const id of ids) {
  await get(cf(id), path.join(out, id.replace(/\.\w+$/, "") + ".jpg")).then(() => ok++).catch((e) => { fail++; console.error(e.message); });
}
console.log(`Mirrored ${ok} files to public/media (${fail} failed).`);
