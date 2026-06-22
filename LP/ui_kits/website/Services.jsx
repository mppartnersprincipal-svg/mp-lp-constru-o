// Services.jsx — grid of service cards
function ServiceCard({ icon, title, description, bullets, featured }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? 'var(--bg-card-hover)' : 'var(--bg-card)',
        border: featured ? '1px solid var(--accent)' : `1px solid ${hover ? 'var(--border-2)' : 'var(--border-1)'}`,
        borderRadius: 16,
        padding: 32,
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 200ms cubic-bezier(0.22,1,0.36,1)',
        position: 'relative',
      }}
    >
      {featured && (
        <span style={{ position: 'absolute', top: 16, right: 16, fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 10, letterSpacing: '.08em', color: '#000', background: 'var(--accent)', padding: '4px 10px', borderRadius: 999 }}>POPULAR</span>
      )}
      <i data-lucide={icon} style={{ width: 36, height: 36, color: 'var(--accent)', marginBottom: 20 }}></i>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: '#fff',
        margin: '0 0 10px', letterSpacing: '-0.01em' }}>{title}</h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.55, margin: '0 0 20px' }}>{description}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, fontFamily: 'var(--font-body)', fontSize: 13,
            color: 'var(--fg-2)', padding: '6px 0', borderTop: i > 0 ? '1px dashed var(--border-1)' : 'none' }}>
            <i data-lucide="check" style={{ width: 16, height: 16, color: 'var(--accent)', flex: '0 0 16px', marginTop: 2 }}></i>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Services() {
  const items = [
    { icon: 'trending-up', title: 'Tráfego Pago', description: 'Campanhas performáticas em Meta Ads e Google Ads com otimização diária.',
      bullets: ['Estruturação de campanhas', 'Otimização diária de ROAS', 'Relatórios semanais de performance', 'Criativos e copy testados'] },
    { icon: 'target', title: 'Consultoria Estratégica', featured: true,
      description: 'Diagnóstico completo do funil e plano de crescimento para os próximos 90 dias.',
      bullets: ['Auditoria de marketing', 'Roadmap trimestral', 'Reuniões semanais com CEO', 'Definição de KPIs e metas'] },
    { icon: 'workflow', title: 'CRM & Automação', description: 'Estruturação de CRM e automações que reduzem custo por aquisição.',
      bullets: ['Configuração de pipeline', 'Automações de nutrição', 'Integração com tráfego pago', 'Dashboards executivos'] },
  ];
  return (
    <section id="servicos" style={{
      padding: 'var(--section-pad-y) clamp(20px, 4vw, 48px)',
      background: 'var(--bg-section)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ marginBottom: 56, maxWidth: 720 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, letterSpacing: '.08em',
            textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 14px' }}>Nossos serviços</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 4vw, 52px)',
            lineHeight: 1.1, letterSpacing: '-0.02em', color: '#fff', margin: '0 0 16px' }}>
            Três frentes para escalar com previsibilidade.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'var(--fg-2)', lineHeight: 1.6 }}>
            Trabalhamos como extensão do seu time — de aquisição a retenção — com metas e reports semanais.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {items.map((s, i) => <ServiceCard key={i} {...s} />)}
        </div>
      </div>
    </section>
  );
}

window.Services = Services;
window.ServiceCard = ServiceCard;
