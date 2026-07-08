// Autenticação simples do dashboard: toda rota /api exige o header
// Authorization: Bearer <DASHBOARD_PASSWORD>. Sem senha certa, 401.
export function requireAuth(req, res) {
  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) {
    res.status(500).json({ error: "DASHBOARD_PASSWORD não configurada no servidor" });
    return false;
  }
  const header = req.headers["authorization"] || "";
  const given = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (given !== expected) {
    res.status(401).json({ error: "Senha incorreta" });
    return false;
  }
  return true;
}

// Período da query: aceita ?since=YYYY-MM-DD&until=YYYY-MM-DD (presets do
// dashboard) ou ?days=N (legado). Datas no fuso de Brasília; `until` nunca
// passa de hoje e o intervalo é limitado a maxDays.
export function periodFromQuery(req, maxDays = 1095) {
  const today = new Date().toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" });
  const addDays = (ymd, n) => {
    const d = new Date(ymd + "T12:00:00Z");
    d.setUTCDate(d.getUTCDate() + n);
    return d.toISOString().slice(0, 10);
  };
  const isYMD = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s || "");

  let { since, until } = req.query;
  if (isYMD(since) && isYMD(until)) {
    if (since > until) [since, until] = [until, since];
    if (until > today) until = today;
    if (since < addDays(until, -(maxDays - 1))) since = addDays(until, -(maxDays - 1));
    return { since, until };
  }

  // Legado: ?days=N terminando hoje.
  const days = Math.min(parseInt(req.query.days || "7", 10) || 7, maxDays);
  return { since: addDays(today, -(days - 1)), until: today };
}
