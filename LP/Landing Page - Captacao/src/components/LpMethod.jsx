// LpMethod.jsx — Seção 4: O método M|P (3 frentes + fechamento)
import * as React from "react";
import { Reveal } from "./anim.jsx";
import { Icon } from "./Icon.jsx";

function MethodCard({ number, icon, title, children }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--bg-card)", border: `1px solid ${hover ? "var(--border-accent)" : "var(--border-1)"}`,
        borderRadius: "var(--r-lg)", padding: "clamp(24px, 2.4vw, 32px)", transition: "all 200ms cubic-bezier(0.22,1,0.36,1)",
        transform: hover ? "translateY(-4px)" : "none", boxShadow: hover ? "var(--shadow-2)" : "none",
        display: "flex", flexDirection: "column", gap: 16,
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 40, color: "var(--accent)", lineHeight: 1 }}>{number}</span>
        <span style={{ width: 44, height: 44, borderRadius: "var(--r-sm)", background: "var(--accent-soft)",
          display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={icon} style={{ width: 22, height: 22, color: "var(--accent)" }} />
        </span>
      </div>
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "#fff", letterSpacing: "-0.01em", margin: 0 }}>{title}</h3>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--fg-2)", lineHeight: 1.6, margin: 0 }}>{children}</p>
    </div>
  );
}

export function LpMethod() {
  return (
    <section id="metodo" style={{ padding: "var(--section-pad-y) clamp(20px, 4vw, 48px)", background: "var(--bg-section)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <div style={{ maxWidth: 820, marginBottom: "clamp(36px, 4vw, 56px)" }}>
          <Reveal as="p" y={16} className="eyebrow" style={{ margin: "0 0 16px" }}>O método M|P</Reveal>
          <Reveal as="h2" delay={90} style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--fs-h2)", color: "#fff",
            letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 22px" }}>
            Por que funciona quando o resto já falhou.
          </Reveal>
          <Reveal as="p" delay={180} style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px, 1.3vw, 18px)", color: "var(--fg-2)", lineHeight: 1.65, margin: "0 0 14px" }}>
            Você provavelmente já tentou. Impulsionou post, contratou a “menina do marketing”, talvez até pagou uma
            agência de fora do estado. E continuou no mesmo lugar.
          </Reveal>
          <Reveal as="p" delay={250} style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px, 1.3vw, 18px)", color: "var(--fg-1)", fontWeight: 600, lineHeight: 1.65, margin: "0 0 14px" }}>
            O problema não foi você. Foi a falta de método.
          </Reveal>
          <Reveal as="p" delay={320} style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px, 1.3vw, 18px)", color: "var(--fg-2)", lineHeight: 1.65, margin: 0 }}>
            Marketing sem processo é aposta. O que a gente faz é diferente — e funciona porque atua em três frentes
            que trabalham juntas:
          </Reveal>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(16px, 1.6vw, 24px)" }} className="method-grid">
          <Reveal delay={0} y={34}>
            <MethodCard number="1" icon="target" title="Geração de demanda qualificada — Google + Meta Ads">
              Colocamos a sua loja na frente de quem está procurando material de construção <strong style={{ color: "var(--fg-1)" }}>agora</strong>,
              no Google e no Instagram. Não é “aparecer pra todo mundo”. É aparecer pra quem tem intenção de comprar e está pronto pra fechar.
            </MethodCard>
          </Reveal>
          <Reveal delay={130} y={34}>
            <MethodCard number="2" icon="message-square-text" title="Conteúdo que converte">
              Anúncio sozinho não vende. A gente cria a comunicação e o conteúdo que transformam quem viu a sua marca em
              alguém que confia nela — e decide comprar de você, não do concorrente que cobra mais barato.
            </MethodCard>
          </Reveal>
          <Reveal delay={260} y={34}>
            <MethodCard number="3" icon="git-merge" title="Processo comercial">
              Aqui está o que quase ninguém faz: a gente não te entrega o lead e some. Estruturamos o seu comercial, o
              follow-up e o CRM pra que nenhuma venda escape pelo WhatsApp. Lead gerado é lead que vira venda.
            </MethodCard>
          </Reveal>
        </div>

        <div style={{ marginTop: "clamp(32px, 3.5vw, 48px)" }}>
          <Reveal y={24} duration={820} style={{
            background: "var(--accent-soft)", border: "1px solid var(--border-accent)", borderRadius: "var(--r-lg)",
            padding: "clamp(28px, 3vw, 44px)", maxWidth: 760, margin: "0 auto", textAlign: "center",
          }}>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(20px, 2vw, 26px)",
              color: "#fff", lineHeight: 1.25, margin: "0 0 14px" }}>
              Demanda <span style={{ color: "var(--accent)" }}>+</span> Conteúdo <span style={{ color: "var(--accent)" }}>+</span> Processo <span style={{ color: "var(--accent)" }}>=</span> Previsibilidade.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--fg-2)", lineHeight: 1.6, margin: 0 }}>
              É por isso que a M|P não vende lead. Vende crescimento que você consegue medir, todo mês.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
