// utm.js — captura parâmetros de campanha da URL e persiste na sessão da aba.
// sessionStorage (e não localStorage): sobrevive à rolagem e à ida para
// sucesso.html, mas não vaza UTM de campanha antiga entre visitas.
const KEY = "mp_utms";
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];

// Chamado uma vez no carregamento: só grava se a URL trouxer algum parâmetro
// (não sobrescreve o que já foi capturado nesta sessão por uma navegação limpa).
export function captureUtms() {
  try {
    const qs = new URLSearchParams(window.location.search);
    const found = {};
    for (const p of PARAMS) {
      const v = qs.get(p);
      if (v) found[p] = v.slice(0, 200);
    }
    if (Object.keys(found).length) sessionStorage.setItem(KEY, JSON.stringify(found));
  } catch (_) {}
}

// Retorna os UTMs capturados + a origem amigável derivada (google/meta/direto).
export function getUtms() {
  let u = {};
  try {
    u = JSON.parse(sessionStorage.getItem(KEY)) || {};
  } catch (_) {}
  const origem = u.utm_source || (u.gclid ? "google" : u.fbclid ? "meta" : "direto");
  return { origem, ...u };
}
