// LpOffer.jsx — Blocos da oferta do diagnóstico (adicionados em 2026-07-21):
//   <LpValueStack> — o que o lead recebe no diagnóstico gratuito (value stack)
//   <LpGarantia>   — garantia de risco invertido
//   <LpEscassez>   — exclusividade por cidade (escassez real)
// Copy fornecida pelo usuário — não alterar valores/promessas sem pedido.
// Reutiliza apenas padrões existentes: cards (LpForm/LpMethod), lista com
// <Icon check> (LpForm) e <Reveal> (abaixo da dobra).
import * as React from "react";
import { Reveal } from "./anim.jsx";
import { Icon } from "./Icon.jsx";

// Value stack — card no mesmo estilo do card do formulário (bg-card + shadow).
export function LpValueStack() {
  const itens = [
    "Raio-X da sua loja no Google e no Instagram (normalmente R$ 500)",
    "Estimativa de quanto sua loja pode faturar a mais em 90 dias (normalmente R$ 500)",
    "Plano das 3 frentes personalizado pra sua loja e sua cidade (normalmente R$ 1.000)",
  ];
  return (
    <section id="diagnostico" style={{ padding: "var(--section-pad-y) clamp(20px, 4vw, 48px)", background: "var(--bg-section)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Reveal style={{ background: "var(--bg-card)", border: "1px solid var(--border-1)", borderRadius: "var(--r-lg)",
          padding: "clamp(28px, 3.5vw, 48px)", boxShadow: "var(--shadow-2)" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(22px, 2.6vw, 32px)", color: "#fff",
            letterSpacing: "-0.02em", lineHeight: 1.15, margin: "0 0 26px" }}>
            No diagnóstico gratuito, você sai com:
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 26px", display: "grid", gap: 14 }}>
            {itens.map((x) => (
              <li key={x} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontFamily: "var(--font-body)",
                fontSize: 16, color: "var(--fg-2)", lineHeight: 1.6 }}>
                <Icon name="check" style={{ width: 18, height: 18, color: "var(--accent)", flexShrink: 0, marginTop: 4 }} />
                <span>{x}</span>
              </li>
            ))}
          </ul>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(18px, 1.9vw, 23px)",
            color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.3, margin: 0,
            borderTop: "1px solid var(--border-1)", paddingTop: 22 }}>
            Valor total: R$ 2.000. <span style={{ color: "var(--accent)" }}>Hoje: R$ 0.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// Garantia — card destacado no mesmo estilo do fecho da seção Método
// (accent-soft + borda accent, centralizado).
export function LpGarantia() {
  return (
    <section id="garantia" style={{ padding: "var(--section-pad-y) clamp(20px, 4vw, 48px)", background: "var(--bg-page)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Reveal y={24} duration={820} style={{
          background: "var(--accent-soft)", border: "1px solid var(--border-accent)", borderRadius: "var(--r-lg)",
          padding: "clamp(28px, 3vw, 44px)", textAlign: "center",
        }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px, 1.4vw, 18px)", color: "var(--fg-2)",
            lineHeight: 1.65, margin: "0 0 14px" }}>
            <strong style={{ color: "var(--fg-1)", fontWeight: 700 }}>Garantia sem letra miúda:</strong>{" "}
            se em 90 dias você não tiver mais orçamentos rastreados do que investiu na nossa parte,
            a gente devolve a nossa taxa.
          </p>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(19px, 2vw, 25px)",
            color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.25, margin: 0 }}>
            O risco é nosso, não seu.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// Escassez — seção de texto na mesma moldura das demais (sem card),
// primeira frase em destaque.
export function LpEscassez() {
  return (
    <section id="exclusividade" style={{ padding: "var(--section-pad-y) clamp(20px, 4vw, 48px)", background: "var(--bg-section)" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <Reveal as="p" y={16} style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(22px, 2.6vw, 32px)",
          color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2, margin: "0 0 16px" }}>
          A gente trabalha com <span style={{ color: "var(--accent)" }}>exclusividade por cidade</span>.
        </Reveal>
        <Reveal as="p" delay={120} style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px, 1.4vw, 18px)",
          color: "var(--fg-2)", lineHeight: 1.65, margin: 0 }}>
          Se pegamos a sua loja, não pegamos a do concorrente da esquina. Por isso o número de
          vagas por região é limitado.
        </Reveal>
      </div>
    </section>
  );
}
