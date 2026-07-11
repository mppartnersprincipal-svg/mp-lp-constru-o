// prerender-entry.jsx — Roda no NODE durante o build (npm run build:html):
// renderiza o <App /> para HTML estático e injeta dentro do <div id="root">
// do index.html, entre os marcadores <!-- prerender:start --> e
// <!-- prerender:end -->. Assim o hero (elemento LCP) pinta assim que o HTML
// chega, sem esperar o download/execução do app.js — que passa a só hidratar.
import * as React from "react";
import { renderToString } from "react-dom/server";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { App } from "./App.jsx";

// Executado via `npm run build:html` — o npm garante o cwd na raiz do projeto
// da LP (a pasta do package.json), onde fica o index.html.
const indexPath = join(process.cwd(), "index.html");

const html = renderToString(<App />);

const file = readFileSync(indexPath, "utf8");
const START = "<!-- prerender:start";
const END = "<!-- prerender:end -->";
const a = file.indexOf(START);
const b = file.indexOf(END);
if (a === -1 || b === -1 || b < a) {
  console.error("prerender: marcadores prerender:start/prerender:end não encontrados no index.html.");
  process.exit(1);
}

const bloco =
  "<!-- prerender:start — o conteúdo dentro de #root é GERADO por `npm run build`\n" +
  "       (src/prerender-entry.jsx renderiza o <App /> para HTML estático, para o\n" +
  "       hero pintar sem esperar o app.js). NÃO editar à mão: será sobrescrito. -->\n" +
  `  <div id="root">${html}</div>\n` +
  "  ";

writeFileSync(indexPath, file.slice(0, a) + bloco + file.slice(b), "utf8");
console.log(`prerender: index.html atualizado (${(html.length / 1024).toFixed(1)} KB de HTML estático no #root).`);
