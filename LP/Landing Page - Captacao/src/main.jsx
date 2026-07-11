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
