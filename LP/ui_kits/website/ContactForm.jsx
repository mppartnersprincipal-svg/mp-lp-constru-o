// ContactForm.jsx — full contact form with validation
function Input({ label, value, onChange, placeholder, type = 'text', error }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div>
      <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 12,
        color: 'var(--fg-3)', marginBottom: 8, letterSpacing: '.02em' }}>{label}</label>
      <input type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          width: '100%', boxSizing: 'border-box', background: 'var(--bg-card)',
          border: `1px solid ${error ? 'var(--danger)' : focus ? 'var(--accent)' : 'var(--border-1)'}`,
          color: 'var(--fg-1)', borderRadius: 8, padding: '14px 16px',
          fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none',
          boxShadow: focus && !error ? '0 0 0 2px rgba(245,166,35,0.2)' : 'none',
          transition: 'all 160ms',
        }} />
      {error && <div style={{ fontSize: 11, color: 'var(--danger)', marginTop: 4, fontFamily: 'var(--font-body)' }}>{error}</div>}
    </div>
  );
}

function ContactForm() {
  const [f, setF] = React.useState({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  const [sent, setSent] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const set = (k) => (v) => setF(prev => ({ ...prev, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!f.name) errs.name = 'Campo obrigatório';
    if (!f.email) errs.email = 'Campo obrigatório';
    if (!f.company) errs.company = 'Campo obrigatório';
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSent(true);
  };
  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: 48 }}>
        <i data-lucide="check-circle-2" style={{ width: 56, height: 56, color: 'var(--accent)', marginBottom: 18 }}></i>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: '#fff', margin: '0 0 10px' }}>Mensagem recebida.</h3>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--fg-2)', margin: 0 }}>
          Em até 24h um consultor da MP entra em contato para agendar seu diagnóstico.
        </p>
      </div>
    );
  }
  return (
    <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
      <Input label="Nome" value={f.name} onChange={set('name')} placeholder="Seu nome completo" error={errors.name} />
      <Input label="Email" value={f.email} onChange={set('email')} placeholder="voce@empresa.com.br" error={errors.email} />
      <Input label="Telefone" value={f.phone} onChange={set('phone')} placeholder="(11) 90000-0000" />
      <Input label="Empresa" value={f.company} onChange={set('company')} placeholder="Nome da empresa" error={errors.company} />
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-3)', marginBottom: 8 }}>Serviço de interesse</label>
        <select value={f.service} onChange={e => set('service')(e.target.value)}
          style={{ width: '100%', boxSizing: 'border-box', background: 'var(--bg-card)', border: '1px solid var(--border-1)',
          color: 'var(--fg-1)', borderRadius: 8, padding: '14px 16px', fontFamily: 'var(--font-body)',
          fontSize: 14, outline: 'none', appearance: 'none' }}>
          <option value="">Selecione um serviço</option>
          <option>Tráfego Pago</option>
          <option>Consultoria Estratégica</option>
          <option>CRM & Automação</option>
          <option>Tudo acima</option>
        </select>
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-3)', marginBottom: 8 }}>Mensagem</label>
        <textarea value={f.message} onChange={e => set('message')(e.target.value)}
          placeholder="Conte um pouco sobre o momento da sua empresa — faturamento, estrutura de marketing atual, desafios…"
          style={{ width: '100%', boxSizing: 'border-box', background: 'var(--bg-card)', border: '1px solid var(--border-1)',
          color: 'var(--fg-1)', borderRadius: 8, padding: '14px 16px', fontFamily: 'var(--font-body)',
          fontSize: 14, outline: 'none', height: 120, resize: 'none' }} />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <Button type="submit" size="lg" full iconRight="arrow-right">Agendar diagnóstico gratuito</Button>
      </div>
    </form>
  );
}

function Contact() {
  return (
    <section id="contato" style={{ padding: 'var(--section-pad-y) clamp(20px, 4vw, 48px)', background: 'var(--bg-page)' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'start' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, letterSpacing: '.08em',
            textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 14px' }}>Diagnóstico gratuito</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 3.4vw, 44px)',
            color: '#fff', margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Vamos analisar seu funil.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.6, margin: '0 0 28px' }}>
            Em 45 minutos mapeamos gargalos de aquisição, retenção e ROAS — e montamos um plano claro de próximos passos.
          </p>
          <ul style={{ listStyle:'none', padding:0, margin:0, fontFamily:'var(--font-body)', fontSize:14, color:'var(--fg-2)'}}>
            {['Sem compromisso', 'Presencial em SP ou online', 'Resposta em até 24h'].map((x,i) => (
              <li key={i} style={{ display:'flex', gap:10, padding:'8px 0' }}>
                <i data-lucide="check" style={{ width:16, height:16, color:'var(--accent)', marginTop:3 }}></i>{x}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)', borderRadius: 16, padding: 32 }}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

window.Input = Input;
window.ContactForm = ContactForm;
window.Contact = Contact;
