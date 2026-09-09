import { existsSync } from "node:fs";
import { protocols, extraPoints, earPoints, ynsaPoints } from "../src/lib/tcm/protocols.ts";
import { earMap, ynsaMap } from "../src/lib/tcm/maps.ts";
import { allPoints, getPoint } from "../src/lib/acupuncture/points.ts";
import { meridians } from "../src/lib/acupuncture/meridians.ts";
import { EXTRA_SPECS, POINT_SPECS } from "../src/lib/acupuncture/specs.ts";
import { resolveRef } from "../src/lib/acupuncture/resolve.ts";
import { VET_PLATES, VET_ROWS } from "../src/lib/tcm/vet.ts";
import { TRIGGER_POINTS, TRIGGER_VIEWS } from "../src/lib/tcm/gatilhos.ts";
import { TONGUE_SIGNS, PULSE_IMAGES } from "../src/lib/tcm/exame.ts";

const issues = [];
const note = (sev, msg) => issues.push({ sev, msg });

console.log("protocols", protocols.length);
console.log("syndromes", protocols.reduce((n, p) => n + p.ss.length, 0));
console.log("points", allPoints.length);
console.log("earMap", earMap.length, "ynsaMap", ynsaMap.length);
console.log("vet rows", VET_ROWS.length, "triggers", TRIGGER_POINTS.length);

const slugs = protocols.map((p) => p.slug);
const dup = slugs.filter((s, i) => slugs.indexOf(s) !== i);
if (dup.length) note("P0", `duplicate slugs: ${dup}`);

for (const p of protocols) {
  if (p.ss.length < 1) note("P0", `protocol ${p.slug} has no syndromes`);
  if (p.ss.length < 2) note("P2", `protocol ${p.slug} has ${p.ss.length} syndrome(s)`);
  for (const s of p.ss) {
    for (const [code] of s.corpo) {
      if (!getPoint(code) && !resolveRef(code)) note("P1", `${p.slug} body ${code} unresolved`);
    }
    for (const e of s.ear) {
      if (!earMap.some((x) => x.label === e)) note("P1", `${p.slug} ear "${e}" not in earMap`);
    }
    for (const y of s.yn) {
      if (!ynsaMap.some((x) => x.label === y) && !ynsaPoints.some(([l]) => l === y))
        note("P1", `${p.slug} ynsa "${y}" not in ynsaMap/ynsaPoints`);
    }
    for (const e of s.ex.filter(Boolean)) {
      const key = e.split(" ")[0];
      if (!resolveRef(key) && !getPoint(key)) note("P2", `${p.slug} extra "${e}" (key ${key}) unresolved`);
    }
  }
}

const FREQ = ["lombalgia", "insonia", "ansiedade", "joelho", "enxaqueca", "dismenorreia", "gastrite", "ombro"];
for (const s of FREQ) if (!protocols.find((p) => p.slug === s)) note("P1", `FREQ missing ${s}`);

for (const p of allPoints) {
  if (p.photo && !existsSync(new URL(`../public${p.photo}`, import.meta.url))) {
    const path = `/workspace/public${p.photo}`;
    if (!existsSync(path)) note("P1", `missing photo ${p.photo}`);
  }
}

const images = [
  "/images/maps/ear.jpg",
  "/images/maps/ynsa-front.jpg",
  "/images/maps/ynsa-lateral.jpg",
  "/images/maps/ynsa-occiput.jpg",
  "/docs/Tao-Vita-documentacao.pdf",
  "/docs/Tao-Vita-documentacao.html",
  "/docs/Tao-Vita-galeria-telas.html",
  "/docs/Tao-Vita-homologacao.html",
];
for (const sp of Object.values(VET_PLATES)) for (const src of Object.values(sp)) images.push(src);
for (const v of TRIGGER_VIEWS) images.push(v.src.split("?")[0]);
for (const s of TONGUE_SIGNS) if (s.img) images.push(`/images/tongue/${s.img}.jpg`);
for (const p of PULSE_IMAGES) if (p.src) images.push(p.src);
for (const src of images) {
  const path = `/workspace/public${src}`;
  if (!existsSync(path)) note("P0", `missing asset ${src}`);
}

for (const p of earMap) {
  if (p.x < 0 || p.x > 100 || p.y < 0 || p.y > 100) note("P1", `earMap ${p.label} out of bounds ${p.x},${p.y}`);
}
for (const p of ynsaMap) {
  if (p.x < 0 || p.x > 100 || p.y < 0 || p.y > 100) note("P1", `ynsaMap ${p.label} out of bounds`);
}

let thinSpecs = 0;
for (const p of allPoints) {
  if (!POINT_SPECS[p.code]) thinSpecs++;
}
console.log("points without POINT_SPECS", thinSpecs);
console.log("meridians", meridians.length, "count sum", meridians.reduce((n, m) => n + m.count, 0));
console.log("EXTRA_SPECS", Object.keys(EXTRA_SPECS).length, "extraPoints", extraPoints.length);
console.log("earPoints", earPoints.length, "ynsaPoints", ynsaPoints.length);

const blob = JSON.stringify({ protocols, extraPoints }).toLowerCase();
for (const w of ["cura o", "garante", "diagnóstico automático"]) {
  if (blob.includes(w)) note("P1", `forbidden language: ${w}`);
}

const bySev = { P0: 0, P1: 0, P2: 0, P3: 0 };
for (const i of issues) bySev[i.sev] = (bySev[i.sev] || 0) + 1;
console.log("\nISSUES", issues.length, bySev);
for (const i of issues) console.log(`${i.sev}\t${i.msg}`);
