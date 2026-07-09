import * as React from "react";
import {
  ResponsiveContainer, ComposedChart, LineChart, Line, Bar, BarChart, XAxis, YAxis,
  Tooltip, Legend, CartesianGrid, PieChart, Pie, Cell,
} from "recharts";
import { apiGet, getPassword, setPassword } from "./api.js";
import { PRESETS, resolvePeriod, todayYMD, DATA_START } from "./period.js";

const BRL = (v) =>
  v == null ? "—" : v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const NUM = (v) => (v == null ? "—" : v.toLocaleString("pt-BR"));
const PCT = (v) => (v == null || !isFinite(v) ? "—" : (v * 100).toFixed(1).replace(".", ",") + "%");
const DUR = (s) => {
  if (s == null || !isFinite(s)) return "—";
  const t = Math.round(s);
  return t < 60 ? `${t}s` : `${Math.floor(t / 60)}min ${String(t % 60).padStart(2, "0")}s`;
};
const shortDate = (d) => (d ? d.slice(8, 10) + "/" + d.slice(5, 7) : "");

const LOCATION_LABELS = {
  topbar: "Topo (menu)", hero: "Hero", prova_social: "Prova social",
  matematica: "Matemática", cta_final: "CTA final",
  botao_flutuante: "Botão flutuante", rodape: "Rodapé",
};
const PIE_COLORS = ["#f59e0b", "#38bdf8", "#22c55e", "#a78bfa", "#f472b6", "#fb923c", "#94a3b8"];

const tooltipStyle = {
  contentStyle: { background: "#151518", border: "1px solid #26262b", borderRadius: 10, fontSize: 13 },
  labelStyle: { color: "#a1a1aa" },
};

function Kpi({ label, value, hint }) {
  return (
    <div className="kpi">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      {hint && <div className="hint">{hint}</div>}
    </div>
  );
}

function Funnel({ steps }) {
  const max = Math.max(...steps.map((s) => s.value), 1);
  const colors = ["#38bdf8", "#f59e0b", "#22c55e"];
  return (
    <div>
      {steps.map((s, i) => (
        <div className="funnel-step" key={s.label}>
          <div className="row"><span>{s.label}</span><b>{NUM(s.value)}</b></div>
          <div className="bar">
            <div className="fill" style={{ width: `${(s.value / max) * 100}%`, background: colors[i % colors.length] }} />
          </div>
          {i > 0 && (
            <div className="rate">
              {PCT(steps[i - 1].value > 0 ? s.value / steps[i - 1].value : null)} da etapa anterior
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Login({ onEnter }) {
  const [pwd, setPwd] = React.useState("");
  const [err, setErr] = React.useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!pwd.trim()) return setErr("Digite a senha");
    setPassword(pwd.trim());
    onEnter();
  };
  return (
    <div className="login">
      <form className="box" onSubmit={submit}>
        <h1>M<span>|</span>P — Dashboard LP Construção</h1>
        <p>Acesso restrito. Informe a senha do painel.</p>
        <input type="password" placeholder="Senha" value={pwd} onChange={(e) => setPwd(e.target.value)} autoFocus />
        <button type="submit">Entrar</button>
        {err && <div className="err">{err}</div>}
      </form>
    </div>
  );
}

// Seletor de período no formato do Gerenciador de Anúncios: lista de presets
// + intervalo personalizado (aplicado só ao clicar em "Aplicar").
function PeriodDropdown({ preset, custom, onChange }) {
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState(custom);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    setDraft(custom);
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const esc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const label =
    preset === "custom"
      ? `${shortDate(custom.since)} – ${shortDate(custom.until)}`
      : (PRESETS.find((p) => p.id === preset) || PRESETS[0]).label;

  return (
    <div className="period-dd" ref={ref}>
      <button className={"period-btn" + (open ? " open" : "")} onClick={() => setOpen(!open)}>
        <span>{label}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && (
        <div className="period-menu">
          {PRESETS.map((p) => (
            <button key={p.id} className={"item" + (p.id === preset ? " active" : "")}
              onClick={() => { onChange(p.id, custom); setOpen(false); }}>
              {p.label}
            </button>
          ))}
          <div className="custom">
            <div className={"custom-title" + (preset === "custom" ? " active" : "")}>Personalizado</div>
            <div className="custom-dates">
              <input type="date" value={draft.since} min={DATA_START} max={todayYMD()}
                onChange={(e) => setDraft({ ...draft, since: e.target.value })} />
              <span>a</span>
              <input type="date" value={draft.until} min={DATA_START} max={todayYMD()}
                onChange={(e) => setDraft({ ...draft, until: e.target.value })} />
            </div>
            <button className="apply" disabled={!draft.since || !draft.until}
              onClick={() => { onChange("custom", draft); setOpen(false); }}>
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [authed, setAuthed] = React.useState(!!getPassword());
  const [preset, setPreset] = React.useState("last_7d");
  const [custom, setCustom] = React.useState({ since: "", until: "" });
  const [meta, setMeta] = React.useState(null);
  const [ga4, setGa4] = React.useState(null);
  const [leads, setLeads] = React.useState(null);
  const [errors, setErrors] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const load = React.useCallback(async () => {
    setLoading(true);
    setErrors([]);
    const period = resolvePeriod(preset, custom);
    const results = await Promise.allSettled([
      apiGet("/api/meta", period),
      apiGet("/api/ga4", period),
      apiGet("/api/leads", period),
    ]);
    const [m, g, l] = results;
    const errs = [];
    if (results.some((r) => r.status === "rejected" && r.reason?.message === "unauthorized")) {
      setAuthed(false);
      setLoading(false);
      return;
    }
    m.status === "fulfilled" ? setMeta(m.value) : errs.push("Meta Ads: " + m.reason.message);
    g.status === "fulfilled" ? setGa4(g.value) : errs.push("GA4: " + g.reason.message);
    l.status === "fulfilled" ? setLeads(l.value) : errs.push("Leads: " + l.reason.message);
    setErrors(errs);
    setLoading(false);
  }, [preset, custom]);

  React.useEffect(() => {
    if (authed) load();
  }, [authed, load]);

  if (!authed) return <Login onEnter={() => setAuthed(true)} />;

  const period = resolvePeriod(preset, custom);
  const rangeText = period.since === period.until
    ? shortDate(period.since)
    : `${shortDate(period.since)} a ${shortDate(period.until)}`;

  const spend = meta?.totals.spend ?? null;
  const nLeads = leads?.total ?? null;
  const cpl = spend != null && nLeads > 0 ? spend / nLeads : null;
  const sessions = ga4?.totals.sessions ?? null;
  const convRate = sessions > 0 && nLeads != null ? nLeads / sessions : null;

  // Série diária combinada (gasto + leads + sessões)
  const dayMap = {};
  (meta?.series || []).forEach((d) => (dayMap[d.date] = { date: d.date, gasto: d.spend, cliques: d.clicks }));
  (leads?.byDay || []).forEach((d) => ((dayMap[d.date] = dayMap[d.date] || { date: d.date }).leads = d.count));
  (ga4?.daily || []).forEach((d) => ((dayMap[d.date] = dayMap[d.date] || { date: d.date }).sessoes = d.sessions));
  const combined = Object.values(dayMap).sort((a, b) => a.date.localeCompare(b.date))
    .map((d) => ({ leads: 0, sessoes: 0, gasto: 0, cliques: 0, ...d }));

  const ctaByLocation = (ga4?.byLocation || [])
    .filter((r) => r.event === "cta_click")
    .map((r) => ({ name: LOCATION_LABELS[r.location] || r.location, cliques: r.count }))
    .sort((a, b) => b.cliques - a.cliques);
  const waByLocation = (ga4?.byLocation || [])
    .filter((r) => r.event === "whatsapp_click")
    .map((r) => ({ name: LOCATION_LABELS[r.location] || r.location, cliques: r.count }));

  return (
    <div className="container">
      <div className="topbar">
        <div>
          <h1>M<span>|</span>P — Dashboard LP Construção</h1>
          <div className="sub">{rangeText} · mpconstrucao.com.br</div>
        </div>
        <PeriodDropdown preset={preset} custom={custom}
          onChange={(p, c) => { setPreset(p); setCustom(c); }} />
      </div>

      {errors.map((e) => <div className="error" key={e}>{e}</div>)}
      {loading && <div className="loading">Carregando métricas…</div>}

      {!loading && (
        <>
          <div className="kpis">
            <Kpi label="Investido" value={BRL(spend)} hint="Meta Ads" />
            <Kpi label="Leads" value={NUM(nLeads)} hint="formulários enviados" />
            <Kpi label="Custo por lead" value={BRL(cpl)} />
            <Kpi label="Visitas" value={NUM(sessions)} hint="sessões (GA4)" />
            <Kpi label="Visualizações" value={NUM(ga4?.totals.pageviews)} hint="páginas vistas (GA4)" />
            <Kpi label="Tempo médio na LP" value={DUR(ga4?.totals.avg_engagement_seconds)}
              hint="por usuário ativo (GA4)" />
            <Kpi label="Conversão da LP" value={PCT(convRate)} hint="leads ÷ visitas" />
            <Kpi label="Cliques no WhatsApp" value={NUM(ga4?.totals.whatsapp_click)} />
          </div>

          <div className="grid cols-2">
            <div className="card">
              <h2>Evolução diária <small>gasto × leads</small></h2>
              <ResponsiveContainer width="100%" height={260}>
                <ComposedChart data={combined}>
                  <CartesianGrid stroke="#202024" vertical={false} />
                  <XAxis dataKey="date" tickFormatter={shortDate} stroke="#6b6b74" fontSize={12} />
                  <YAxis yAxisId="l" stroke="#6b6b74" fontSize={12} allowDecimals={false} />
                  <YAxis yAxisId="r" orientation="right" stroke="#6b6b74" fontSize={12}
                    tickFormatter={(v) => "R$" + v} />
                  <Tooltip {...tooltipStyle} labelFormatter={shortDate}
                    formatter={(v, name) => (name === "gasto" ? BRL(v) : NUM(v))} />
                  <Legend wrapperStyle={{ fontSize: 13 }} />
                  <Bar yAxisId="l" dataKey="leads" name="leads" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="r" dataKey="gasto" name="gasto" stroke="#f59e0b" strokeWidth={2} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <h2>Tráfego do site <small>sessões por dia (GA4)</small></h2>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={combined}>
                  <CartesianGrid stroke="#202024" vertical={false} />
                  <XAxis dataKey="date" tickFormatter={shortDate} stroke="#6b6b74" fontSize={12} />
                  <YAxis stroke="#6b6b74" fontSize={12} allowDecimals={false} />
                  <Tooltip {...tooltipStyle} labelFormatter={shortDate} formatter={(v) => NUM(v)} />
                  <Line dataKey="sessoes" name="sessões" stroke="#38bdf8" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid cols-2">
            <div className="card">
              <h2>Funil da LP <small>visitas → CTA → lead</small></h2>
              <Funnel steps={[
                { label: "Visitas (sessões)", value: ga4?.totals.sessions || 0 },
                { label: "Cliques em CTA", value: ga4?.totals.cta_click || 0 },
                { label: "Leads (formulário)", value: ga4?.totals.lead_form_submit || 0 },
              ]} />
            </div>

            <div className="card">
              <h2>Cliques por CTA <small>qual botão converte</small></h2>
              {ctaByLocation.length === 0 ? (
                <div className="loading">Sem cliques de CTA no período</div>
              ) : (
                <ResponsiveContainer width="100%" height={230}>
                  <BarChart data={ctaByLocation} layout="vertical" margin={{ left: 30 }}>
                    <CartesianGrid stroke="#202024" horizontal={false} />
                    <XAxis type="number" stroke="#6b6b74" fontSize={12} allowDecimals={false} />
                    <YAxis type="category" dataKey="name" stroke="#a1a1aa" fontSize={12} width={110} />
                    <Tooltip {...tooltipStyle} formatter={(v) => NUM(v)} />
                    <Bar dataKey="cliques" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="grid cols-2">
            <div className="card">
              <h2>Perfil dos leads <small>segmento</small></h2>
              {!leads || leads.bySegmento.length === 0 ? (
                <div className="loading">Sem leads no período</div>
              ) : (
                <ResponsiveContainer width="100%" height={230}>
                  <PieChart>
                    <Pie data={leads.bySegmento} dataKey="value" nameKey="name"
                      innerRadius={55} outerRadius={85} paddingAngle={2}>
                      {leads.bySegmento.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip {...tooltipStyle} formatter={(v) => NUM(v)} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="card">
              <h2>Fatura acima de R$ 50 mil/mês? <small>qualidade do lead</small></h2>
              {!leads || leads.byFatura.length === 0 ? (
                <div className="loading">Sem leads no período</div>
              ) : (
                <ResponsiveContainer width="100%" height={230}>
                  <PieChart>
                    <Pie data={leads.byFatura} dataKey="value" nameKey="name"
                      innerRadius={55} outerRadius={85} paddingAngle={2}>
                      {leads.byFatura.map((e, i) => (
                        <Cell key={i} stroke="none"
                          fill={e.name === "Sim" ? "#22c55e" : e.name === "Não" ? "#ef4444" : PIE_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip {...tooltipStyle} formatter={(v) => NUM(v)} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="card" style={{ marginBottom: 12 }}>
            <h2>Campanhas (Meta Ads)</h2>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Campanha</th><th className="num">Investido</th><th className="num">Impressões</th>
                    <th className="num">Cliques</th><th className="num">Leads (pixel)</th><th className="num">CPL</th>
                  </tr>
                </thead>
                <tbody>
                  {(meta?.byCampaign || []).map((c) => (
                    <tr key={c.name}>
                      <td>{c.name}</td>
                      <td className="num">{BRL(c.spend)}</td>
                      <td className="num">{NUM(c.impressions)}</td>
                      <td className="num">{NUM(c.clicks)}</td>
                      <td className="num">{NUM(c.leads)}</td>
                      <td className="num">{BRL(c.cpl)}</td>
                    </tr>
                  ))}
                  {(!meta || meta.byCampaign.length === 0) && (
                    <tr><td colSpan={6} style={{ color: "var(--fg-3)" }}>Sem veiculação no período</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid cols-2">
            <div className="card">
              <h2>WhatsApp <small>cliques por origem</small></h2>
              {waByLocation.length === 0 ? (
                <div className="loading">Sem cliques no período</div>
              ) : (
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={waByLocation} layout="vertical" margin={{ left: 30 }}>
                    <CartesianGrid stroke="#202024" horizontal={false} />
                    <XAxis type="number" stroke="#6b6b74" fontSize={12} allowDecimals={false} />
                    <YAxis type="category" dataKey="name" stroke="#a1a1aa" fontSize={12} width={110} />
                    <Tooltip {...tooltipStyle} formatter={(v) => NUM(v)} />
                    <Bar dataKey="cliques" fill="#22c55e" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="card">
              <h2>Últimos leads</h2>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr><th>Nome</th><th>Empresa</th><th>Segmento</th><th>+50k?</th><th>Quando</th></tr>
                  </thead>
                  <tbody>
                    {(leads?.recent || []).slice(0, 10).map((l) => (
                      <tr key={l.id}>
                        <td>{l.nome}</td>
                        <td>{l.empresa || "—"}</td>
                        <td>{l.segmento}</td>
                        <td>{l.fatura}</td>
                        <td>{new Date(l.created_at).toLocaleString("pt-BR", {
                          timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit",
                          hour: "2-digit", minute: "2-digit",
                        })}</td>
                      </tr>
                    ))}
                    {(!leads || leads.recent.length === 0) && (
                      <tr><td colSpan={5} style={{ color: "var(--fg-3)" }}>Sem leads no período</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
