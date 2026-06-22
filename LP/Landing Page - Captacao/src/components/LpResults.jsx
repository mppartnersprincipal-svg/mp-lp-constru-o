// LpResults.jsx — Seção 5: Clientes e resultados + CTA final + rodapé
import * as React from "react";
import { MpButton } from "./MpButton.jsx";
import { Reveal, CountUp } from "./anim.jsx";

function ResultCard({ name, to, period }) {
  return (
    <div style={{
      background: "var(--bg-card)", border: "1px solid var(--border-1)", borderRadius: "var(--r-lg)",
      padding: "clamp(24px, 2.4vw, 32px)", display: "flex", flexDirection: "column", gap: 8,
    }}>
      <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, letterSpacing: ".08em",
        textTransform: "uppercase", color: "var(--fg-3)", margin: 0 }}>{name}</p>
      <p style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(34px, 3.4vw, 48px)",
        color: "var(--accent)", letterSpacing: "-0.02em", lineHeight: 1, margin: "4px 0" }}>
        <CountUp to={to} prefix="+" suffix="%" />
      </p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--fg-2)", margin: 0 }}>{period}</p>
    </div>
  );
}

function BigNumber({ name, children }) {
  return (
    <div style={{ borderTop: "1px solid var(--border-2)", padding: "24px 0", display: "grid",
      gridTemplateColumns: "200px 1fr", gap: 24, alignItems: "baseline" }} className="bignum-row">
      <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, letterSpacing: ".06em",
        textTransform: "uppercase", color: "var(--fg-1)", margin: 0 }}>{name}</p>
      <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(18px, 1.8vw, 24px)",
        color: "var(--fg-2)", lineHeight: 1.3, margin: 0 }}>{children}</p>
    </div>
  );
}

export function LpResults({ onCta }) {
  const cards = [
    { name: "Manu Tintas", to: 22, period: "de faturamento em 33 dias" },
    { name: "Rodrigo Tintas", to: 15, period: "de faturamento em 45 dias" },
    { name: "Mundo das Bombas", to: 30, period: "de faturamento em 60 dias" },
  ];
  return (
    <section id="clientes" style={{ padding: "var(--section-pad-y) clamp(20px, 4vw, 48px)", background: "var(--bg-page)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <div style={{ maxWidth: 820, marginBottom: "clamp(36px, 4vw, 56px)" }}>
          <Reveal as="p" y={16} className="eyebrow" style={{ margin: "0 0 16px" }}>Clientes e resultados</Reveal>
          <Reveal as="h2" delay={90} style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--fs-h2)", color: "#fff",
            letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 18px" }}>
            Quem confiou no método, cresceu.
          </Reveal>
          <Reveal as="p" delay={200} style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px, 1.3vw, 18px)", color: "var(--fg-2)", lineHeight: 1.65, margin: 0 }}>
            E não é resultado de “uma vez só”. É padrão — em loja de tintas, em distribuidor, em ferragista, em quem
            vende bomba d’água. O segmento “tradicional” é justamente onde mais tem espaço pra crescer, porque a
            concorrência ainda improvisa no digital.
          </Reveal>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(16px, 1.6vw, 24px)", marginBottom: "clamp(40px, 4vw, 56px)" }} className="results-grid">
          {cards.map((c, i) => (
            <Reveal key={c.name} delay={i * 130} y={34}>
              <ResultCard {...c} />
            </Reveal>
          ))}
        </div>

        <div style={{ marginBottom: "clamp(48px, 5vw, 72px)" }}>
          <Reveal as="p" y={14} style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--fg-3)", textTransform: "uppercase",
            letterSpacing: ".08em", margin: "0 0 4px" }}>E os números que mostram o tamanho do que a gente faz</Reveal>
          <Reveal>
            <BigNumber name="Telhas Coral">
              <span style={{ color: "var(--accent)", fontWeight: 900 }}>R$ <CountUp to={250} /> mil a R$ <CountUp to={350} /> mil</span> a mais de faturamento — todo mês.
            </BigNumber>
          </Reveal>
          <Reveal delay={120}>
            <BigNumber name="Pacheco Solar">
              <span style={{ color: "var(--accent)", fontWeight: 900 }}><CountUp to={20} prefix="+" suffix="%" /></span> no faturamento e <span style={{ color: "var(--accent)", fontWeight: 900 }}>R$ <CountUp to={579} /> mil</span> em vendas nos primeiros 4 meses.
            </BigNumber>
          </Reveal>
        </div>

        <Reveal y={36} scale={0.97} duration={820} style={{
          background: "linear-gradient(135deg, #1c1c1c 0%, #121212 100%)", border: "1px solid var(--border-accent)",
          borderRadius: "var(--r-xl)", padding: "clamp(36px, 5vw, 64px)", textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)", width: 600, height: 360,
            background: "radial-gradient(closest-side, rgba(245,166,35,0.18), transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(28px, 3.4vw, 46px)",
              color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 auto 18px", maxWidth: 760 }}>
              A próxima loja de material de construção a crescer com a M|P pode ser a <span style={{ color: "var(--accent)" }}>sua</span>.
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px, 1.4vw, 19px)", color: "var(--fg-2)",
              lineHeight: 1.6, margin: "0 auto 32px", maxWidth: 600 }}>
              Responda as 4 perguntas e fale direto com quem vai construir o seu resultado.
            </p>
            <MpButton size="xl" onClick={onCta} iconRight="arrow-right">Quero vender mais</MpButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function LpFooter() {
  return (
    <footer style={{ background: "var(--bg-section)", borderTop: "1px solid var(--border-1)",
      padding: "48px clamp(20px, 4vw, 48px)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", display: "flex", flexWrap: "wrap",
        alignItems: "center", justifyContent: "space-between", gap: 20 }}>
        <img src="assets/logo-mp-full.svg" alt="M|P Assessoria" style={{ height: 56 }} />
        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--fg-3)", margin: 0, textAlign: "right" }}>
          © 2026 M|P Assessoria Digital. Crescimento com método para lojas de material de construção.
        </p>
      </div>
    </footer>
  );
}
