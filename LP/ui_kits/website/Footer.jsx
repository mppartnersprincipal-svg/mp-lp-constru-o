// Footer.jsx
function Footer() {
  return (
    <footer style={{ background: 'var(--bg-page)', borderTop: '1px solid var(--border-1)',
      padding: '56px clamp(20px, 4vw, 48px) 28px' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 40 }}>
        <div>
          <img src="../../assets/logo-mp-full.svg" alt="MP Assessoria" style={{ height: 72, marginBottom: 16 }} />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--fg-3)', maxWidth: 280, lineHeight: 1.6 }}>
            Gestão de marketing digital para empresas que querem crescer com controle, não com sorte.
          </p>
        </div>
        <FooterCol title="Serviços" links={['Tráfego Pago', 'Consultoria', 'CRM & Automação', 'Analytics']} />
        <FooterCol title="Empresa" links={['Sobre', 'Cases', 'Carreira', 'Contato']} />
        <FooterCol title="Contato" links={['contato@mpassessoria.com.br', '(11) 99000-0000', 'São Paulo · SP']} plain />
      </div>
      <div style={{ maxWidth: 'var(--container-max)', margin: '40px auto 0', paddingTop: 24,
        borderTop: '1px solid var(--border-1)', display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-3)' }}>
        <span>© 2026 MP Assessoria Digital · CNPJ 00.000.000/0001-00</span>
        <div style={{ display: 'flex', gap: 20 }}>
          <a style={{ color: 'var(--fg-3)' }}>Privacidade</a>
          <a style={{ color: 'var(--fg-3)' }}>Termos</a>
        </div>
      </div>
    </footer>
  );
}
function FooterCol({ title, links, plain }) {
  return (
    <div>
      <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11,
        letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--fg-1)', margin: '0 0 16px' }}>{title}</h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {links.map((l, i) => (
          <li key={i} style={{ padding: '6px 0', fontFamily: 'var(--font-body)', fontSize: 13 }}>
            {plain ? <span style={{ color: 'var(--fg-2)' }}>{l}</span> : <a style={{ color: 'var(--fg-2)', textDecoration: 'none' }}>{l}</a>}
          </li>
        ))}
      </ul>
    </div>
  );
}
window.Footer = Footer;
