// main.jsx — Entrada do CLIENTE: o HTML já vem pré-renderizado no index.html
// (gerado no build por src/prerender-entry.jsx), então aqui só HIDRATAMOS —
// o React reaproveita o DOM existente e liga os eventos/efeitos, sem
// re-renderizar do zero. É isso que tira o app.js do caminho crítico do LCP.
import * as React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { captureUtms } from "./utm.js";

// Captura os UTMs da URL logo na carga (o lead navega sem recarregar a página).
captureUtms();

const root = document.getElementById("root");
if (root.firstElementChild) {
  hydrateRoot(root, <App />);
} else {
  // Defensivo: se o #root vier vazio (index.html sem o passo de pré-render),
  // monta do zero como antes — a página nunca fica em branco.
  createRoot(root).render(<App />);
}

// Sitelinks do Google Ads chegam por /#secao: o navegador ancora durante o
// parse do HTML, mas o swap das webfonts muda a altura das seções e o alvo
// "desliza" algumas centenas de px. Quando as fontes terminam de carregar,
// re-ancora no lugar certo — a menos que o usuário já tenha rolado a página.
if (window.location.hash) {
  let usuarioRolou = false;
  const marcaRolagem = () => { usuarioRolou = true; };
  window.addEventListener("wheel", marcaRolagem, { once: true, passive: true });
  window.addEventListener("touchstart", marcaRolagem, { once: true, passive: true });
  const reancora = () => {
    if (usuarioRolou) return;
    const el = document.getElementById(window.location.hash.slice(1));
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  };
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(reancora);
}
