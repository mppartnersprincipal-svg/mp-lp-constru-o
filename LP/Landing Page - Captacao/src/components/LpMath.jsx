// LpMath.jsx — Seção "Faça a conta": transforma o retorno em conta explícita (ROI)
// Fica entre a prova em vídeo (LpProof) e o formulário (LpForm). Mesmo padrão visual
// das outras seções: eyebrow + título + corpo + nota pequena + CTA inline.
import * as React from "react";
import { MpButton } from "./MpButton.jsx";
import { Reveal } from "./anim.jsx";

export function LpMath({ onCta }) {
  return (
    <section id="faca-a-conta" style={{ padding: "var(--section-pad-y) clamp(20px, 4vw, 48px)", background: "var(--bg-page)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <div style={{ maxWidth: 820 }}>
          <Reveal as="p" y={16} className="eyebrow" style={{ margin: "0 0 16px" }}>Faça a conta</Reveal>
          <Reveal as="h2" delay={90} style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--fs-h2)", color: "#fff",
            letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 22px" }}>
            Quanto você está deixando na mesa todo mês?
          </Reveal>
          <Reveal as="p" delay={180} style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px, 1.3vw, 18px)", color: "var(--fg-2)", lineHeight: 1.65, margin: "0 0 20px" }}>
            Imagine que a sua loja fatura R$ 100 mil por mês. Um aumento de 20% são R$ 20 mil a mais por mês —
            R$ 240 mil a mais em um ano. E 20% é o piso: é o que a metodologia já entregou pra Pacheco Solar,
            comprovado no vídeo aqui em cima. A pergunta não é se você pode investir em método. É quanto você
            está deixando de faturar a cada mês que continua improvisando.
          </Reveal>
          <Reveal as="p" delay={260} style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--fg-3)", lineHeight: 1.6, margin: "0 0 32px" }}>
            Exemplo ilustrativo com base em resultado real de cliente. O número da sua loja a gente calcula no diagnóstico.
          </Reveal>
          <Reveal delay={340} y={16}>
            <MpButton size="lg" onClick={onCta} iconRight="arrow-right">Quero saber quanto a minha loja pode faturar</MpButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
