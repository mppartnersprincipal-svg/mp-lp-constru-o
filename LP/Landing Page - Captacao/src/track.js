// track.js — Camada fina sobre o dataLayer do GTM.
// Empurra eventos de forma segura: se o GTM ainda não carregou (ou está
// bloqueado), o push só enfileira no array e nada quebra.
export function pushEvent(event, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
