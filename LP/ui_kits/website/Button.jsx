// Button.jsx — MP Assessoria primary and ghost buttons
function Button({ children, variant = 'primary', size = 'md', onClick, type='button', full=false, iconRight=null }) {
  const base = {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    letterSpacing: '.08em',
    textTransform: 'uppercase',
    borderRadius: 999,
    border: 0,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    transition: 'all 160ms cubic-bezier(0.22,1,0.36,1)',
    width: full ? '100%' : undefined,
  };
  const sizes = {
    sm: { padding: '10px 18px', fontSize: 12 },
    md: { padding: '14px 24px', fontSize: 13 },
    lg: { padding: '18px 32px', fontSize: 14 },
  };
  const variants = {
    primary: { background: 'var(--accent)', color: '#000' },
    ghost: { background: 'transparent', color: 'var(--fg-1)', border: '1px solid rgba(255,255,255,0.4)' },
    dark: { background: 'var(--bg-card)', color: 'var(--fg-1)', border: '1px solid var(--border-1)' },
  };
  const [hover, setHover] = React.useState(false);
  const hoverStyle = hover ? {
    primary: { background: 'var(--accent-hover)', boxShadow: '0 10px 40px rgba(245,166,35,0.25)', transform: 'translateY(-1px)' },
    ghost: { borderColor: '#fff', background: 'rgba(255,255,255,0.04)' },
    dark: { background: 'var(--bg-card-hover)', borderColor: 'var(--border-2)' },
  }[variant] : {};
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...sizes[size], ...variants[variant], ...hoverStyle }}
    >
      {children}
      {iconRight && <i data-lucide={iconRight} style={{ width: 16, height: 16 }}></i>}
    </button>
  );
}
window.Button = Button;
