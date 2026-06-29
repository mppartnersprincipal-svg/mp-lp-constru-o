// LpHero.jsx — Seção 1: Headline + CTA + foto dos donos
import * as React from "react";
import { MpButton } from "./MpButton.jsx";
import { Reveal, CountUp } from "./anim.jsx";

function HeroPhoto({ label, sub, ratio = "4 / 5" }) {
  const [failed, setFailed] = React.useState(false);
  if (!failed) {
    return (
      <div style={{
        position: "relative", width: "100%", aspectRatio: ratio,
        borderRadius: "var(--r-lg)", overflow: "hidden",
        border: "1px solid var(--border-1)", background: "#121212",
      }} data-photo-slot="donos">
        <img
          src="assets/donos-hero.jpg"
          alt="Marcos e Pedro, os donos da M|P Assessoria"
          onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    );
  }
  return (
    <div style={{
      position: "relative", width: "100%", aspectRatio: ratio,
      borderRadius: "var(--r-lg)", overflow: "hidden",
      background: "linear-gradient(160deg, #1c1c1c 0%, #121212 100%)",
      border: "1px dashed var(--border-2)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: 24,
    }} data-photo-slot="donos">
      <i data-lucide="image" style={{ width: 40, height: 40, color: "var(--fg-4)", marginBottom: 14 }}></i>
      <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--fg-2)",
        textTransform: "uppercase", letterSpacing: ".08em", margin: "0 0 6px" }}>{label}</p>
      {sub && <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--fg-3)", margin: 0, maxWidth: 240 }}>{sub}</p>}
    </div>
  );
}

export function LpHero({ onCta }) {
  // Logos das lojas (altura de exibição ajustada por logo p/ equilíbrio visual)
  const clients = [
    { name: "Rodrigo Tintas", src: "assets/logo-rodrigo-tintas.png", h: 40 },
    { name: "Telhas Coral", src: "assets/logo-telhas-coral.png", h: 52 },
    { name: "Pacheco Solar", src: "assets/logo-pacheco-solar.png", h: 30 },
    { name: "IBT Telhas", src: "assets/logo-ibt-telhas.png", h: 52 },
    { name: "YCON Construções", src: "assets/logo-ycon.png", h: 50 },
    { name: "Manu Tintas e Ferragista", src: "assets/logo-manu-tintas.png", h: 50 },
  ];
  return (
    <section id="inicio" style={{
      position: "relative", minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "140px clamp(20px, 4vw, 48px) 72px", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", right: -240, top: -160, width: 760, height: 760,
        background: "radial-gradient(closest-side, rgba(245,166,35,0.16), transparent 70%)", pointerEvents: "none",
      }} />
      <div style={{
        maxWidth: "var(--container-max)", margin: "0 auto", width: "100%", position: "relative",
        display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "clamp(40px, 5vw, 80px)", alignItems: "center",
      }} className="hero-grid">
        {/* minWidth:0 evita que o marquee de logos (width:max-content) estoure
            a coluna do grid e empurre o <h1> para fora da viewport. */}
        <div style={{ minWidth: 0 }}>
          <Reveal as="p" delay={60} y={16} className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 8, margin: "0 0 22px" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }}></span>
            Para lojas de material de construção
          </Reveal>
          <Reveal as="h1" delay={140} style={{
            fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(40px, 5.4vw, 76px)",
            lineHeight: 1.04, letterSpacing: "-0.02em", color: "#fff", margin: "0 0 24px", textWrap: "balance",
          }}>
            Aumente o faturamento da sua loja em <span style={{ color: "var(--accent)" }}>até <CountUp to={40} suffix="%" /></span> com uma metodologia testada e validada.
          </Reveal>
          <Reveal as="p" delay={260} style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px, 1.4vw, 19px)", color: "var(--fg-2)",
            maxWidth: 600, lineHeight: 1.6, margin: "0 0 36px" }}>
            A M|P estrutura uma metodologia para lojas de material de construção no Brasil venderem mais — todo mês,
            com previsibilidade e retorno comprovado. Os mesmos resultados que já entregamos para a{" "}
            <strong style={{ color: "var(--fg-1)", fontWeight: 700 }}>Rodrigo Tintas</strong>, a{" "}
            <strong style={{ color: "var(--fg-1)", fontWeight: 700 }}>Telhas Coral</strong> e a{" "}
            <strong style={{ color: "var(--fg-1)", fontWeight: 700 }}>Pacheco Solar</strong> e diversas outras empresas do setor.
          </Reveal>
          <Reveal delay={360} y={16}>
            <MpButton size="xl" onClick={onCta} iconRight="arrow-right">Quero o diagnóstico da minha loja</MpButton>
          </Reveal>

          <Reveal delay={460} style={{ marginTop: 40, paddingTop: 28, borderTop: "1px solid var(--border-1)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--fg-3)", textTransform: "uppercase",
              letterSpacing: ".1em", margin: "0 0 14px" }}>Lojas que já crescem com a M|P</p>
            {/* Carrossel automático (marquee infinito). Repetimos a lista um nº par de vezes
                para preencher a faixa e fazer o loop em translateX(-50%) ficar perfeitamente contínuo. */}
            <div className="lojas-marquee" role="list" aria-label="Lojas que já crescem com a M|P">
              <div className="lojas-marquee__track">
                {Array.from({ length: 8 }).flatMap((_, rep) =>
                  clients.map((c, i) => {
                    const idx = rep * clients.length + i;
                    const isClone = idx >= clients.length;
                    return (
                      <span
                        key={idx}
                        className="lojas-marquee__item"
                        role={isClone ? undefined : "listitem"}
                        aria-hidden={isClone ? "true" : undefined}
                      >
                        <img
                          src={c.src}
                          alt={isClone ? "" : c.name}
                          height={c.h}
                          decoding="async"
                          draggable="false"
                          style={{ height: c.h, width: "auto", display: "block", userSelect: "none" }}
                        />
                      </span>
                    );
                  })
                )}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal style={{ position: "relative" }} delay={240} x={36} y={0} duration={820}>
          <HeroPhoto label="Foto: Marcos e Pedro" sub="Os donos da M|P, olhando pra câmera. Foto real — sem banco de imagem." ratio="4 / 5" />
          <div style={{
            position: "absolute", bottom: -18, left: -18, background: "var(--accent)", color: "#000",
            borderRadius: "var(--r-pill)", padding: "12px 20px", fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: 14, boxShadow: "var(--shadow-yellow-glow)", display: "flex", alignItems: "center", gap: 8,
          }}>
            <i data-lucide="badge-check" style={{ width: 18, height: 18 }}></i>
            Você fala com os donos
          </div>
        </Reveal>
      </div>
    </section>
  );
}
