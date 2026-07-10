// Métricas do Google Ads via GA4 Data API (propriedade vinculada à conta AW-17258791328):
// custo/cliques/impressões do canal google/cpc + leads (lead_form_submit) atribuídos.
// Mesmo formato de resposta do /api/meta para a UI reusar os padrões.
import { requireAuth, periodFromQuery } from "./_lib/auth.js";
import { runReport, rowsToObjects } from "./_lib/ga4.js";

const GOOGLE_CPC = "google / cpc";
const NOT_SET = "(not set)";

export default async function handler(req, res) {
  if (!requireAuth(req, res)) return;
  const { since, until } = periodFromQuery(req);
  const dateRanges = [{ startDate: since, endDate: until }];

  try {
    // Nota da GA4 Data API: dimensão usada em dimensionFilter precisa estar em `dimensions`.
    const [dailyCost, campaignCost, campaignLeads, dailyLeads] = await Promise.all([
      // Custo/cliques/impressões por dia, só do canal google/cpc.
      runReport({
        dateRanges,
        dimensions: [{ name: "date" }, { name: "sessionSourceMedium" }],
        metrics: [
          { name: "advertiserAdCost" },
          { name: "advertiserAdClicks" },
          { name: "advertiserAdImpressions" },
        ],
        dimensionFilter: {
          filter: { fieldName: "sessionSourceMedium", stringFilter: { value: GOOGLE_CPC } },
        },
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),
      // Custo por campanha do Google Ads ("(not set)" = tráfego sem campanha do Ads).
      runReport({
        dateRanges,
        dimensions: [{ name: "sessionGoogleAdsCampaignName" }],
        metrics: [
          { name: "advertiserAdCost" },
          { name: "advertiserAdClicks" },
          { name: "advertiserAdImpressions" },
        ],
      }),
      // Leads (lead_form_submit) por campanha do Google Ads.
      runReport({
        dateRanges,
        dimensions: [{ name: "sessionGoogleAdsCampaignName" }, { name: "eventName" }],
        metrics: [{ name: "eventCount" }],
        dimensionFilter: {
          filter: { fieldName: "eventName", stringFilter: { value: "lead_form_submit" } },
        },
      }),
      // Leads por dia do canal google/cpc (para a série casar com a do Meta).
      runReport({
        dateRanges,
        dimensions: [{ name: "date" }, { name: "sessionSourceMedium" }, { name: "eventName" }],
        metrics: [{ name: "eventCount" }],
        dimensionFilter: {
          andGroup: {
            expressions: [
              { filter: { fieldName: "eventName", stringFilter: { value: "lead_form_submit" } } },
              { filter: { fieldName: "sessionSourceMedium", stringFilter: { value: GOOGLE_CPC } } },
            ],
          },
        },
      }),
    ]);

    // Série diária: custo + leads mesclados por data (formato YYYYMMDD -> YYYY-MM-DD).
    const isoDate = (d) => `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;
    const dayMap = {};
    rowsToObjects(dailyCost).forEach((r) => {
      const date = isoDate(r.date);
      dayMap[date] = {
        date,
        spend: r.advertiserAdCost || 0,
        clicks: r.advertiserAdClicks || 0,
        impressions: r.advertiserAdImpressions || 0,
        leads: 0,
      };
    });
    rowsToObjects(dailyLeads).forEach((r) => {
      const date = isoDate(r.date);
      dayMap[date] = dayMap[date] || { date, spend: 0, clicks: 0, impressions: 0, leads: 0 };
      dayMap[date].leads = r.eventCount || 0;
    });
    const series = Object.values(dayMap).sort((a, b) => a.date.localeCompare(b.date));

    // Por campanha: custo + leads mesclados pelo nome da campanha do Google Ads.
    const leadsByCampaign = {};
    rowsToObjects(campaignLeads).forEach((r) => {
      if (r.sessionGoogleAdsCampaignName !== NOT_SET) {
        leadsByCampaign[r.sessionGoogleAdsCampaignName] = r.eventCount || 0;
      }
    });
    const byCampaign = rowsToObjects(campaignCost)
      .filter((r) => r.sessionGoogleAdsCampaignName !== NOT_SET)
      .map((r) => {
        const spend = r.advertiserAdCost || 0;
        const leads = leadsByCampaign[r.sessionGoogleAdsCampaignName] || 0;
        delete leadsByCampaign[r.sessionGoogleAdsCampaignName];
        return {
          name: r.sessionGoogleAdsCampaignName,
          spend,
          impressions: r.advertiserAdImpressions || 0,
          clicks: r.advertiserAdClicks || 0,
          leads,
          cpl: leads > 0 ? spend / leads : null,
        };
      });
    // Campanhas que geraram lead mas não tiveram custo no período (ex.: lead atrasado).
    Object.entries(leadsByCampaign).forEach(([name, leads]) => {
      byCampaign.push({ name, spend: 0, impressions: 0, clicks: 0, leads, cpl: null });
    });
    byCampaign.sort((a, b) => b.spend - a.spend);

    const totals = series.reduce(
      (t, d) => ({
        spend: t.spend + d.spend,
        impressions: t.impressions + d.impressions,
        clicks: t.clicks + d.clicks,
        leads: t.leads + d.leads,
      }),
      { spend: 0, impressions: 0, clicks: 0, leads: 0 }
    );

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    res.status(200).json({ since, until, totals, series, byCampaign });
  } catch (err) {
    res.status(502).json({ error: String(err.message || err) });
  }
}
