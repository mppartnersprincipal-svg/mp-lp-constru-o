// Hero.jsx — H1 + CTAs + metric stack on the right
function Hero({ onPrimary, onSecondary }) {
  return (
    <section id="inicio" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '120px clamp(20px, 4vw, 48px) 80px',
      overflow: 'hidden',
    }}>
      {/* radial glow */}
      <div style={{
        position: 'absolute', right: -200, bottom: -200, width: 700, height: 700,
        background: 'radial-gradient(closest-side, rgba(245,166,35,0.14), transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', width: '100%',
        display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'center', position: 'relative' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, letterSpacing: '.08em',
            textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 20px' }}>
            <span style={{ display:'inline-block', width:8, height:8, borderRadius:'50%', background:'var(--accent)', marginRight:8, verticalAlign:'middle'}}/>
            MP Assessoria Digital
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(44px, 6vw, 84px)',
            lineHeight: 1.02, letterSpacing: '-0.02em', color: '#fff', margin: '0 0 24px', textWrap: 'balance' }}>
            Transforme tráfego em <span style={{ color: 'var(--accent)' }}>faturamento previsível</span>.
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'var(--fg-2)', maxWidth: 560,
            lineHeight: 1.6, margin: '0 0 36px' }}>
            Gestão de marketing digital para empresas que já faturam e querem escalar com controle, não com sorte.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Button size="lg" onClick={onPrimary} iconRight="arrow-right">Agendar diagnóstico</Button>
            <Button size="lg" variant="ghost" onClick={onSecondary}>Nossos cases</Button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <MetricTile label="Faturamento" value="+130%" caption="média em 6 meses" highlight />
          <MetricTile label="ROI Mídia" value="5.4x" caption="retorno médio" />
          <MetricTile label="Clientes" value="+42" caption="empresas ativas" />
          <MetricTile label="Retenção" value="94%" caption="após 12 meses" />
        </div>
      </div>
    </section>
  );
}

function MetricTile({ label, value, caption, highlight }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: highlight ? '1px solid var(--accent)' : '1px solid var(--border-1)',
      borderRadius: 16,
      padding: 22,
      boxShadow: highlight ? '0 10px 40px rgba(245,166,35,0.12)' : 'none',
    }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '.08em',
        textTransform: 'uppercase', color: 'var(--fg-3)', margin: '0 0 6px' }}>{label}</p>
      <p style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 44, lineHeight: 1,
        letterSpacing: '-0.02em', color: 'var(--accent)', margin: 0 }}>{value}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-2)', margin: '8px 0 0' }}>{caption}</p>
    </div>
  );
}

window.Hero = Hero;
window.MetricTile = MetricTile;
