// Abre a composição no Chrome headless e lê os efeitos sonoros registrados (window.__nexoCues)
import puppeteer from "/home/user/Trindayy-ADS/motion-library/engine/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js";
const [dir, exe] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: exe, args: ["--no-sandbox", "--allow-file-access-from-files"] });
const p = await b.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push(String(e)));
await p.goto("file://" + dir + "/index.html", { waitUntil: "load" });
await new Promise((r) => setTimeout(r, 500));
const cues = await p.evaluate(() => window.__nexoCues || []);
const ok = await p.evaluate(() => !!(window.__timelines && window.__timelines.main));
console.log(JSON.stringify({ cues, errs, timeline: ok }));
await b.close();
