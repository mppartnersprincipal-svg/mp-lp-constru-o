// Testimonials.jsx
function Testimonials() {
  const items = [
    { quote: 'Em 4 meses saímos de R$ 180k para R$ 420k de faturamento mensal. A estrutura de CRM e tráfego que a MP montou é o que a gente não tinha conseguido fazer sozinhos em 2 anos.',
      name: 'Renata Castro', role: 'CEO · Studio Norte Arquitetura', initials: 'RC' },
    { quote: 'O ROAS subiu de 2.1x para 6.4x em 90 dias. Reuniões semanais, report claro, e ajustes de campanha que realmente mudam o resultado no fim do mês.',
      name: 'Fernando Maluf', role: 'Sócio · Bravo Auto', initials: 'FM' },
    { quote: 'Pela primeira vez a gente tem previsibilidade de quantos leads e fechamentos vão entrar no mês. Isso muda tudo quando você precisa decidir contratações e estoque.',
      name: 'Juliana Prado', role: 'Diretora · Casa Modena', initials: 'JP' },
  ];
  return (
    <section style={{ padding: 'var(--section-pad-y) clamp(20px, 4vw, 48px)', background: 'var(--bg-section)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, letterSpacing: '.08em',
          textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 14px' }}>Depoimentos</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 4vw, 52px)',
          color: '#fff', margin: '0 0 48px', letterSpacing: '-0.02em', lineHeight: 1.1, maxWidth: 720 }}>
          O que dizem empresas que já escalam com a gente.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {items.map((t, i) => (
            <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)',
              borderRadius: 16, padding: 28 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 900,
                color: 'var(--accent)', lineHeight: 1, marginBottom: 8 }}>"</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--fg-1)',
                lineHeight: 1.6, margin: '0 0 24px' }}>{t.quote}</p>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--border-1)' }}>
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg,#F5A623,#8F5A08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000',
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13 }}>{t.initials}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: '#fff', fontSize: 14 }}>{t.name}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-3)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Testimonials = Testimonials;
