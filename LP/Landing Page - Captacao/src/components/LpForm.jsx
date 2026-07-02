// LpForm.jsx — Seção 3: Formulário de qualificação + envio para o WhatsApp dos donos
import * as React from "react";
import { MpButton } from "./MpButton.jsx";
import { Reveal } from "./anim.jsx";
import { pushEvent } from "../track.js";

const WEBHOOK_URL = "https://hook.us1.make.com/jlpu2a7pnlsz4bhua7i27breutsxybga";

function TextField({ label, value, onChange, placeholder, error, type = "text" }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div>
      <label style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13,
        color: "var(--fg-2)", marginBottom: 10, letterSpacing: ".01em" }}>{label}</label>
      <input
        type={type} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          width: "100%", boxSizing: "border-box", background: "var(--bg-page)",
          border: `1px solid ${error ? "var(--danger)" : focus ? "var(--accent)" : "var(--border-2)"}`,
          color: "var(--fg-1)", borderRadius: "var(--r-sm)", padding: "15px 16px",
          /* 16px evita o auto-zoom do iOS Safari ao focar o campo no mobile */
          fontFamily: "var(--font-body)", fontSize: 16, outline: "none",
          boxShadow: focus && !error ? "0 0 0 3px rgba(245,166,35,0.18)" : "none", transition: "all 160ms",
        }}
      />
      {error && <div style={{ fontSize: 12, color: "var(--danger)", marginTop: 6, fontFamily: "var(--font-body)" }}>{error}</div>}
    </div>
  );
}

function ChipGroup({ label, options, value, onChange, error }) {
  return (
    <div>
      <label style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13,
        color: "var(--fg-2)", marginBottom: 12, letterSpacing: ".01em" }}>{label}</label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt} type="button" onClick={() => onChange(opt)}
              style={{
                fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14, cursor: "pointer",
                /* minHeight 44 = alvo de toque confortável no mobile (guideline 44px) */
                display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 44,
                padding: "0 18px", borderRadius: "var(--r-pill)", transition: "all 140ms",
                background: active ? "var(--accent)" : "var(--bg-page)",
                color: active ? "#000" : "var(--fg-2)",
                border: `1px solid ${active ? "var(--accent)" : "var(--border-2)"}`,
              }}
            >{opt}</button>
          );
        })}
      </div>
      {error && <div style={{ fontSize: 12, color: "var(--danger)", marginTop: 8, fontFamily: "var(--font-body)" }}>{error}</div>}
    </div>
  );
}

// "(62) 99388-7179" -> "5562993887179" (formato internacional p/ o WhatsAble no Make)
function normalizePhone(value) {
  let d = (value || "").replace(/\D/g, "");
  if (d.length <= 11) d = "55" + d; // sem código do país -> adiciona o 55 do Brasil
  return d;
}

// Envia o lead para o webhook do Make. Cada chave vira uma variável separada no cenário.
function sendToWebhook(f) {
  const payload = {
    nome: f.nome.trim(),
    empresa: f.empresa.trim(),
    segmento: f.segmento,
    fatura: f.fatura,
    whatsapp: f.whatsapp.trim(),
    whatsapp_intl: normalizePhone(f.whatsapp),
  };
  // Fire-and-forget: uma falha de rede nunca bloqueia a confirmação para o lead.
  try {
    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch (_) {}
}

export function LpForm() {
  const [f, setF] = React.useState({ nome: "", empresa: "", segmento: "", fatura: "", whatsapp: "" });
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const set = (k) => (v) => setF((p) => ({ ...p, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!f.nome.trim()) errs.nome = "Preencha o seu nome";
    if (!f.empresa.trim()) errs.empresa = "Preencha o nome da empresa";
    if (!f.segmento) errs.segmento = "Selecione uma opção";
    if (!f.fatura) errs.fatura = "Selecione uma opção";
    if (!f.whatsapp.trim()) errs.whatsapp = "Preencha seu WhatsApp";
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      sendToWebhook(f);
      setSent(true);
      // Evento de lead para o GTM. Fica no dataLayer antes de navegar, então o
      // GTM captura o envio mesmo com o redirect logo em seguida.
      pushEvent("lead_form_submit", { segmento: f.segmento, fatura: f.fatura });
      // Conversões diretas (defensivo: só dispara se as libs existirem — não quebra sem Pixel/Ads).
      window.fbq && window.fbq("track", "Lead");
      window.gtag && window.gtag("event", "conversion");
      // Redireciona para a página de sucesso (thank-you page). NÃO abre o WhatsApp.
      // O fetch do webhook usa keepalive, então o lead chega ao Make mesmo saindo da página agora.
      window.location.assign("sucesso.html");
    }
  };

  const segmentos = ["Loja de tintas", "Ferragista", "Material de construção em geral", "Pisos e porcelanatos", "Distribuidor", "Atacadista", "Outro segmento"];

  return (
    <section id="formulario" style={{ padding: "var(--section-pad-y) clamp(20px, 4vw, 48px)", background: "var(--bg-page)" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gridTemplateColumns: "0.85fr 1.15fr",
        gap: "clamp(36px, 4vw, 64px)", alignItems: "start" }} className="form-grid">
        <div>
          <Reveal as="p" y={16} className="eyebrow" style={{ margin: "0 0 16px" }}>Diagnóstico gratuito</Reveal>
          <Reveal as="h2" delay={90} style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--fs-h2)", color: "#fff",
            letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 18px" }}>
            Descubra quanto a sua loja pode vender com método.
          </Reveal>
          <Reveal as="p" delay={200} style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--fg-2)", lineHeight: 1.6, margin: "0 0 24px" }}>
            Responda 5 perguntas rápidas. Se o seu perfil for compatível, <strong style={{ color: "var(--fg-1)" }}>Marcos ou Pedro</strong> —
            os próprios donos da M|P — entram em contato para um diagnóstico do seu negócio.
          </Reveal>
          <Reveal as="ul" delay={300} style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
            {["Sem robô", "Sem estagiário", "Sem enrolação"].map((x) => (
              <li key={x} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-body)",
                fontSize: 15, color: "var(--fg-2)" }}>
                <i data-lucide="check" style={{ width: 18, height: 18, color: "var(--accent)" }}></i>{x}
              </li>
            ))}
          </Reveal>
        </div>

        <Reveal delay={160} y={32} style={{ background: "var(--bg-card)", border: "1px solid var(--border-1)", borderRadius: "var(--r-lg)",
          padding: "clamp(24px, 3vw, 40px)", boxShadow: "var(--shadow-2)" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "32px 8px" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--accent-soft)",
                display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
                <i data-lucide="check" style={{ width: 40, height: 40, color: "var(--accent)" }}></i>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, color: "#fff", margin: "0 0 12px" }}>
                Parabéns por sua decisão!
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--fg-2)", lineHeight: 1.6, margin: "0 auto", maxWidth: 400 }}>
                A partir de agora um dos donos da M|P irá entrar em contato com você para
                fazer o diagnóstico da sua empresa.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "grid", gap: 22 }}>
              <TextField label="1. Qual o seu nome?" value={f.nome} onChange={set("nome")}
                placeholder="Ex.: João da Silva" error={errors.nome} />
              <TextField label="2. Qual o nome da sua empresa?" value={f.empresa} onChange={set("empresa")}
                placeholder="Ex.: Tintas São João" error={errors.empresa} />
              <ChipGroup label="3. Qual opção descreve melhor o seu negócio?" options={segmentos}
                value={f.segmento} onChange={set("segmento")} error={errors.segmento} />
              <ChipGroup label="4. Sua empresa fatura acima de R$ 50 mil por mês?" options={["Sim", "Não"]}
                value={f.fatura} onChange={set("fatura")} error={errors.fatura} />
              <TextField label="5. Seu WhatsApp para contato" value={f.whatsapp} onChange={set("whatsapp")}
                placeholder="(00) 00000-0000" error={errors.whatsapp} type="tel" />
              <div style={{ marginTop: 4 }}>
                <MpButton type="submit" size="lg" full iconRight="arrow-right">Quero meu diagnóstico</MpButton>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--fg-3)", lineHeight: 1.55,
                  margin: "16px 0 0", display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <i data-lucide="lock" style={{ width: 15, height: 15, color: "var(--fg-3)", flexShrink: 0, marginTop: 2 }}></i>
                  Ao enviar, você concorda em ser contatado pelos donos da M|P sobre o diagnóstico. Seus dados são
                  usados só para esse contato — a gente não vende sua informação nem enche o seu WhatsApp de spam.
                </p>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
