// Métricas de anúncio (Meta Marketing API): série diária da conta + quebra por campanha.
import { requireAuth, periodFromQuery } from "./_lib/auth.js";

const GRAPH = "https://graph.facebook.com/v23.0";

async function graphGet(path, params) {
  const url = new URL(GRAPH + path);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  url.searchParams.set("access_token", process.env.META_ACCESS_TOKEN);
  const res = await fetch(url);
  const data = await res.json();
  if (data.error) throw new Error("Meta API: " + JSON.stringify(data.error));
  return data;
}

function leadsFromActions(actions) {
  if (!Array.isArray(actions)) return 0;
  // O evento padrão Lead do pixel chega como "offsite_conversion.fb_pixel_lead";
  // "lead" agrega leads de todas as origens.
  const hit =
    actions.find((a) => a.action_type === "offsite_conversion.fb_pixel_lead") ||
    actions.find((a) => a.action_type === "lead");
  return hit ? Number(hit.value) : 0;
}

export default async function handler(req, res) {
  if (!requireAuth(req, res)) return;
  const { since, until } = periodFromQuery(req);
  const account = process.env.META_AD_ACCOUNT_ID;
  const timeRange = JSON.stringify({ since, until });

  try {
    const [daily, campaigns] = await Promise.all([
      graphGet(`/${account}/insights`, {
        level: "account",
        time_range: timeRange,
        time_increment: "1",
        fields: "spend,impressions,clicks,inline_link_clicks,ctr,cpm,actions",
      }),
      graphGet(`/${account}/insights`, {
        level: "campaign",
        time_range: timeRange,
        fields: "campaign_name,spend,impressions,clicks,inline_link_clicks,ctr,actions",
      }),
    ]);

    const series = (daily.data || []).map((d) => ({
      date: d.date_start,
      spend: Number(d.spend || 0),
      impressions: Number(d.impressions || 0),
      clicks: Number(d.inline_link_clicks || d.clicks || 0),
      leads: leadsFromActions(d.actions),
    }));

    const byCampaign = (campaigns.data || []).map((c) => {
      const spend = Number(c.spend || 0);
      const leads = leadsFromActions(c.actions);
      return {
        name: c.campaign_name,
        spend,
        impressions: Number(c.impressions || 0),
        clicks: Number(c.inline_link_clicks || c.clicks || 0),
        ctr: Number(c.ctr || 0),
        leads,
        cpl: leads > 0 ? spend / leads : null,
      };
    });

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
