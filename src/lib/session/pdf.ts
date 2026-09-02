import { fileSlug, type SessionSheet } from "./sheet";

const PAGE_W = 595;
const PAGE_H = 842;
const MARGIN = 48;
const HEADER_H = 86;

const WINANSI: Record<string, number> = {
  Á: 0xc1, À: 0xc0, Â: 0xc2, Ã: 0xc3, Ä: 0xc4,
  É: 0xc9, È: 0xc8, Ê: 0xca, Ë: 0xcb,
  Í: 0xcd, Ì: 0xcc, Î: 0xce, Ï: 0xcf,
  Ó: 0xd3, Ò: 0xd2, Ô: 0xd4, Õ: 0xd5, Ö: 0xd6,
  Ú: 0xda, Ù: 0xd9, Û: 0xdb, Ü: 0xdc,
  Ç: 0xc7, Ñ: 0xd1,
  á: 0xe1, à: 0xe0, â: 0xe2, ã: 0xe3, ä: 0xe4,
  é: 0xe9, è: 0xe8, ê: 0xea, ë: 0xeb,
  í: 0xed, ì: 0xec, î: 0xee, ï: 0xef,
  ó: 0xf3, ò: 0xf2, ô: 0xf4, õ: 0xf5, ö: 0xf6,
  ú: 0xfa, ù: 0xf9, û: 0xfb, ü: 0xfc,
  ç: 0xe7, ñ: 0xf1,
  "·": 0xb7, "—": 0x97, "–": 0x96, "°": 0xb0,
  "ª": 0xaa, "º": 0xba, "“": 0x93, "”": 0x94,
  "‘": 0x91, "’": 0x92, "…": 0x85,
};

function pdfString(raw: string) {
  let out = "";
  for (const ch of raw) {
    if (ch === "\\" || ch === "(" || ch === ")") {
      out += `\\${ch}`;
      continue;
    }
    const code = ch.charCodeAt(0);
    if (code >= 32 && code <= 126) {
      out += ch;
      continue;
    }
    const mapped = WINANSI[ch];
    if (mapped != null) {
      out += `\\${mapped.toString(8).padStart(3, "0")}`;
      continue;
    }
    if (code > 127) continue;
    out += "?";
  }
  return `(${out})`;
}

function wrap(text: string, widthChars: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > widthChars && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  return lines.length ? lines : [""];
}

function fieldBlock(label: string, value: string, y: number, ops: string[], maxW: number) {
  ops.push(`BT /F2 8 Tf 0.42 0.36 0.31 rg ${MARGIN} ${y} Td ${pdfString(label.toUpperCase())} Tj ET`);
  y -= 14;
  const lines = wrap(value || "—", maxW);
  for (const line of lines) {
    ops.push(`BT /F1 11 Tf 0.17 0.14 0.11 rg ${MARGIN} ${y} Td ${pdfString(line)} Tj ET`);
    y -= 15;
  }
  return y - 8;
}

function pageOps(sheet: SessionSheet, pageIndex: number, pageCount: number, bodyOps: string[]) {
  const ops: string[] = [];
  ops.push("q");
  ops.push("0.545 0.227 0.165 rg");
  ops.push(`0 ${PAGE_H - HEADER_H} ${PAGE_W} ${HEADER_H} re f`);
  ops.push("Q");
  ops.push(`BT /F2 10 Tf 1 0.97 0.94 rg ${MARGIN} ${PAGE_H - 28} Td ${pdfString("TAO VITA")} Tj ET`);
  ops.push(`BT /F2 22 Tf 1 0.97 0.94 rg ${MARGIN} ${PAGE_H - 54} Td ${pdfString("Ficha de sessão")} Tj ET`);
  ops.push(
    `BT /F1 9 Tf 1 0.97 0.94 rg ${MARGIN} ${PAGE_H - 72} Td ${pdfString(`${sheet.date}  ·  ${sheet.group ?? "Protocolo"}`)} Tj ET`,
  );
  ops.push(...bodyOps);
  ops.push("q");
  ops.push("0.894 0.847 0.784 rg");
  ops.push(`0 0 ${PAGE_W} 36 re f`);
  ops.push("Q");
  ops.push(
    `BT /F1 8 Tf 0.42 0.36 0.31 rg ${MARGIN} 16 Td ${pdfString("Apoio ao estudo e à prática. Não substitui exame presencial. Dados só neste aparelho.")} Tj ET`,
  );
  if (pageCount > 1) {
    ops.push(
      `BT /F1 8 Tf 0.42 0.36 0.31 rg ${PAGE_W - MARGIN - 40} 16 Td ${pdfString(`${pageIndex + 1}/${pageCount}`)} Tj ET`,
    );
  }
  return ops.join("\n");
}

export function buildSessionPdf(sheet: SessionSheet) {
  const maxW = 78;
  const pages: string[][] = [];
  let ops: string[] = [];
  let y = PAGE_H - HEADER_H - 28;

  const flush = () => {
    pages.push(ops);
    ops = [];
    y = PAGE_H - HEADER_H - 28;
  };

  const addField = (label: string, value: string) => {
    const lines = wrap(value || "—", maxW);
    const need = 14 + lines.length * 15 + 8;
    if (y - need < 52) flush();
    y = fieldBlock(label, value, y, ops, maxW);
  };

  const leitura = [sheet.lingua, sheet.saburra, sheet.pulso].filter(Boolean).join(" · ") || "Não informado";
  const sindrome = sheet.pct != null ? `${sheet.syndrome} (${sheet.pct}%)` : sheet.syndrome;

  addField("Paciente", sheet.patient);
  addField("Queixa", sheet.queixa);
  addField("Síndrome mais compatível (dados informados)", sindrome);
  if (sheet.mechanism) addField("Por quê", sheet.mechanism);
  addField("Língua / saburra / pulso", leitura);
  if (sheet.fatores?.length) addField("Fatores", sheet.fatores.join(", "));
  addField("Corpo", sheet.corpoDetail ?? sheet.corpo);
  addField("Orelha", sheet.ear);
  addField("YNSA", sheet.yn);
  if (sheet.extras) addField("Extras", sheet.extras);
  addField("Cautelas", sheet.caut);
  if (sheet.tec) addField("Técnica", sheet.tec);
  if (sheet.notes) addField("Notas", sheet.notes);
  addField("Orientação", "Hidratação, evitar frio local se Bi-frio, retorno conforme evolução.");

  if (ops.length) pages.push(ops);

  const pageCount = pages.length;
  const objects: string[] = [];
  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  const pageIds = pages.map((_, i) => 3 + i * 2);
  objects.push(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageCount} >>`);

  for (let i = 0; i < pages.length; i++) {
    const contentId = pageIds[i] + 1;
    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Contents ${contentId} 0 R /Resources << /Font << /F1 ${3 + pageCount * 2} 0 R /F2 ${4 + pageCount * 2} 0 R >> >> >>`,
    );
    const stream = pageOps(sheet, i, pageCount, pages[i]);
    objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  }
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");

  let pdf = "%PDF-1.4\n";
  const xref = [0];
  for (let i = 0; i < objects.length; i++) {
    xref.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
  }
  const startxref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i < xref.length; i++) {
    pdf += `${String(xref[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF`;
  return new Blob([pdf], { type: "application/pdf" });
}

export function downloadSessionPdf(sheet: SessionSheet) {
  const blob = buildSessionPdf(sheet);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Tao-Vita-ficha-${fileSlug(sheet.patient)}-${sheet.date.replace(/\//g, "-")}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function printSession(sheet: SessionSheet) {
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/>
<title>Ficha — ${sheet.patient}</title>
<style>
  @page { size: A4; margin: 14mm; }
  body { font-family: Georgia, serif; color: #2c241c; margin: 0; }
  header { background: #8b3a2a; color: #fff8f0; padding: 18px 20px; }
  h1 { font-size: 28px; margin: 4px 0 0; font-weight: 600; }
  .k { font-size: 11px; letter-spacing: .16em; text-transform: uppercase; opacity: .85; }
  main { padding: 18px 8px 8px; }
  .row { margin: 0 0 14px; }
  .lbl { font-family: system-ui, sans-serif; font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: #6b5d4e; }
  .val { margin-top: 3px; font-size: 15px; line-height: 1.4; }
  footer { margin-top: 24px; font-family: system-ui, sans-serif; font-size: 11px; color: #6b5d4e; border-top: 1px solid #e4d8c8; padding-top: 10px; }
</style></head><body>
<header><p class="k">Tao Vita</p><h1>Ficha de sessão</h1><p>${sheet.date}${sheet.group ? ` · ${sheet.group}` : ""}</p></header>
<main>
${row("Paciente", sheet.patient)}
${row("Queixa", sheet.zh ? `${sheet.queixa} · ${sheet.zh}` : sheet.queixa)}
${row("Síndrome mais compatível (dados informados)", sheet.pct != null ? `${sheet.syndrome} (${sheet.pct}%)` : sheet.syndrome)}
${sheet.mechanism ? row("Por quê", sheet.mechanism) : ""}
${row("Língua / saburra / pulso", [sheet.lingua, sheet.saburra, sheet.pulso].filter(Boolean).join(" · ") || "Não informado")}
${sheet.fatores?.length ? row("Fatores", sheet.fatores.join(", ")) : ""}
${row("Corpo", sheet.corpoDetail ?? sheet.corpo)}
${row("Orelha", sheet.ear)}
${row("YNSA", sheet.yn)}
${sheet.extras ? row("Extras", sheet.extras) : ""}
${row("Cautelas", sheet.caut)}
${sheet.tec ? row("Técnica", sheet.tec) : ""}
${sheet.notes ? row("Notas", sheet.notes) : ""}
${row("Orientação", "Hidratação, evitar frio local se Bi-frio, retorno conforme evolução.")}
<footer>Apoio ao estudo e à prática. Não substitui exame presencial. Dados só neste aparelho.</footer>
</main></body></html>`;

  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;";
  document.body.appendChild(iframe);
  const doc = iframe.contentDocument;
  if (!doc) return;
  doc.open();
  doc.write(html);
  doc.close();
  window.setTimeout(() => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    window.setTimeout(() => iframe.remove(), 1200);
  }, 250);
}

function row(label: string, value: string) {
  return `<div class="row"><div class="lbl">${esc(label)}</div><div class="val">${esc(value || "—")}</div></div>`;
}

function esc(s: string) {
  return s.replace(/[&<>"]/g, (ch) => {
    if (ch === "&") return "\u0026amp;";
    if (ch === "<") return "\u0026lt;";
    if (ch === ">") return "\u0026gt;";
    return "\u0026quot;";
  });
}
