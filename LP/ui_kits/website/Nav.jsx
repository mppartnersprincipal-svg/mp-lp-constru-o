// Nav.jsx — fixed top navigation, blurs on scroll
function Nav({ active = 'inicio', onNav = () => {} }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [
    { id: 'inicio', label: 'Início' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'cases', label: 'Cases' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'contato', label: 'Contato' },
  ];
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px clamp(20px, 4vw, 48px)',
      background: scrolled ? 'rgba(10,10,10,0.8)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-1)' : '1px solid transparent',
      transition: 'all 200ms cubic-bezier(0.22,1,0.36,1)',
    }}>
      <a href="#inicio" onClick={e => { e.preventDefault(); onNav('inicio'); }} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <img src="../../assets/logo-mp-mark.svg" alt="MP" style={{ height: 30 }} />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff', letterSpacing: '.14em', fontSize: 11 }}>ASSESSORIA</span>
      </a>
      <div style={{ display: 'flex', gap: 32, fontFamily: 'var(--font-body)', fontSize: 14 }}>
        {links.map(l => (
          <a key={l.id} href={`#${l.id}`} onClick={e => { e.preventDefault(); onNav(l.id); }}
             style={{ color: active === l.id ? 'var(--accent)' : 'var(--fg-2)', textDecoration: 'none', transition: 'color 160ms' }}>
            {l.label}
          </a>
        ))}
      </div>
      <Button size="sm" onClick={() => onNav('contato')}>AGENDAR DIAGNÓSTICO</Button>
    </nav>
  );
}
window.Nav = Nav;
