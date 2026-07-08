// LpProof.jsx — Seção 2: Prova social (vídeo Pacheco Solar + print Telhas Coral)
import * as React from "react";
import { MpButton } from "./MpButton.jsx";
import { Reveal, CountUp } from "./anim.jsx";
import { Icon } from "./Icon.jsx";

function VideoPlaceholder({ label, ratio, id }) {
  return (
    <div style={{
      position: "relative", width: "100%", aspectRatio: ratio, borderRadius: "var(--r-lg)", overflow: "hidden",
      background: "linear-gradient(160deg, #1c1c1c 0%, #101010 100%)", border: "1px solid var(--border-1)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center",
    }} data-video-slot={id}>
      <div style={{
        width: 76, height: 76, borderRadius: "50%", background: "var(--accent)", display: "flex",
        alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-yellow-glow)", marginBottom: 16,
      }}>
        <Icon name="play" style={{ width: 30, height: 30, color: "#000", marginLeft: 4 }} />
      </div>
      <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "var(--fg-3)",
        textTransform: "uppercase", letterSpacing: ".1em", margin: 0 }}>{label}</p>
    </div>
  );
}

export function VideoSlot({ id, label, ratio = "16 / 9", src, autoPlayInView = false }) {
  const containerRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const [muted, setMuted] = React.useState(true);
  const [failed, setFailed] = React.useState(false);

  // Mantém o estado mudo do elemento <video> em sincronia (React não aplica
  // o atributo `muted` de forma confiável, então também ajustamos via DOM).
  React.useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = muted;
  }, [muted]);

  // Autoplay (mudo) assim que a seção entra na viewport; pausa ao sair.
  React.useEffect(() => {
    if (!autoPlayInView || !src || failed) return;
    const el = containerRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const obs = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      if (entry.isIntersecting) {
        v.muted = true;
        const p = v.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } else {
        v.pause();
      }
    }, { threshold: 0.55 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [autoPlayInView, src, failed]);

  if (!src || failed) {
    return <VideoPlaceholder label={label} ratio={ratio} id={id} />;
  }

  const play = () => { const v = videoRef.current; if (v) { setMuted(false); v.muted = false; v.play(); setPlaying(true); } };
  const unmute = () => { const v = videoRef.current; if (v) { setMuted(false); v.muted = false; } };
  return (
    <div ref={containerRef} style={{
      position: "relative", width: "100%", aspectRatio: ratio, borderRadius: "var(--r-lg)", overflow: "hidden",
      background: "#000", border: "1px solid var(--border-1)", boxShadow: "var(--shadow-2)",
    }} data-video-slot={id}>
      <video ref={videoRef} src={src} controls={playing} playsInline preload={autoPlayInView ? "metadata" : "none"}
        muted={muted}
        onError={() => setFailed(true)}
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      {!playing && (
        <button type="button" onClick={play} aria-label={"Reproduzir: " + label} style={{
          position: "absolute", inset: 0, border: 0, cursor: "pointer", background: "rgba(10,10,10,0.32)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14,
        }}>
          <span style={{
            width: 76, height: 76, borderRadius: "50%", background: "var(--accent)", display: "flex",
            alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-yellow-glow)",
          }}>
            <Icon name="play" style={{ width: 30, height: 30, color: "#000", marginLeft: 4 }} />
          </span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "#fff",
            textTransform: "uppercase", letterSpacing: ".1em" }}>{label}</span>
        </button>
      )}
      {playing && muted && (
        <button type="button" onClick={unmute} aria-label="Ativar som do depoimento" style={{
          position: "absolute", top: 12, right: 12, border: 0, cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 14px", borderRadius: 999,
          background: "var(--accent)", color: "#000", boxShadow: "var(--shadow-yellow-glow)",
          fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12,
          textTransform: "uppercase", letterSpacing: ".08em",
        }}>
          <Icon name="volume-2" style={{ width: 16, height: 16 }} />
          Ativar som
        </button>
      )}
    </div>
  );
}

function WhatsAppSlot({ id, label, src }) {
  return (
    <div style={{
      position: "relative", width: "100%", maxWidth: 320, margin: "0 auto",
      borderRadius: 28, overflow: "hidden", background: "#0b141a",
      border: "8px solid #1a1a1a", boxShadow: "var(--shadow-3)",
    }} data-whatsapp-slot={id}>
      <img src={src} alt={label} loading="lazy" decoding="async" style={{ width: "100%", height: "auto", display: "block" }} />
    </div>
  );
}

function ProofCaption({ metric, quote, support, source }) {
  return (
    <div style={{ marginTop: 22 }}>
      {metric && (
        <p style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(22px, 2.2vw, 30px)",
          color: "var(--accent)", letterSpacing: "-0.01em", lineHeight: 1.15, margin: "0 0 10px" }}>{metric}</p>
      )}
      {quote && (
        <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "#fff", lineHeight: 1.35, margin: "0 0 6px" }}>
          “{quote}”{source && <span style={{ color: "var(--fg-3)", fontWeight: 500, fontSize: 14 }}> — {source}</span>}
        </p>
      )}
      <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--fg-2)", lineHeight: 1.6, margin: 0 }}>{support}</p>
    </div>
  );
}

export function LpProof({ onCta }) {
  return (
    <section id="resultados" style={{ padding: "var(--section-pad-y) clamp(20px, 4vw, 48px)", background: "var(--bg-section)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <div style={{ maxWidth: 760, marginBottom: "clamp(40px, 5vw, 64px)" }}>
          <Reveal as="p" y={16} className="eyebrow" style={{ margin: "0 0 16px" }}>Prova real</Reveal>
          <Reveal as="h2" delay={90} style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--fs-h2)", color: "#fff",
            letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 16px" }}>
            Não é promessa. É o que já aconteceu.
          </Reveal>
          <Reveal as="p" delay={200} style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px, 1.3vw, 18px)", color: "var(--fg-2)", lineHeight: 1.6, margin: 0 }}>
            Antes de falar de você, deixa a gente te mostrar o que acontece quando uma empresa para de improvisar
            e passa a ter método.
          </Reveal>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "0.8fr 1fr", gap: "clamp(32px, 5vw, 72px)", alignItems: "center", marginBottom: "clamp(48px, 6vw, 88px)" }} className="proof-grid">
          <Reveal style={{ maxWidth: 340, margin: "0 auto", width: "100%" }} x={-28} y={0} duration={820}>
            <VideoSlot id="pacheco-solar" label="Depoimento em vídeo — Pacheco Solar" src="assets/pacheco-solar.mp4" ratio="9 / 16" autoPlayInView />
          </Reveal>
          <Reveal delay={140}>
            <ProofCaption
              metric={<><CountUp to={20} prefix="+" suffix="%" /> de faturamento</>}
              quote="A M|P aumentou nosso faturamento em 20%."
              source="Pacheco Solar"
              support="Aumento de 20% no faturamento mensal e R$ 579 mil em vendas nos primeiros 4 meses de parceria." />
          </Reveal>
        </div>

        <Reveal style={{ display: "flex", justifyContent: "center", margin: "clamp(8px, 2vw, 24px) 0 clamp(48px, 6vw, 80px)" }} y={16}>
          <MpButton size="lg" onClick={onCta} iconRight="arrow-right">Quero esse resultado na minha loja</MpButton>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "clamp(32px, 5vw, 72px)", alignItems: "center" }} className="proof-grid">
          <Reveal x={-28} y={0} duration={820}>
            <WhatsAppSlot id="telhas-coral" label="Conversa com o cliente Telhas Coral" src="assets/telhas-coral-whatsapp.webp" />
          </Reveal>
          <Reveal delay={140}>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(30px, 3.4vw, 48px)",
              color: "var(--accent)", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 16px" }}>
              <CountUp to={270000} prefix="R$ " /> vendidos em um único mês
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px, 1.3vw, 18px)", color: "var(--fg-2)", lineHeight: 1.65, margin: 0 }}>
              Vindos dos anúncios de Google que a M|P gerencia. É uma conversa real de WhatsApp com o nosso cliente —
              sem montagem, sem número maquiado. É o tipo de resultado que a gente comprova com dados, não com discurso.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
