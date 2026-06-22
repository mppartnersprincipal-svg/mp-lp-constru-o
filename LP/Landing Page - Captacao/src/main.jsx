// main.jsx — Entrada da aplicação: monta a landing page e renderiza no #root
import * as React from "react";
import { createRoot } from "react-dom/client";
import { Topbar } from "./components/MpButton.jsx";
import { LpHero } from "./components/LpHero.jsx";
import { LpProof } from "./components/LpProof.jsx";
import { LpForm } from "./components/LpForm.jsx";
import { LpMethod } from "./components/LpMethod.jsx";
import { LpResults, LpFooter } from "./components/LpResults.jsx";

const WHATSAPP_FLOAT =
  "https://wa.me/5562993887179?text=" +
  encodeURIComponent("Olá! Quero saber mais sobre a Metodologia M|P");

function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_FLOAT}
      target="_blank" rel="noopener" aria-label="Falar no WhatsApp"
      className="wa-float"
      style={{
        position: "fixed", right: 24, bottom: 24, zIndex: 60, width: 60, height: 60,
        borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center",
        justifyContent: "center", boxShadow: "0 8px 28px rgba(0,0,0,0.45)",
        transition: "transform 160ms cubic-bezier(0.22,1,0.36,1), box-shadow 160ms",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px) scale(1.05)"; e.currentTarget.style.boxShadow = "0 12px 34px rgba(0,0,0,0.5)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.45)"; }}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01c-1.52 0-3.01-.41-4.31-1.18l-.31-.18-3.2.84.85-3.12-.2-.32a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
      </svg>
    </a>
  );
}

function App() {
  // Re-renderiza os ícones Lucide sempre que o DOM muda (componentes montam <i data-lucide>).
  React.useEffect(() => {
    let scheduled = false;
    const render = () => { window.lucide && window.lucide.createIcons(); };
    const obs = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        obs.disconnect();
        render();
        obs.observe(document.body, { childList: true, subtree: true });
        scheduled = false;
      });
    });
    render();
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  const goForm = () => {
    const el = document.getElementById("formulario");
    if (el) window.scrollTo({ top: Math.max(0, el.offsetTop - 80), behavior: "smooth" });
  };

  return (
    <>
      <Topbar onCta={goForm} />
      <LpHero onCta={goForm} />
      <LpProof onCta={goForm} />
      <LpForm />
      <LpMethod />
      <LpResults onCta={goForm} />
      <LpFooter />
      <WhatsAppFloat />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
