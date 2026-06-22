// MpButton.jsx — MP Assessoria primary / ghost CTA pills + Topbar
import * as React from "react";

export function MpButton({ children, variant = "primary", size = "md", onClick, type = "button", full = false, iconRight = null, iconLeft = null }) {
  const base = {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    borderRadius: 999,
    border: 0,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    lineHeight: 1.1,
    transition: "all 160ms cubic-bezier(0.22,1,0.36,1)",
    width: full ? "100%" : undefined,
  };
  const sizes = {
    sm: { padding: "10px 18px", fontSize: 12 },
    md: { padding: "15px 26px", fontSize: 13 },
    lg: { padding: "19px 34px", fontSize: 15 },
    xl: { padding: "22px 40px", fontSize: 16 },
  };
  const variants = {
    primary: { background: "var(--accent)", color: "#000" },
    ghost: { background: "transparent", color: "var(--fg-1)", border: "1px solid rgba(255,255,255,0.4)" },
    dark: { background: "var(--bg-card)", color: "var(--fg-1)", border: "1px solid var(--border-1)" },
  };
  const [hover, setHover] = React.useState(false);
  const hoverStyle = hover ? {
    primary: { background: "var(--accent-hover)", boxShadow: "0 12px 44px rgba(245,166,35,0.30)", transform: "translateY(-2px)" },
    ghost: { borderColor: "#fff", background: "rgba(255,255,255,0.05)" },
    dark: { background: "var(--bg-card-hover)", borderColor: "var(--border-2)" },
  }[variant] : {};
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...sizes[size], ...variants[variant], ...hoverStyle }}
    >
      {iconLeft && <i data-lucide={iconLeft} style={{ width: 18, height: 18 }}></i>}
      {children}
      {iconRight && <i data-lucide={iconRight} style={{ width: 18, height: 18 }}></i>}
    </button>
  );
}

// Topbar — logo only + single CTA. No nav menu (focus on lead capture).
export function Topbar({ onCta }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 clamp(20px, 4vw, 48px)", height: scrolled ? 68 : 84,
      background: scrolled ? "rgba(10,10,10,0.82)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border-1)" : "1px solid transparent",
      transition: "all 220ms cubic-bezier(0.22,1,0.36,1)",
    }}>
      <img src="assets/logo-mp-mark.svg" alt="M|P Assessoria" style={{ height: scrolled ? 30 : 36, transition: "all 220ms" }} />
      <MpButton size="sm" onClick={onCta} iconRight="arrow-right">Quero meu diagnóstico</MpButton>
    </header>
  );
}
