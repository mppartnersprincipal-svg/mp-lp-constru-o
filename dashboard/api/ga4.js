// Funil do site (GA4 Data API): sessões, eventos por dia, CTAs por posição e funil.
import { requireAuth, periodFromQuery } from "./_lib/auth.js";
import { runReport, rowsToObjects } from "./_lib/ga4.js";

export default async function handler(req, res) {
  if (!requireAuth(req, res)) return;
  const { since, until } = periodFromQuery(req);
  const dateRanges = [{ startDate: since, endDate: until }];

  try {
    const [overview, dailyReport, eventsReport, locationReport] = await Promise.all([
      // Totais do período: sessões, usuários, pageviews e tempo de engajamento
      runReport({
        dateRanges,
        metrics: [
          { name: "sessions" }, { name: "totalUsers" }, { name: "screenPageViews" },
          { name: "activeUsers" }, { name: "userEngagementDuration" },
        ],
      }),
      // Sessões por dia
      runReport({
        dateRanges,
        dimensions: [{ name: "date" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),
      // Contagem dos nossos eventos
      runReport({
        dateRanges,
        dimensions: [{ name: "eventName" }],
        metrics: [{ name: "eventCount" }],
        dimensionFilter: {
          filter: {
            fieldName: "eventName",
            inListFilter: { values: ["cta_click", "whatsapp_click", "lead_form_submit"] },
          },
        },
      }),
      // cta_click e whatsapp_click quebrados por location (dimensão personalizada)
      runReport({
        dateRanges,
        dimensions: [{ name: "eventName" }, { name: "customEvent:location" }],
        metrics: [{ name: "eventCount" }],
        dimensionFilter: {
          filter: {
            fieldName: "eventName",
            inListFilter: { values: ["cta_click", "whatsapp_click"] },
          },
        },
      }),
    ]);

    const totalsRow = rowsToObjects(overview)[0] ||
      { sessions: 0, totalUsers: 0, screenPageViews: 0, activeUsers: 0, userEngagementDuration: 0 };
    const daily = rowsToObjects(dailyReport).map((r) => ({
      // GA4 devolve a data como YYYYMMDD
      date: `${r.date.slice(0, 4)}-${r.date.slice(4, 6)}-${r.date.slice(6, 8)}`,
      sessions: r.sessions,
    }));
    const events = {};
    rowsToObjects(eventsReport).forEach((r) => (events[r.eventName] = r.eventCount));
    const byLocation = rowsToObjects(locationReport).map((r) => ({
      event: r.eventName,
      location: r["customEvent:location"],
      count: r.eventCount,
    }));

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    res.status(200).json({
      since,
      until,
      totals: {
        sessions: totalsRow.sessions,
        users: totalsRow.totalUsers,
        pageviews: totalsRow.screenPageViews,
        // Tempo médio de permanência por usuário ativo (mesma conta do card
        // "Tempo médio de engajamento" do GA4), em segundos.
        avg_engagement_seconds:
          totalsRow.activeUsers > 0
            ? totalsRow.userEngagementDuration / totalsRow.activeUsers
            : null,
        cta_click: events.cta_click || 0,
        whatsapp_click: events.whatsapp_click || 0,
        lead_form_submit: events.lead_form_submit || 0,
      },
      daily,
      byLocation,
    });
  } catch (err) {
    res.status(502).json({ error: String(err.message || err) });
  }
}
