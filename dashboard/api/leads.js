// Leads gravados pelo Make no Supabase: lista recente + agregados por dia/segmento/fatura.
import { requireAuth, periodFromQuery } from "./_lib/auth.js";

export default async function handler(req, res) {
  if (!requireAuth(req, res)) return;
  const { since, until } = periodFromQuery(req);
  // Limite superior exclusivo: primeiro dia após o período, no fuso de Brasília.
  const afterUntil = (() => {
    const d = new Date(until + "T12:00:00Z");
    d.setUTCDate(d.getUTCDate() + 1);
    return d.toISOString().slice(0, 10);
  })();

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    res.status(500).json({ error: "SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY não configurados" });
    return;
  }

  try {
    const r = await fetch(
      `${url}/rest/v1/leads?select=id,nome,empresa,whatsapp,segmento,fatura,created_at` +
        `&created_at=gte.${since}T00:00:00-03:00&created_at=lt.${afterUntil}T00:00:00-03:00` +
        `&order=created_at.desc&limit=1000`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } }
    );
    if (!r.ok) throw new Error(`Supabase ${r.status}: ${await r.text()}`);
    const leads = await r.json();

    const countBy = (field) => {
      const acc = {};
      leads.forEach((l) => {
        const v = l[field] || "(não informado)";
        acc[v] = (acc[v] || 0) + 1;
      });
      return Object.entries(acc)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
    };

    const byDay = {};
    leads.forEach((l) => {
      // created_at em UTC → dia no fuso de Brasília
      const day = new Date(l.created_at).toLocaleDateString("sv-SE", {
        timeZone: "America/Sao_Paulo",
      });
      byDay[day] = (byDay[day] || 0) + 1;
    });

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    res.status(200).json({
      since,
      until,
      total: leads.length,
      bySegmento: countBy("segmento"),
      byFatura: countBy("fatura"),
      byDay: Object.entries(byDay)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date)),
      recent: leads.slice(0, 50),
    });
  } catch (err) {
    res.status(502).json({ error: String(err.message || err) });
  }
}
