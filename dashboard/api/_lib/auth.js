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

// Período padrão: converte ?days=N em {since, until} (YYYY-MM-DD, fuso de Brasília).
export function periodFromQuery(req, maxDays = 90) {
  const days = Math.min(parseInt(req.query.days || "7", 10) || 7, maxDays);
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  const fmt = (d) => d.toISOString().slice(0, 10);
  const until = fmt(now);
  const sinceDate = new Date(now);
  sinceDate.setDate(sinceDate.getDate() - (days - 1));
  const since = fmt(sinceDate);
  return { since, until, days };
}
