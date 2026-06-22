/* @ds-bundle: {"format":3,"namespace":"MPAssessoriaDesignSystem_9bfc5f","components":[],"sourceHashes":{"Landing Page - Captacao/LpForm.jsx":"262183fcfcf2","Landing Page - Captacao/LpHero.jsx":"6b1b9ac72fc3","Landing Page - Captacao/LpMethod.jsx":"5636103575f3","Landing Page - Captacao/LpProof.jsx":"51fb29887870","Landing Page - Captacao/LpResults.jsx":"9ada3ed24d74","Landing Page - Captacao/MpButton.jsx":"c0deb2ee7541","ui_kits/website/Button.jsx":"03f55d3eb428","ui_kits/website/Clients.jsx":"b416e307a614","ui_kits/website/ContactForm.jsx":"19888bc732d8","ui_kits/website/Footer.jsx":"fb22167fe6bc","ui_kits/website/Hero.jsx":"f9e46d8efb5c","ui_kits/website/Nav.jsx":"3fc303a796a5","ui_kits/website/Services.jsx":"9203557c1b82","ui_kits/website/Testimonials.jsx":"4afb239489e0"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MPAssessoriaDesignSystem_9bfc5f = window.MPAssessoriaDesignSystem_9bfc5f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// Landing Page - Captacao/LpForm.jsx
try { (() => {
// LpForm.jsx — Seção 3: Formulário de qualificação + tela de sucesso
function TextField({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = 'text'
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 13,
      color: 'var(--fg-2)',
      marginBottom: 10,
      letterSpacing: '.01em'
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      boxSizing: 'border-box',
      background: 'var(--bg-page)',
      border: `1px solid ${error ? 'var(--danger)' : focus ? 'var(--accent)' : 'var(--border-2)'}`,
      color: 'var(--fg-1)',
      borderRadius: 'var(--r-sm)',
      padding: '15px 16px',
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      outline: 'none',
      boxShadow: focus && !error ? '0 0 0 3px rgba(245,166,35,0.18)' : 'none',
      transition: 'all 160ms'
    }
  }), error && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--danger)',
      marginTop: 6,
      fontFamily: 'var(--font-body)'
    }
  }, error));
}
function ChipGroup({
  label,
  options,
  value,
  onChange,
  error
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 13,
      color: 'var(--fg-2)',
      marginBottom: 12,
      letterSpacing: '.01em'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10
    }
  }, options.map(opt => {
    const active = value === opt;
    return /*#__PURE__*/React.createElement("button", {
      key: opt,
      type: "button",
      onClick: () => onChange(opt),
      style: {
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
        fontSize: 14,
        cursor: 'pointer',
        padding: '11px 18px',
        borderRadius: 'var(--r-pill)',
        transition: 'all 140ms',
        background: active ? 'var(--accent)' : 'var(--bg-page)',
        color: active ? '#000' : 'var(--fg-2)',
        border: `1px solid ${active ? 'var(--accent)' : 'var(--border-2)'}`
      }
    }, opt);
  })), error && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--danger)',
      marginTop: 8,
      fontFamily: 'var(--font-body)'
    }
  }, error));
}
function LpForm() {
  const [f, setF] = React.useState({
    empresa: '',
    segmento: '',
    fatura: '',
    whatsapp: ''
  });
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const set = k => v => setF(p => ({
    ...p,
    [k]: v
  }));
  const submit = e => {
    e.preventDefault();
    const errs = {};
    if (!f.empresa.trim()) errs.empresa = 'Preencha o nome da empresa';
    if (!f.segmento) errs.segmento = 'Selecione uma opção';
    if (!f.fatura) errs.fatura = 'Selecione uma opção';
    if (!f.whatsapp.trim()) errs.whatsapp = 'Preencha seu WhatsApp';
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSent(true);
      window.scrollTo({
        top: Math.max(0, document.getElementById('formulario').offsetTop - 90),
        behavior: 'smooth'
      });
    }
  };
  const segmentos = ['Loja de tintas', 'Ferragista', 'Material de construção em geral', 'Pisos e porcelanatos', 'Distribuidor', 'Atacadista', 'Outro segmento'];
  return /*#__PURE__*/React.createElement("section", {
    id: "formulario",
    style: {
      padding: 'var(--section-pad-y) clamp(20px, 4vw, 48px)',
      background: 'var(--bg-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '0.85fr 1.15fr',
      gap: 'clamp(36px, 4vw, 64px)',
      alignItems: 'start'
    },
    className: "form-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow",
    style: {
      margin: '0 0 16px'
    }
  }, "Diagn\xF3stico gratuito"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--fs-h2)',
      color: '#fff',
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
      margin: '0 0 18px'
    }
  }, "Descubra quanto a sua loja pode vender com m\xE9todo."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      color: 'var(--fg-2)',
      lineHeight: 1.6,
      margin: '0 0 24px'
    }
  }, "Responda 4 perguntas r\xE1pidas. Se o seu perfil for compat\xEDvel, ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--fg-1)'
    }
  }, "Marcos ou Pedro"), " \u2014 os pr\xF3prios donos da M|P \u2014 entram em contato para um diagn\xF3stico do seu neg\xF3cio."), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'grid',
      gap: 12
    }
  }, ['Sem robô', 'Sem estagiário', 'Sem enrolação'].map(x => /*#__PURE__*/React.createElement("li", {
    key: x,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      color: 'var(--fg-2)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check",
    style: {
      width: 18,
      height: 18,
      color: 'var(--accent)'
    }
  }), x)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-card)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--r-lg)',
      padding: 'clamp(24px, 3vw, 40px)',
      boxShadow: 'var(--shadow-2)'
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '32px 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 72,
      height: 72,
      borderRadius: '50%',
      background: 'var(--accent-soft)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check-circle-2",
    style: {
      width: 40,
      height: 40,
      color: 'var(--accent)'
    }
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 26,
      color: '#fff',
      margin: '0 0 12px'
    }
  }, "Recebemos seus dados."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      color: 'var(--fg-2)',
      lineHeight: 1.6,
      margin: '0 auto',
      maxWidth: 380
    }
  }, "Se o seu perfil for compat\xEDvel, ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--fg-1)'
    }
  }, "Marcos ou Pedro"), " v\xE3o te chamar no WhatsApp ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--fg-1)'
    }
  }, f.whatsapp), " para o diagn\xF3stico da", ' ', /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--fg-1)'
    }
  }, f.empresa), ". Fica de olho no seu celular.")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      display: 'grid',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "1. Qual o nome da sua empresa?",
    value: f.empresa,
    onChange: set('empresa'),
    placeholder: "Ex.: Tintas S\xE3o Jo\xE3o",
    error: errors.empresa
  }), /*#__PURE__*/React.createElement(ChipGroup, {
    label: "2. Qual op\xE7\xE3o descreve melhor o seu neg\xF3cio?",
    options: segmentos,
    value: f.segmento,
    onChange: set('segmento'),
    error: errors.segmento
  }), /*#__PURE__*/React.createElement(ChipGroup, {
    label: "3. Sua empresa fatura acima de R$ 50 mil por m\xEAs?",
    options: ['Sim', 'Não'],
    value: f.fatura,
    onChange: set('fatura'),
    error: errors.fatura
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "4. Seu WhatsApp para contato",
    value: f.whatsapp,
    onChange: set('whatsapp'),
    placeholder: "(00) 00000-0000",
    error: errors.whatsapp,
    type: "tel"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(MpButton, {
    type: "submit",
    size: "lg",
    full: true,
    iconRight: "arrow-right"
  }, "Quero meu diagn\xF3stico"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      color: 'var(--fg-3)',
      lineHeight: 1.55,
      margin: '16px 0 0',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "lock",
    style: {
      width: 15,
      height: 15,
      color: 'var(--fg-3)',
      flexShrink: 0,
      marginTop: 2
    }
  }), "Seus dados est\xE3o seguros. Voc\xEA fala direto com os donos da M|P \u2014 a gente n\xE3o vende sua informa\xE7\xE3o e n\xE3o enche o seu WhatsApp de spam."))))));
}
window.TextField = TextField;
window.ChipGroup = ChipGroup;
window.LpForm = LpForm;
})(); } catch (e) { __ds_ns.__errors.push({ path: "Landing Page - Captacao/LpForm.jsx", error: String((e && e.message) || e) }); }

// Landing Page - Captacao/LpHero.jsx
try { (() => {
// LpHero.jsx — Seção 1: Headline + CTA + foto dos donos
function PhotoSlot({
  id,
  label,
  sub,
  ratio = '4 / 5'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      aspectRatio: ratio,
      borderRadius: 'var(--r-lg)',
      overflow: 'hidden',
      background: 'linear-gradient(160deg, #1c1c1c 0%, #121212 100%)',
      border: '1px dashed var(--border-2)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 24
    },
    "data-photo-slot": id
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "image",
    style: {
      width: 40,
      height: 40,
      color: 'var(--fg-4)',
      marginBottom: 14
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 14,
      color: 'var(--fg-2)',
      textTransform: 'uppercase',
      letterSpacing: '.08em',
      margin: '0 0 6px'
    }
  }, label), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--fg-3)',
      margin: 0,
      maxWidth: 240
    }
  }, sub));
}
function LpHero({
  onCta
}) {
  const clients = ['Rodrigo Tintas', 'Telhas Coral', 'Pacheco Solar'];
  return /*#__PURE__*/React.createElement("section", {
    id: "inicio",
    style: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '140px clamp(20px, 4vw, 48px) 72px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: -240,
      top: -160,
      width: 760,
      height: 760,
      background: 'radial-gradient(closest-side, rgba(245,166,35,0.16), transparent 70%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      width: '100%',
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '1.25fr 1fr',
      gap: 'clamp(40px, 5vw, 80px)',
      alignItems: 'center'
    },
    className: "hero-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      margin: '0 0 22px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--accent)'
    }
  }), "Para lojas de material de constru\xE7\xE3o"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 'clamp(40px, 5.4vw, 76px)',
      lineHeight: 1.04,
      letterSpacing: '-0.02em',
      color: '#fff',
      margin: '0 0 24px',
      textWrap: 'balance'
    }
  }, "Aumente o faturamento da sua loja em ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "at\xE9 40%"), " com uma metodologia testada e validada."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'clamp(16px, 1.4vw, 19px)',
      color: 'var(--fg-2)',
      maxWidth: 600,
      lineHeight: 1.6,
      margin: '0 0 36px'
    }
  }, "A M|P estrutura uma metodologia para lojas de material de constru\xE7\xE3o no Brasil venderem mais \u2014 todo m\xEAs, com previsibilidade e retorno comprovado. Os mesmos resultados que j\xE1 entregamos para a", ' ', /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--fg-1)',
      fontWeight: 700
    }
  }, "Rodrigo Tintas"), ", a", ' ', /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--fg-1)',
      fontWeight: 700
    }
  }, "Telhas Coral"), " e a", ' ', /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--fg-1)',
      fontWeight: 700
    }
  }, "Pacheco Solar"), "."), /*#__PURE__*/React.createElement(MpButton, {
    size: "xl",
    onClick: onCta,
    iconRight: "arrow-right"
  }, "Quero o diagn\xF3stico da minha loja"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      paddingTop: 28,
      borderTop: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--fg-3)',
      textTransform: 'uppercase',
      letterSpacing: '.1em',
      margin: '0 0 14px'
    }
  }, "Lojas que j\xE1 crescem com a M|P"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px 28px',
      alignItems: 'center'
    }
  }, clients.map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 15,
      color: 'var(--fg-2)',
      letterSpacing: '.02em'
    }
  }, c))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(PhotoSlot, {
    id: "donos",
    label: "Foto: Marcos e Pedro",
    sub: "Os donos da M|P, olhando pra c\xE2mera. Foto real \u2014 sem banco de imagem.",
    ratio: "4 / 5"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: -18,
      left: -18,
      background: 'var(--accent)',
      color: '#000',
      borderRadius: 'var(--r-pill)',
      padding: '12px 20px',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 14,
      boxShadow: 'var(--shadow-yellow-glow)',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "badge-check",
    style: {
      width: 18,
      height: 18
    }
  }), "Voc\xEA fala com os donos"))));
}
window.PhotoSlot = PhotoSlot;
window.LpHero = LpHero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "Landing Page - Captacao/LpHero.jsx", error: String((e && e.message) || e) }); }

// Landing Page - Captacao/LpMethod.jsx
try { (() => {
// LpMethod.jsx — Seção 4: O método M|P (3 frentes + vídeo do Marcos)
function MethodCard({
  number,
  icon,
  title,
  children
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--bg-card)',
      border: `1px solid ${hover ? 'var(--border-accent)' : 'var(--border-1)'}`,
      borderRadius: 'var(--r-lg)',
      padding: 'clamp(24px, 2.4vw, 32px)',
      transition: 'all 200ms cubic-bezier(0.22,1,0.36,1)',
      transform: hover ? 'translateY(-4px)' : 'none',
      boxShadow: hover ? 'var(--shadow-2)' : 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 40,
      color: 'var(--accent)',
      lineHeight: 1
    }
  }, number), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--r-sm)',
      background: 'var(--accent-soft)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 22,
      height: 22,
      color: 'var(--accent)'
    }
  }))), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 20,
      color: '#fff',
      letterSpacing: '-0.01em',
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      color: 'var(--fg-2)',
      lineHeight: 1.6,
      margin: 0
    }
  }, children));
}
function LpMethod() {
  return /*#__PURE__*/React.createElement("section", {
    id: "metodo",
    style: {
      padding: 'var(--section-pad-y) clamp(20px, 4vw, 48px)',
      background: 'var(--bg-section)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      marginBottom: 'clamp(36px, 4vw, 56px)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow",
    style: {
      margin: '0 0 16px'
    }
  }, "O m\xE9todo M|P"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--fs-h2)',
      color: '#fff',
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
      margin: '0 0 22px'
    }
  }, "Por que funciona quando o resto j\xE1 falhou."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'clamp(16px, 1.3vw, 18px)',
      color: 'var(--fg-2)',
      lineHeight: 1.65,
      margin: '0 0 14px'
    }
  }, "Voc\xEA provavelmente j\xE1 tentou. Impulsionou post, contratou a \u201Cmenina do marketing\u201D, talvez at\xE9 pagou uma ag\xEAncia de fora do estado. E continuou no mesmo lugar."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'clamp(16px, 1.3vw, 18px)',
      color: 'var(--fg-1)',
      fontWeight: 600,
      lineHeight: 1.65,
      margin: '0 0 14px'
    }
  }, "O problema n\xE3o foi voc\xEA. Foi a falta de m\xE9todo."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'clamp(16px, 1.3vw, 18px)',
      color: 'var(--fg-2)',
      lineHeight: 1.65,
      margin: 0
    }
  }, "Marketing sem processo \xE9 aposta. O que a gente faz \xE9 diferente \u2014 e funciona porque atua em tr\xEAs frentes que trabalham juntas:")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'clamp(16px, 1.6vw, 24px)'
    },
    className: "method-grid"
  }, /*#__PURE__*/React.createElement(MethodCard, {
    number: "1",
    icon: "target",
    title: "Gera\xE7\xE3o de demanda qualificada \u2014 Google + Meta Ads"
  }, "Colocamos a sua loja na frente de quem est\xE1 procurando material de constru\xE7\xE3o ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--fg-1)'
    }
  }, "agora"), ", no Google e no Instagram. N\xE3o \xE9 \u201Caparecer pra todo mundo\u201D. \xC9 aparecer pra quem tem inten\xE7\xE3o de comprar e est\xE1 pronto pra fechar."), /*#__PURE__*/React.createElement(MethodCard, {
    number: "2",
    icon: "message-square-text",
    title: "Conte\xFAdo que converte"
  }, "An\xFAncio sozinho n\xE3o vende. A gente cria a comunica\xE7\xE3o e o conte\xFAdo que transformam quem viu a sua marca em algu\xE9m que confia nela \u2014 e decide comprar de voc\xEA, n\xE3o do concorrente que cobra mais barato."), /*#__PURE__*/React.createElement(MethodCard, {
    number: "3",
    icon: "git-merge",
    title: "Processo comercial"
  }, "Aqui est\xE1 o que quase ningu\xE9m faz: a gente n\xE3o te entrega o lead e some. Estruturamos o seu comercial, o follow-up e o CRM pra que nenhuma venda escape pelo WhatsApp. Lead gerado \xE9 lead que vira venda.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'clamp(32px, 3.5vw, 48px)',
      display: 'grid',
      gridTemplateColumns: '1fr 1.1fr',
      gap: 'clamp(28px, 3vw, 48px)',
      alignItems: 'center'
    },
    className: "method-close"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--accent-soft)',
      border: '1px solid var(--border-accent)',
      borderRadius: 'var(--r-lg)',
      padding: 'clamp(24px, 2.6vw, 36px)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(20px, 2vw, 26px)',
      color: '#fff',
      lineHeight: 1.25,
      margin: '0 0 14px'
    }
  }, "Demanda ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "+"), " Conte\xFAdo ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "+"), " Processo ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "="), " Previsibilidade."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      color: 'var(--fg-2)',
      lineHeight: 1.6,
      margin: 0
    }
  }, "\xC9 por isso que a M|P n\xE3o vende lead. Vende crescimento que voc\xEA consegue medir, todo m\xEAs.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 300,
      margin: '0 auto',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(VideoSlot, {
    id: "marcos-metodo",
    label: "O Marcos explica o m\xE9todo (30s)",
    ratio: "9 / 16"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--fg-3)',
      textAlign: 'center',
      margin: '14px 0 0'
    }
  }, "Em menos de um minuto, direto de quem vai cuidar do seu resultado.")))));
}
window.MethodCard = MethodCard;
window.LpMethod = LpMethod;
})(); } catch (e) { __ds_ns.__errors.push({ path: "Landing Page - Captacao/LpMethod.jsx", error: String((e && e.message) || e) }); }

// Landing Page - Captacao/LpProof.jsx
try { (() => {
// LpProof.jsx — Seção 2: Prova social (vídeo Pacheco Solar + print Telhas Coral)
function VideoSlot({
  id,
  label,
  ratio = '16 / 9',
  src
}) {
  const videoRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);
  if (src) {
    const play = () => {
      const v = videoRef.current;
      if (v) {
        v.play();
        setPlaying(true);
      }
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        width: '100%',
        aspectRatio: ratio,
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        background: '#000',
        border: '1px solid var(--border-1)',
        boxShadow: 'var(--shadow-2)'
      },
      "data-video-slot": id
    }, /*#__PURE__*/React.createElement("video", {
      ref: videoRef,
      src: src,
      controls: playing,
      playsInline: true,
      preload: "none",
      onPlay: () => setPlaying(true),
      onPause: () => setPlaying(false),
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block'
      }
    }), !playing && /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: play,
      "aria-label": 'Reproduzir: ' + label,
      style: {
        position: 'absolute',
        inset: 0,
        border: 0,
        cursor: 'pointer',
        background: 'rgba(10,10,10,0.32)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 76,
        height: 76,
        borderRadius: '50%',
        background: 'var(--accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-yellow-glow)'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "play",
      style: {
        width: 30,
        height: 30,
        color: '#000',
        marginLeft: 4
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 13,
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: '.1em'
      }
    }, label)));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      aspectRatio: ratio,
      borderRadius: 'var(--r-lg)',
      overflow: 'hidden',
      background: 'linear-gradient(160deg, #1c1c1c 0%, #101010 100%)',
      border: '1px solid var(--border-1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    },
    "data-video-slot": id
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 76,
      height: 76,
      borderRadius: '50%',
      background: 'var(--accent)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-yellow-glow)',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "play",
    style: {
      width: 30,
      height: 30,
      color: '#000',
      marginLeft: 4
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 13,
      color: 'var(--fg-3)',
      textTransform: 'uppercase',
      letterSpacing: '.1em',
      margin: 0
    }
  }, label));
}
function WhatsAppSlot({
  id,
  label,
  src
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: 320,
      margin: '0 auto',
      borderRadius: 28,
      overflow: 'hidden',
      background: '#0b141a',
      border: '8px solid #1a1a1a',
      boxShadow: 'var(--shadow-3)'
    },
    "data-whatsapp-slot": id
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: label,
    style: {
      width: '100%',
      height: 'auto',
      display: 'block'
    }
  }));
}
function ProofCaption({
  metric,
  quote,
  support,
  source
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, metric && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 'clamp(22px, 2.2vw, 30px)',
      color: 'var(--accent)',
      letterSpacing: '-0.01em',
      lineHeight: 1.15,
      margin: '0 0 10px'
    }
  }, metric), quote && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 18,
      color: '#fff',
      lineHeight: 1.35,
      margin: '0 0 6px'
    }
  }, "\u201C", quote, "\u201D", source && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-3)',
      fontWeight: 500,
      fontSize: 14
    }
  }, " \u2014 ", source)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      color: 'var(--fg-2)',
      lineHeight: 1.6,
      margin: 0
    }
  }, support));
}
function LpProof({
  onCta
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "resultados",
    style: {
      padding: 'var(--section-pad-y) clamp(20px, 4vw, 48px)',
      background: 'var(--bg-section)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      marginBottom: 'clamp(40px, 5vw, 64px)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow",
    style: {
      margin: '0 0 16px'
    }
  }, "Prova real"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--fs-h2)',
      color: '#fff',
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
      margin: '0 0 16px'
    }
  }, "N\xE3o \xE9 promessa. \xC9 o que j\xE1 aconteceu."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'clamp(16px, 1.3vw, 18px)',
      color: 'var(--fg-2)',
      lineHeight: 1.6,
      margin: 0
    }
  }, "Antes de falar de voc\xEA, deixa a gente te mostrar o que acontece quando uma empresa para de improvisar e passa a ter m\xE9todo.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '0.8fr 1fr',
      gap: 'clamp(32px, 5vw, 72px)',
      alignItems: 'center',
      marginBottom: 'clamp(48px, 6vw, 88px)'
    },
    className: "proof-grid"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 340,
      margin: '0 auto',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(VideoSlot, {
    id: "pacheco-solar",
    label: "Depoimento em v\xEDdeo \u2014 Pacheco Solar",
    src: "assets/pacheco-solar.mp4",
    ratio: "9 / 16"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ProofCaption, {
    metric: "+20% de faturamento",
    quote: "A M|P aumentou nosso faturamento em 20%.",
    source: "Pacheco Solar",
    support: "Aumento de 20% no faturamento mensal e R$ 579 mil em vendas nos primeiros 4 meses de parceria."
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      margin: 'clamp(8px, 2vw, 24px) 0 clamp(48px, 6vw, 80px)'
    }
  }, /*#__PURE__*/React.createElement(MpButton, {
    size: "lg",
    onClick: onCta,
    iconRight: "arrow-right"
  }, "Quero esse resultado na minha loja")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.1fr',
      gap: 'clamp(32px, 5vw, 72px)',
      alignItems: 'center'
    },
    className: "proof-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(WhatsAppSlot, {
    id: "telhas-coral",
    label: "Conversa com o cliente Telhas Coral",
    src: "assets/telhas-coral-whatsapp.jpeg"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 'clamp(30px, 3.4vw, 48px)',
      color: 'var(--accent)',
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
      margin: '0 0 16px'
    }
  }, "R$ 270.000 vendidos em um \xFAnico m\xEAs"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'clamp(16px, 1.3vw, 18px)',
      color: 'var(--fg-2)',
      lineHeight: 1.65,
      margin: 0
    }
  }, "Vindos dos an\xFAncios de Google que a M|P gerencia. \xC9 uma conversa real de WhatsApp com o nosso cliente \u2014 sem montagem, sem n\xFAmero maquiado. \xC9 o tipo de resultado que a gente comprova com dados, n\xE3o com discurso.")))));
}
window.VideoSlot = VideoSlot;
window.WhatsAppSlot = WhatsAppSlot;
window.LpProof = LpProof;
})(); } catch (e) { __ds_ns.__errors.push({ path: "Landing Page - Captacao/LpProof.jsx", error: String((e && e.message) || e) }); }

// Landing Page - Captacao/LpResults.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// LpResults.jsx — Seção 5: Clientes e resultados + CTA final
function ResultCard({
  name,
  metric,
  period
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-card)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--r-lg)',
      padding: 'clamp(24px, 2.4vw, 32px)',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-3)',
      margin: 0
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 'clamp(34px, 3.4vw, 48px)',
      color: 'var(--accent)',
      letterSpacing: '-0.02em',
      lineHeight: 1,
      margin: '4px 0'
    }
  }, metric), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--fg-2)',
      margin: 0
    }
  }, period));
}
function BigNumber({
  name,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-2)',
      padding: '24px 0',
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      gap: 24,
      alignItems: 'baseline'
    },
    className: "bignum-row"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 15,
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      color: 'var(--fg-1)',
      margin: 0
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(18px, 1.8vw, 24px)',
      color: 'var(--fg-2)',
      lineHeight: 1.3,
      margin: 0
    }
  }, children));
}
function LpResults({
  onCta
}) {
  const cards = [{
    name: 'Manu Tintas',
    metric: '+22%',
    period: 'de faturamento em 33 dias'
  }, {
    name: 'Rodrigo Tintas',
    metric: '+15%',
    period: 'de faturamento em 45 dias'
  }, {
    name: 'Mundo das Bombas',
    metric: '+30%',
    period: 'de faturamento em 60 dias'
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "clientes",
    style: {
      padding: 'var(--section-pad-y) clamp(20px, 4vw, 48px)',
      background: 'var(--bg-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      marginBottom: 'clamp(36px, 4vw, 56px)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow",
    style: {
      margin: '0 0 16px'
    }
  }, "Clientes e resultados"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--fs-h2)',
      color: '#fff',
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
      margin: '0 0 18px'
    }
  }, "Quem confiou no m\xE9todo, cresceu."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'clamp(16px, 1.3vw, 18px)',
      color: 'var(--fg-2)',
      lineHeight: 1.65,
      margin: 0
    }
  }, "E n\xE3o \xE9 resultado de \u201Cuma vez s\xF3\u201D. \xC9 padr\xE3o \u2014 em loja de tintas, em distribuidor, em ferragista, em quem vende bomba d\u2019\xE1gua. O segmento \u201Ctradicional\u201D \xE9 justamente onde mais tem espa\xE7o pra crescer, porque a concorr\xEAncia ainda improvisa no digital.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'clamp(16px, 1.6vw, 24px)',
      marginBottom: 'clamp(40px, 4vw, 56px)'
    },
    className: "results-grid"
  }, cards.map(c => /*#__PURE__*/React.createElement(ResultCard, _extends({
    key: c.name
  }, c)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 'clamp(48px, 5vw, 72px)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      color: 'var(--fg-3)',
      textTransform: 'uppercase',
      letterSpacing: '.08em',
      margin: '0 0 4px'
    }
  }, "E os n\xFAmeros que mostram o tamanho do que a gente faz"), /*#__PURE__*/React.createElement(BigNumber, {
    name: "Telhas Coral"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)',
      fontWeight: 900
    }
  }, "R$ 250 mil a R$ 350 mil"), " a mais de faturamento \u2014 todo m\xEAs."), /*#__PURE__*/React.createElement(BigNumber, {
    name: "Pacheco Solar"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)',
      fontWeight: 900
    }
  }, "+20%"), " no faturamento e ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)',
      fontWeight: 900
    }
  }, "R$ 579 mil"), " em vendas nos primeiros 4 meses.")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'linear-gradient(135deg, #1c1c1c 0%, #121212 100%)',
      border: '1px solid var(--border-accent)',
      borderRadius: 'var(--r-xl)',
      padding: 'clamp(36px, 5vw, 64px)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -120,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 600,
      height: 360,
      background: 'radial-gradient(closest-side, rgba(245,166,35,0.18), transparent 70%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 'clamp(28px, 3.4vw, 46px)',
      color: '#fff',
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
      margin: '0 auto 18px',
      maxWidth: 760
    }
  }, "A pr\xF3xima loja de material de constru\xE7\xE3o a crescer com a M|P pode ser a ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "sua"), "."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'clamp(16px, 1.4vw, 19px)',
      color: 'var(--fg-2)',
      lineHeight: 1.6,
      margin: '0 auto 32px',
      maxWidth: 600
    }
  }, "Responda as 4 perguntas e fale direto com quem vai construir o seu resultado."), /*#__PURE__*/React.createElement(MpButton, {
    size: "xl",
    onClick: onCta,
    iconRight: "arrow-right"
  }, "Quero vender mais")))));
}
function LpFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--bg-section)',
      borderTop: '1px solid var(--border-1)',
      padding: '48px clamp(20px, 4vw, 48px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/logo-mp-full.svg",
    alt: "M|P Assessoria",
    style: {
      height: 56
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--fg-3)',
      margin: 0,
      textAlign: 'right'
    }
  }, "\xA9 2026 M|P Assessoria Digital. Crescimento com m\xE9todo para lojas de material de constru\xE7\xE3o.")));
}
window.ResultCard = ResultCard;
window.BigNumber = BigNumber;
window.LpResults = LpResults;
window.LpFooter = LpFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "Landing Page - Captacao/LpResults.jsx", error: String((e && e.message) || e) }); }

// Landing Page - Captacao/MpButton.jsx
try { (() => {
// MpButton.jsx — MP Assessoria primary / ghost CTA pills
function MpButton({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  full = false,
  iconRight = null,
  iconLeft = null
}) {
  const base = {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    letterSpacing: '.08em',
    textTransform: 'uppercase',
    borderRadius: 999,
    border: 0,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    lineHeight: 1.1,
    transition: 'all 160ms cubic-bezier(0.22,1,0.36,1)',
    width: full ? '100%' : undefined
  };
  const sizes = {
    sm: {
      padding: '10px 18px',
      fontSize: 12
    },
    md: {
      padding: '15px 26px',
      fontSize: 13
    },
    lg: {
      padding: '19px 34px',
      fontSize: 15
    },
    xl: {
      padding: '22px 40px',
      fontSize: 16
    }
  };
  const variants = {
    primary: {
      background: 'var(--accent)',
      color: '#000'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--fg-1)',
      border: '1px solid rgba(255,255,255,0.4)'
    },
    dark: {
      background: 'var(--bg-card)',
      color: 'var(--fg-1)',
      border: '1px solid var(--border-1)'
    }
  };
  const [hover, setHover] = React.useState(false);
  const hoverStyle = hover ? {
    primary: {
      background: 'var(--accent-hover)',
      boxShadow: '0 12px 44px rgba(245,166,35,0.30)',
      transform: 'translateY(-2px)'
    },
    ghost: {
      borderColor: '#fff',
      background: 'rgba(255,255,255,0.05)'
    },
    dark: {
      background: 'var(--bg-card-hover)',
      borderColor: 'var(--border-2)'
    }
  }[variant] : {};
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...hoverStyle
    }
  }, iconLeft && /*#__PURE__*/React.createElement("i", {
    "data-lucide": iconLeft,
    style: {
      width: 18,
      height: 18
    }
  }), children, iconRight && /*#__PURE__*/React.createElement("i", {
    "data-lucide": iconRight,
    style: {
      width: 18,
      height: 18
    }
  }));
}

// Topbar — logo only + single CTA. No nav menu (focus on lead capture).
function Topbar({
  onCta
}) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 clamp(20px, 4vw, 48px)',
      height: scrolled ? 68 : 84,
      background: scrolled ? 'rgba(10,10,10,0.82)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-1)' : '1px solid transparent',
      transition: 'all 220ms cubic-bezier(0.22,1,0.36,1)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/logo-mp-mark.svg",
    alt: "M|P Assessoria",
    style: {
      height: scrolled ? 30 : 36,
      transition: 'all 220ms'
    }
  }), /*#__PURE__*/React.createElement(MpButton, {
    size: "sm",
    onClick: onCta,
    iconRight: "arrow-right"
  }, "Quero meu diagn\xF3stico"));
}
window.MpButton = MpButton;
window.Topbar = Topbar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "Landing Page - Captacao/MpButton.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Button.jsx
try { (() => {
// Button.jsx — MP Assessoria primary and ghost buttons
function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  full = false,
  iconRight = null
}) {
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
    width: full ? '100%' : undefined
  };
  const sizes = {
    sm: {
      padding: '10px 18px',
      fontSize: 12
    },
    md: {
      padding: '14px 24px',
      fontSize: 13
    },
    lg: {
      padding: '18px 32px',
      fontSize: 14
    }
  };
  const variants = {
    primary: {
      background: 'var(--accent)',
      color: '#000'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--fg-1)',
      border: '1px solid rgba(255,255,255,0.4)'
    },
    dark: {
      background: 'var(--bg-card)',
      color: 'var(--fg-1)',
      border: '1px solid var(--border-1)'
    }
  };
  const [hover, setHover] = React.useState(false);
  const hoverStyle = hover ? {
    primary: {
      background: 'var(--accent-hover)',
      boxShadow: '0 10px 40px rgba(245,166,35,0.25)',
      transform: 'translateY(-1px)'
    },
    ghost: {
      borderColor: '#fff',
      background: 'rgba(255,255,255,0.04)'
    },
    dark: {
      background: 'var(--bg-card-hover)',
      borderColor: 'var(--border-2)'
    }
  }[variant] : {};
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...hoverStyle
    }
  }, children, iconRight && /*#__PURE__*/React.createElement("i", {
    "data-lucide": iconRight,
    style: {
      width: 16,
      height: 16
    }
  }));
}
window.Button = Button;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Button.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Clients.jsx
try { (() => {
// Clients.jsx — logo carousel + animated metrics strip
function Clients() {
  const logos = ['STUDIO NORTE', 'CASA MODENA', 'BRAVO AUTO', 'VERTE+', 'LAMIARA', 'ORIGEN', 'KAVE LAB', 'NORTHGRID'];
  const loop = [...logos, ...logos];
  return /*#__PURE__*/React.createElement("section", {
    id: "cases",
    style: {
      padding: 'var(--section-pad-y) 0',
      background: 'var(--bg-page)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 clamp(20px, 4vw, 48px)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 12,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--accent)',
      margin: '0 0 14px',
      textAlign: 'center'
    }
  }, "Quem confia em n\xF3s"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(28px, 3.4vw, 42px)',
      textAlign: 'center',
      color: '#fff',
      margin: '0 0 48px',
      letterSpacing: '-0.02em'
    }
  }, "+42 empresas brasileiras escalando com a MP.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 64,
      animation: 'scroll 30s linear infinite',
      width: 'fit-content'
    }
  }, loop.map((name, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 22,
      letterSpacing: '.12em',
      color: 'var(--fg-3)',
      whiteSpace: 'nowrap',
      padding: '0 8px'
    }
  }, name))), /*#__PURE__*/React.createElement("style", null, `@keyframes scroll { from { transform: translateX(0);} to { transform: translateX(-50%);} }`), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '80px auto 0',
      padding: '0 clamp(20px,4vw,48px)',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    label: "Investimento gerido / m\xEAs",
    value: "R$ 2.8M"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    label: "Faturamento m\xE9dio",
    value: "+130%"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    label: "ROAS m\xE9dio",
    value: "5.4x"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    label: "NPS dos clientes",
    value: "72"
  })));
}
function StatBlock({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-1)',
      paddingTop: 20
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 'clamp(36px, 4vw, 56px)',
      lineHeight: 1,
      letterSpacing: '-0.02em',
      color: 'var(--accent)',
      margin: 0
    }
  }, value), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--fg-3)',
      margin: '10px 0 0'
    }
  }, label));
}
window.Clients = Clients;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Clients.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ContactForm.jsx
try { (() => {
// ContactForm.jsx — full contact form with validation
function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  error
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--fg-3)',
      marginBottom: 8,
      letterSpacing: '.02em'
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      boxSizing: 'border-box',
      background: 'var(--bg-card)',
      border: `1px solid ${error ? 'var(--danger)' : focus ? 'var(--accent)' : 'var(--border-1)'}`,
      color: 'var(--fg-1)',
      borderRadius: 8,
      padding: '14px 16px',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      outline: 'none',
      boxShadow: focus && !error ? '0 0 0 2px rgba(245,166,35,0.2)' : 'none',
      transition: 'all 160ms'
    }
  }), error && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--danger)',
      marginTop: 4,
      fontFamily: 'var(--font-body)'
    }
  }, error));
}
function ContactForm() {
  const [f, setF] = React.useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [sent, setSent] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const set = k => v => setF(prev => ({
    ...prev,
    [k]: v
  }));
  const submit = e => {
    e.preventDefault();
    const errs = {};
    if (!f.name) errs.name = 'Campo obrigatório';
    if (!f.email) errs.email = 'Campo obrigatório';
    if (!f.company) errs.company = 'Campo obrigatório';
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSent(true);
  };
  if (sent) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        padding: 48
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "check-circle-2",
      style: {
        width: 56,
        height: 56,
        color: 'var(--accent)',
        marginBottom: 18
      }
    }), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 28,
        color: '#fff',
        margin: '0 0 10px'
      }
    }, "Mensagem recebida."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-body)',
        color: 'var(--fg-2)',
        margin: 0
      }
    }, "Em at\xE9 24h um consultor da MP entra em contato para agendar seu diagn\xF3stico."));
  }
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Nome",
    value: f.name,
    onChange: set('name'),
    placeholder: "Seu nome completo",
    error: errors.name
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    value: f.email,
    onChange: set('email'),
    placeholder: "voce@empresa.com.br",
    error: errors.email
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Telefone",
    value: f.phone,
    onChange: set('phone'),
    placeholder: "(11) 90000-0000"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Empresa",
    value: f.company,
    onChange: set('company'),
    placeholder: "Nome da empresa",
    error: errors.company
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--fg-3)',
      marginBottom: 8
    }
  }, "Servi\xE7o de interesse"), /*#__PURE__*/React.createElement("select", {
    value: f.service,
    onChange: e => set('service')(e.target.value),
    style: {
      width: '100%',
      boxSizing: 'border-box',
      background: 'var(--bg-card)',
      border: '1px solid var(--border-1)',
      color: 'var(--fg-1)',
      borderRadius: 8,
      padding: '14px 16px',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      outline: 'none',
      appearance: 'none'
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Selecione um servi\xE7o"), /*#__PURE__*/React.createElement("option", null, "Tr\xE1fego Pago"), /*#__PURE__*/React.createElement("option", null, "Consultoria Estrat\xE9gica"), /*#__PURE__*/React.createElement("option", null, "CRM & Automa\xE7\xE3o"), /*#__PURE__*/React.createElement("option", null, "Tudo acima"))), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--fg-3)',
      marginBottom: 8
    }
  }, "Mensagem"), /*#__PURE__*/React.createElement("textarea", {
    value: f.message,
    onChange: e => set('message')(e.target.value),
    placeholder: "Conte um pouco sobre o momento da sua empresa \u2014 faturamento, estrutura de marketing atual, desafios\u2026",
    style: {
      width: '100%',
      boxSizing: 'border-box',
      background: 'var(--bg-card)',
      border: '1px solid var(--border-1)',
      color: 'var(--fg-1)',
      borderRadius: 8,
      padding: '14px 16px',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      outline: 'none',
      height: 120,
      resize: 'none'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    size: "lg",
    full: true,
    iconRight: "arrow-right"
  }, "Agendar diagn\xF3stico gratuito")));
}
function Contact() {
  return /*#__PURE__*/React.createElement("section", {
    id: "contato",
    style: {
      padding: 'var(--section-pad-y) clamp(20px, 4vw, 48px)',
      background: 'var(--bg-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 960,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1.2fr',
      gap: 64,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 12,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--accent)',
      margin: '0 0 14px'
    }
  }, "Diagn\xF3stico gratuito"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(32px, 3.4vw, 44px)',
      color: '#fff',
      margin: '0 0 16px',
      letterSpacing: '-0.02em',
      lineHeight: 1.1
    }
  }, "Vamos analisar seu funil."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      color: 'var(--fg-2)',
      lineHeight: 1.6,
      margin: '0 0 28px'
    }
  }, "Em 45 minutos mapeamos gargalos de aquisi\xE7\xE3o, reten\xE7\xE3o e ROAS \u2014 e montamos um plano claro de pr\xF3ximos passos."), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--fg-2)'
    }
  }, ['Sem compromisso', 'Presencial em SP ou online', 'Resposta em até 24h'].map((x, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      gap: 10,
      padding: '8px 0'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check",
    style: {
      width: 16,
      height: 16,
      color: 'var(--accent)',
      marginTop: 3
    }
  }), x)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-card)',
      border: '1px solid var(--border-1)',
      borderRadius: 16,
      padding: 32
    }
  }, /*#__PURE__*/React.createElement(ContactForm, null))));
}
window.Input = Input;
window.ContactForm = ContactForm;
window.Contact = Contact;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ContactForm.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
// Footer.jsx
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--bg-page)',
      borderTop: '1px solid var(--border-1)',
      padding: '56px clamp(20px, 4vw, 48px) 28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mp-full.svg",
    alt: "MP Assessoria",
    style: {
      height: 72,
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--fg-3)',
      maxWidth: 280,
      lineHeight: 1.6
    }
  }, "Gest\xE3o de marketing digital para empresas que querem crescer com controle, n\xE3o com sorte.")), /*#__PURE__*/React.createElement(FooterCol, {
    title: "Servi\xE7os",
    links: ['Tráfego Pago', 'Consultoria', 'CRM & Automação', 'Analytics']
  }), /*#__PURE__*/React.createElement(FooterCol, {
    title: "Empresa",
    links: ['Sobre', 'Cases', 'Carreira', 'Contato']
  }), /*#__PURE__*/React.createElement(FooterCol, {
    title: "Contato",
    links: ['contato@mpassessoria.com.br', '(11) 99000-0000', 'São Paulo · SP'],
    plain: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '40px auto 0',
      paddingTop: 24,
      borderTop: '1px solid var(--border-1)',
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--fg-3)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 MP Assessoria Digital \xB7 CNPJ 00.000.000/0001-00"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("a", {
    style: {
      color: 'var(--fg-3)'
    }
  }, "Privacidade"), /*#__PURE__*/React.createElement("a", {
    style: {
      color: 'var(--fg-3)'
    }
  }, "Termos"))));
}
function FooterCol({
  title,
  links,
  plain
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 11,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-1)',
      margin: '0 0 16px'
    }
  }, title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    }
  }, links.map((l, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      padding: '6px 0',
      fontFamily: 'var(--font-body)',
      fontSize: 13
    }
  }, plain ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-2)'
    }
  }, l) : /*#__PURE__*/React.createElement("a", {
    style: {
      color: 'var(--fg-2)',
      textDecoration: 'none'
    }
  }, l)))));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
// Hero.jsx — H1 + CTAs + metric stack on the right
function Hero({
  onPrimary,
  onSecondary
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "inicio",
    style: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '120px clamp(20px, 4vw, 48px) 80px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: -200,
      bottom: -200,
      width: 700,
      height: 700,
      background: 'radial-gradient(closest-side, rgba(245,166,35,0.14), transparent 70%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: 64,
      alignItems: 'center',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 12,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--accent)',
      margin: '0 0 20px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--accent)',
      marginRight: 8,
      verticalAlign: 'middle'
    }
  }), "MP Assessoria Digital"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 'clamp(44px, 6vw, 84px)',
      lineHeight: 1.02,
      letterSpacing: '-0.02em',
      color: '#fff',
      margin: '0 0 24px',
      textWrap: 'balance'
    }
  }, "Transforme tr\xE1fego em ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "faturamento previs\xEDvel"), "."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 18,
      color: 'var(--fg-2)',
      maxWidth: 560,
      lineHeight: 1.6,
      margin: '0 0 36px'
    }
  }, "Gest\xE3o de marketing digital para empresas que j\xE1 faturam e querem escalar com controle, n\xE3o com sorte."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: onPrimary,
    iconRight: "arrow-right"
  }, "Agendar diagn\xF3stico"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "ghost",
    onClick: onSecondary
  }, "Nossos cases"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(MetricTile, {
    label: "Faturamento",
    value: "+130%",
    caption: "m\xE9dia em 6 meses",
    highlight: true
  }), /*#__PURE__*/React.createElement(MetricTile, {
    label: "ROI M\xEDdia",
    value: "5.4x",
    caption: "retorno m\xE9dio"
  }), /*#__PURE__*/React.createElement(MetricTile, {
    label: "Clientes",
    value: "+42",
    caption: "empresas ativas"
  }), /*#__PURE__*/React.createElement(MetricTile, {
    label: "Reten\xE7\xE3o",
    value: "94%",
    caption: "ap\xF3s 12 meses"
  }))));
}
function MetricTile({
  label,
  value,
  caption,
  highlight
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-card)',
      border: highlight ? '1px solid var(--accent)' : '1px solid var(--border-1)',
      borderRadius: 16,
      padding: 22,
      boxShadow: highlight ? '0 10px 40px rgba(245,166,35,0.12)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-3)',
      margin: '0 0 6px'
    }
  }, label), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 44,
      lineHeight: 1,
      letterSpacing: '-0.02em',
      color: 'var(--accent)',
      margin: 0
    }
  }, value), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--fg-2)',
      margin: '8px 0 0'
    }
  }, caption));
}
window.Hero = Hero;
window.MetricTile = MetricTile;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Nav.jsx
try { (() => {
// Nav.jsx — fixed top navigation, blurs on scroll
function Nav({
  active = 'inicio',
  onNav = () => {}
}) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [{
    id: 'inicio',
    label: 'Início'
  }, {
    id: 'servicos',
    label: 'Serviços'
  }, {
    id: 'cases',
    label: 'Cases'
  }, {
    id: 'sobre',
    label: 'Sobre'
  }, {
    id: 'contato',
    label: 'Contato'
  }];
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px clamp(20px, 4vw, 48px)',
      background: scrolled ? 'rgba(10,10,10,0.8)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-1)' : '1px solid transparent',
      transition: 'all 200ms cubic-bezier(0.22,1,0.36,1)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#inicio",
    onClick: e => {
      e.preventDefault();
      onNav('inicio');
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mp-mark.svg",
    alt: "MP",
    style: {
      height: 30
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      color: '#fff',
      letterSpacing: '.14em',
      fontSize: 11
    }
  }, "ASSESSORIA")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 32,
      fontFamily: 'var(--font-body)',
      fontSize: 14
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id,
    href: `#${l.id}`,
    onClick: e => {
      e.preventDefault();
      onNav(l.id);
    },
    style: {
      color: active === l.id ? 'var(--accent)' : 'var(--fg-2)',
      textDecoration: 'none',
      transition: 'color 160ms'
    }
  }, l.label))), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => onNav('contato')
  }, "AGENDAR DIAGN\xD3STICO"));
}
window.Nav = Nav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Services.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Services.jsx — grid of service cards
function ServiceCard({
  icon,
  title,
  description,
  bullets,
  featured
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: hover ? 'var(--bg-card-hover)' : 'var(--bg-card)',
      border: featured ? '1px solid var(--accent)' : `1px solid ${hover ? 'var(--border-2)' : 'var(--border-1)'}`,
      borderRadius: 16,
      padding: 32,
      transform: hover ? 'translateY(-4px)' : 'translateY(0)',
      transition: 'all 200ms cubic-bezier(0.22,1,0.36,1)',
      position: 'relative'
    }
  }, featured && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 16,
      right: 16,
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 10,
      letterSpacing: '.08em',
      color: '#000',
      background: 'var(--accent)',
      padding: '4px 10px',
      borderRadius: 999
    }
  }, "POPULAR"), /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 36,
      height: 36,
      color: 'var(--accent)',
      marginBottom: 20
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 24,
      color: '#fff',
      margin: '0 0 10px',
      letterSpacing: '-0.01em'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--fg-2)',
      lineHeight: 1.55,
      margin: '0 0 20px'
    }
  }, description), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    }
  }, bullets.map((b, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      gap: 10,
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--fg-2)',
      padding: '6px 0',
      borderTop: i > 0 ? '1px dashed var(--border-1)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check",
    style: {
      width: 16,
      height: 16,
      color: 'var(--accent)',
      flex: '0 0 16px',
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("span", null, b)))));
}
function Services() {
  const items = [{
    icon: 'trending-up',
    title: 'Tráfego Pago',
    description: 'Campanhas performáticas em Meta Ads e Google Ads com otimização diária.',
    bullets: ['Estruturação de campanhas', 'Otimização diária de ROAS', 'Relatórios semanais de performance', 'Criativos e copy testados']
  }, {
    icon: 'target',
    title: 'Consultoria Estratégica',
    featured: true,
    description: 'Diagnóstico completo do funil e plano de crescimento para os próximos 90 dias.',
    bullets: ['Auditoria de marketing', 'Roadmap trimestral', 'Reuniões semanais com CEO', 'Definição de KPIs e metas']
  }, {
    icon: 'workflow',
    title: 'CRM & Automação',
    description: 'Estruturação de CRM e automações que reduzem custo por aquisição.',
    bullets: ['Configuração de pipeline', 'Automações de nutrição', 'Integração com tráfego pago', 'Dashboards executivos']
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "servicos",
    style: {
      padding: 'var(--section-pad-y) clamp(20px, 4vw, 48px)',
      background: 'var(--bg-section)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 56,
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 12,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--accent)',
      margin: '0 0 14px'
    }
  }, "Nossos servi\xE7os"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(32px, 4vw, 52px)',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: '#fff',
      margin: '0 0 16px'
    }
  }, "Tr\xEAs frentes para escalar com previsibilidade."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 17,
      color: 'var(--fg-2)',
      lineHeight: 1.6
    }
  }, "Trabalhamos como extens\xE3o do seu time \u2014 de aquisi\xE7\xE3o a reten\xE7\xE3o \u2014 com metas e reports semanais.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 20
    }
  }, items.map((s, i) => /*#__PURE__*/React.createElement(ServiceCard, _extends({
    key: i
  }, s))))));
}
window.Services = Services;
window.ServiceCard = ServiceCard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Services.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Testimonials.jsx
try { (() => {
// Testimonials.jsx
function Testimonials() {
  const items = [{
    quote: 'Em 4 meses saímos de R$ 180k para R$ 420k de faturamento mensal. A estrutura de CRM e tráfego que a MP montou é o que a gente não tinha conseguido fazer sozinhos em 2 anos.',
    name: 'Renata Castro',
    role: 'CEO · Studio Norte Arquitetura',
    initials: 'RC'
  }, {
    quote: 'O ROAS subiu de 2.1x para 6.4x em 90 dias. Reuniões semanais, report claro, e ajustes de campanha que realmente mudam o resultado no fim do mês.',
    name: 'Fernando Maluf',
    role: 'Sócio · Bravo Auto',
    initials: 'FM'
  }, {
    quote: 'Pela primeira vez a gente tem previsibilidade de quantos leads e fechamentos vão entrar no mês. Isso muda tudo quando você precisa decidir contratações e estoque.',
    name: 'Juliana Prado',
    role: 'Diretora · Casa Modena',
    initials: 'JP'
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'var(--section-pad-y) clamp(20px, 4vw, 48px)',
      background: 'var(--bg-section)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 12,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--accent)',
      margin: '0 0 14px'
    }
  }, "Depoimentos"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(32px, 4vw, 52px)',
      color: '#fff',
      margin: '0 0 48px',
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
      maxWidth: 720
    }
  }, "O que dizem empresas que j\xE1 escalam com a gente."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 20
    }
  }, items.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: 'var(--bg-card)',
      border: '1px solid var(--border-1)',
      borderRadius: 16,
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 40,
      fontWeight: 900,
      color: 'var(--accent)',
      lineHeight: 1,
      marginBottom: 8
    }
  }, "\""), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      color: 'var(--fg-1)',
      lineHeight: 1.6,
      margin: '0 0 24px'
    }
  }, t.quote), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      paddingTop: 16,
      borderTop: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: '50%',
      background: 'linear-gradient(135deg,#F5A623,#8F5A08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#000',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 13
    }
  }, t.initials), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      color: '#fff',
      fontSize: 14
    }
  }, t.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--fg-3)'
    }
  }, t.role))))))));
}
window.Testimonials = Testimonials;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Testimonials.jsx", error: String((e && e.message) || e) }); }

})();
