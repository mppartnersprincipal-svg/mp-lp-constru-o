// Clients.jsx — logo carousel + animated metrics strip
function Clients() {
  const logos = ['STUDIO NORTE', 'CASA MODENA', 'BRAVO AUTO', 'VERTE+', 'LAMIARA', 'ORIGEN', 'KAVE LAB', 'NORTHGRID'];
  const loop = [...logos, ...logos];
  return (
    <section id="cases" style={{ padding: 'var(--section-pad-y) 0', background: 'var(--bg-page)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, letterSpacing: '.08em',
          textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 14px', textAlign:'center' }}>Quem confia em nós</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 3.4vw, 42px)',
          textAlign: 'center', color: '#fff', margin: '0 0 48px', letterSpacing: '-0.02em' }}>
          +42 empresas brasileiras escalando com a MP.
        </h2>
      </div>
      <div style={{ display: 'flex', gap: 64, animation: 'scroll 30s linear infinite', width: 'fit-content' }}>
        {loop.map((name, i) => (
          <div key={i} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22,
            letterSpacing: '.12em', color: 'var(--fg-3)', whiteSpace: 'nowrap', padding: '0 8px' }}>
            {name}
          </div>
        ))}
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0);} to { transform: translateX(-50%);} }`}</style>
      <div style={{ maxWidth: 'var(--container-max)', margin: '80px auto 0', padding: '0 clamp(20px,4vw,48px)',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
        <StatBlock label="Investimento gerido / mês" value="R$ 2.8M" />
        <StatBlock label="Faturamento médio" value="+130%" />
        <StatBlock label="ROAS médio" value="5.4x" />
        <StatBlock label="NPS dos clientes" value="72" />
      </div>
    </section>
  );
}
function StatBlock({ label, value }) {
  return (
    <div style={{ borderTop: '1px solid var(--border-1)', paddingTop: 20 }}>
      <p style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(36px, 4vw, 56px)',
        lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--accent)', margin: 0 }}>{value}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--fg-3)', margin: '10px 0 0' }}>{label}</p>
    </div>
  );
}
window.Clients = Clients;
