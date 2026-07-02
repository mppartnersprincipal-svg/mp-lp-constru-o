// LpResults.jsx — Seção 5: Clientes e resultados + CTA final + rodapé
import * as React from "react";
import { MpButton } from "./MpButton.jsx";
import { Reveal, CountUp } from "./anim.jsx";
import { pushEvent } from "../track.js";

function ResultCard({ name, to, period, logo, logoH = 34, plate = false }) {
  // Se a logo falhar em carregar, cai no nome em texto — o card não vira buraco.
  const [logoFailed, setLogoFailed] = React.useState(false);
  const showLogo = logo && !logoFailed;
  // Nome em texto — fallback quando não há logo (mantém identidade da loja).
  const nameText = (
    <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, letterSpacing: ".08em",
      textTransform: "uppercase", color: "var(--fg-3)", margin: 0 }}>{name}</p>
  );
  const logoImg = (
    <img src={logo} alt={name} decoding="async" onError={() => setLogoFailed(true)}
      style={{ maxHeight: logoH, maxWidth: plate ? "none" : "78%", width: "auto", height: "auto",
        objectFit: "contain", display: "block" }} />
  );
  return (
    <div style={{
      background: "var(--bg-card)", border: "1px solid var(--border-1)", borderRadius: "var(--r-lg)",
      padding: "clamp(24px, 2.4vw, 32px)", display: "flex", flexDirection: "column", gap: 8,
    }}>
      {/* Zona de logo de altura fixa: alinha os +XX% dos 3 cards na mesma linha,
          independentemente do formato de cada logo. */}
      <div style={{ height: 48, display: "flex", alignItems: "center", marginBottom: 4 }}>
        {showLogo ? (
          plate ? (
            // Logo colorida sobre fundo claro (ex.: Mundo das Bombas) — placa branca arredondada.
            <span style={{ background: "#fff", borderRadius: "var(--r-md)", padding: "8px 14px",
              display: "inline-flex", alignItems: "center" }}>{logoImg}</span>
          ) : (
            logoImg
          )
        ) : (
          nameText
        )}
      </div>
      <p style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(34px, 3.4vw, 48px)",
        color: "var(--accent)", letterSpacing: "-0.02em", lineHeight: 1, margin: "4px 0" }}>
        <CountUp to={to} prefix="+" suffix="%" />
      </p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--fg-2)", margin: 0 }}>{period}</p>
    </div>
  );
}

function BigNumber({ name, logo, logoH = 32, children }) {
  return (
    <div style={{ borderTop: "1px solid var(--border-2)", padding: "24px 0", display: "grid",
      gridTemplateColumns: "200px 1fr", gap: 24, alignItems: "center" }} className="bignum-row">
      {logo ? (
        <img src={logo} alt={name} decoding="async"
          style={{ maxHeight: logoH, maxWidth: "100%", width: "auto", height: "auto", objectFit: "contain", display: "block" }} />
      ) : (
        <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, letterSpacing: ".06em",
          textTransform: "uppercase", color: "var(--fg-1)", margin: 0 }}>{name}</p>
      )}
      <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(18px, 1.8vw, 24px)",
        color: "var(--fg-2)", lineHeight: 1.3, margin: 0 }}>{children}</p>
    </div>
  );
}

export function LpResults({ onCta }) {
  const cards = [
    { name: "Manu Tintas", to: 22, period: "de faturamento em 33 dias", logo: "assets/logo-manu-tintas.png", logoH: 40 },
    { name: "Rodrigo Tintas", to: 15, period: "de faturamento em 45 dias", logo: "assets/logo-rodrigo-tintas.png", logoH: 34 },
    // Logo colorida sobre fundo branco → exibida numa placa branca arredondada (plate).
    { name: "Mundo das Bombas", to: 30, period: "de faturamento em 60 dias", logo: "assets/logo-mundo-das-bombas.jpg", logoH: 30, plate: true },
  // Defensivo: um card sem número real (to inválido) não é renderizado — em vez de virar buraco.
  ].filter((c) => Number.isFinite(c.to));
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
            <BigNumber name="Telhas Coral" logo="assets/logo-telhas-coral.png" logoH={44}>
              <span style={{ color: "var(--accent)", fontWeight: 900 }}>R$ <CountUp to={250} /> mil a R$ <CountUp to={350} /> mil</span> a mais de faturamento — todo mês.
            </BigNumber>
          </Reveal>
          <Reveal delay={120}>
            <BigNumber name="Pacheco Solar" logo="assets/logo-pacheco-solar.png" logoH={28}>
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
              Responda as 5 perguntas e fale direto com quem vai construir o seu resultado.
            </p>
            <MpButton size="xl" onClick={onCta} iconRight="arrow-right">Quero o diagnóstico gratuito da minha loja</MpButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---- Dados de contato da M|P (fonte única) ----
const MP_WHATSAPP_URL =
  "https://wa.me/5562993887179?text=" +
  encodeURIComponent("Olá! Quero saber mais sobre a Metodologia M|P");
const MP_INSTAGRAM = "https://www.instagram.com/mp_assessoriadigital/";
const MP_TIKTOK = "https://www.tiktok.com/@mp_assessoriadigital";
const MP_ENDERECO = "Praça Wilson Sales, 195 — Nova Suíça, Goiânia - GO, 74280-370";
const MP_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Praça Wilson Sales, 195, Nova Suíça, Goiânia - GO, 74280-370");

// ---- Ícones (SVG inline — não dependem do Lucide, garantem render no rodapé) ----
const IconWhatsApp = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01c-1.52 0-3.01-.41-4.31-1.18l-.31-.18-3.2.84.85-3.12-.2-.32a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
  </svg>
);
const IconMapPin = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconInstagram = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0m0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84M12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4m6.41-10.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44" />
  </svg>
);
const IconTikTok = (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

// Botão social circular com hover para o accent.
function SocialButton({ href, label, children }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={href} target="_blank" rel="noopener" aria-label={label}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: 42, height: 42, borderRadius: "50%", flex: "0 0 auto",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        background: hover ? "var(--accent)" : "var(--bg-card)",
        border: "1px solid " + (hover ? "var(--accent)" : "var(--border-1)"),
        color: hover ? "#000" : "var(--fg-2)",
        transition: "all 160ms cubic-bezier(0.22,1,0.36,1)",
        transform: hover ? "translateY(-2px)" : "none",
      }}
    >
      {children}
    </a>
  );
}

// Linha "ícone + texto" do rodapé; clicável quando recebe href.
function FooterItem({ href, icon, children, onClick }) {
  const [hover, setHover] = React.useState(false);
  const style = {
    display: "flex", alignItems: "flex-start", gap: 12,
    fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.55,
    color: hover && href ? "var(--fg-1)" : "var(--fg-2)",
    transition: "color 160ms", textDecoration: "none",
  };
  const inner = (
    <>
      <span style={{ flex: "0 0 auto", marginTop: 1, color: hover && href ? "var(--accent)" : "var(--fg-3)", transition: "color 160ms" }}>{icon}</span>
      <span>{children}</span>
    </>
  );
  if (!href) return <div className="footer-item" style={style}>{inner}</div>;
  return (
    <a className="footer-item" href={href} target="_blank" rel="noopener" onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={style}>
      {inner}
    </a>
  );
}

export function LpFooter() {
  const titleStyle = {
    fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, letterSpacing: ".08em",
    textTransform: "uppercase", color: "var(--fg-1)", margin: "0 0 18px",
  };
  return (
    <footer style={{ background: "var(--bg-section)", borderTop: "1px solid var(--border-1)",
      padding: "clamp(48px, 6vw, 72px) clamp(20px, 4vw, 48px) 32px" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1.3fr", gap: "clamp(32px, 4vw, 56px)",
          paddingBottom: "clamp(36px, 4vw, 48px)" }}>

          {/* Marca + redes sociais */}
          <div className="footer-brand" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <img src="assets/logo-mp-full.svg" alt="M|P Assessoria" style={{ height: 56, marginBottom: 20 }} />
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--fg-2)", lineHeight: 1.6, margin: "0 0 24px", maxWidth: 340 }}>
              Crescimento com método para lojas de material de construção — demanda qualificada, conteúdo que converte e processo comercial.
            </p>
            <div className="footer-social" style={{ display: "flex", gap: 12 }}>
              <SocialButton href={MP_INSTAGRAM} label="Instagram da M|P Assessoria">{IconInstagram}</SocialButton>
              <SocialButton href={MP_TIKTOK} label="TikTok da M|P Assessoria">{IconTikTok}</SocialButton>
            </div>
          </div>

          {/* Contato */}
          <div className="footer-col" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={titleStyle}>Contato</p>
            <FooterItem href={MP_WHATSAPP_URL} icon={IconWhatsApp}
              onClick={() => pushEvent("whatsapp_click", { location: "rodape" })}>
              (62) 99388-7179<br />
              <span style={{ color: "var(--fg-3)", fontSize: 13 }}>WhatsApp — fale com os donos</span>
            </FooterItem>
          </div>

          {/* Endereço */}
          <div className="footer-col" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={titleStyle}>Endereço</p>
            <FooterItem href={MP_MAPS_URL} icon={IconMapPin}>{MP_ENDERECO}</FooterItem>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="footer-bottom" style={{ borderTop: "1px solid var(--border-1)", paddingTop: 28,
          display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--fg-3)", margin: 0 }}>
            © 2026 M|P Assessoria Digital. Todos os direitos reservados.
          </p>
          <a href={MP_INSTAGRAM} target="_blank" rel="noopener"
            style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--fg-3)" }}>
            @mp_assessoriadigital
          </a>
        </div>
      </div>
    </footer>
  );
}
