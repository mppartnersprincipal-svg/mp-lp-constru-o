# M|P Assessoria — LP de Captação (Lojas de Material de Construção)

Landing page de captação de leads da M|P Assessoria, voltada a donos de lojas de
material de construção. O lead preenche um formulário de 5 perguntas → os dados vão
para um webhook do Make → redirect para a página de sucesso (`/sucesso`).

**Produção:** https://www.mpconstrucao.com.br

## Antes de qualquer alteração

1. Leia `docs/HISTORICO.md` — registro do que já foi feito em sessões anteriores.
2. Se a tarefa envolver tracking/anúncios, leia `docs/RASTREAMENTO.md` — fonte da
   verdade de GTM, Meta Pixel e eventos.
3. Ao final de uma sessão com mudanças relevantes, **adicione uma entrada datada em
   `docs/HISTORICO.md`** e atualize `docs/RASTREAMENTO.md` se o tracking mudou.

## Estrutura

```
LP/Landing Page - Captacao/   ← projeto da landing page (todo o trabalho é aqui)
├── index.html                ← página principal (GTM, SEO) — o conteúdo do #root é
│                               GERADO pelo build (pré-render); não editar à mão
├── sucesso.html              ← thank-you page /sucesso (noindex, GTM snippet)
├── app.js                    ← bundle COMPILADO e COMMITADO (gerado pelo esbuild)
├── src/                      ← código-fonte React 18
│   ├── App.jsx               ← composição da página; goForm() centraliza o cta_click
│   ├── main.jsx              ← entrada do cliente: HIDRATA o HTML pré-renderizado
│   ├── prerender-entry.jsx   ← roda no Node no build: renderToString → index.html
│   ├── track.js              ← pushEvent() → dataLayer do GTM
│   └── components/           ← LpForm.jsx (formulário/webhook/Lead), LpHero, etc.
├── assets/fonts/             ← Montserrat/Inter self-hosted (woff2 variáveis)
├── README-DEPLOY.md          ← guia de deploy e sinais de GTM (manter atualizado)
└── package.json              ← scripts esbuild (build = build:app + build:html)
dashboard/                    ← painel de métricas (React/Vite + /api serverless na Vercel)
├── api/                      ← rotas server-side: meta.js, ga4.js, leads.js (segredos aqui)
├── src/                      ← frontend (App.jsx com todos os gráficos)
├── README.md                 ← rotas, variáveis de ambiente e deploy
└── .env.local                ← segredos locais (gitignored — NUNCA commitar)
docs/
├── HISTORICO.md              ← diário de sessões (ler antes, registrar depois)
└── RASTREAMENTO.md           ← fonte da verdade do tracking
```

As demais pastas em `LP/` (assets, ui_kits, ebook, etc.) são material de apoio/design
— não fazem parte do deploy.

## Comandos (rodar dentro de `LP/Landing Page - Captacao/`)

- `npm run build` — gera `app.js` (esbuild, minificado) **e** o HTML pré-renderizado
  dentro do `#root` do `index.html` (LCP: o hero pinta sem esperar o JS).
  **Obrigatório após qualquer mudança em `src/`** — bundle e `index.html` são
  commitados, não são gerados na nuvem. Commite os dois juntos.
- `npm run watch` — build contínuo com sourcemap.
- `npm run serve` — servidor local na porta 5050.

## Deploy

Push na branch `main` → Vercel republica automaticamente (projeto conectado ao
GitHub: `mppartnersprincipal-svg/mp-lp-constru-o`). Após o push, verifique a produção
(ex.: `Invoke-WebRequest https://www.mpconstrucao.com.br/` e conferir o conteúdo).

## Regras críticas

- **NUNCA criar tag de `Lead` no GTM.** O evento padrão `Lead` do Meta é disparado
  direto pelo código ([LpForm.jsx](LP/Landing%20Page%20-%20Captacao/src/components/LpForm.jsx),
  `fbq('track','Lead')`) no envio do formulário. Tag no GTM = conversão duplicada.
- **Sempre rebuildar** (`npm run build`) e commitar `app.js` **e** `index.html`
  junto com mudanças em `src/` — sem isso a produção não muda. O conteúdo do
  `<div id="root">` no `index.html` é gerado pelo build (não editar à mão).
- **O hero (acima da dobra) não pode nascer com `opacity: 0`** — o `h1` é o
  elemento LCP; esconder o hero até o React montar foi a causa do LCP de 4–5s
  (corrigido em 2026-07-11). Animação de entrada no hero: só `transform`
  (classe `.hero-in`); `<Reveal>`/`<CountUp>` apenas abaixo da dobra.
- Alterações no site só valem em produção após **commit + push** (Vercel auto-deploy).
- Contêiner GTM ativo: **GTM-PCD4K574** (em `index.html` e `sucesso.html`).
  O antigo `GTM-MBDQT8Z7` foi desativado — ver pendências no `docs/RASTREAMENTO.md`.
- Não remover a metatag `facebook-domain-verification` do `index.html`
  (verificação de domínio do Meta).
- Idioma do projeto: PT-BR (código, comentários, docs e comunicação com o usuário).
- **NUNCA editar arquivos-fonte com PowerShell** (`Get-Content`/`Set-Content`/
  `-replace` em lote): o PowerShell 5.1 lê UTF-8 sem BOM como ANSI e corrompe a
  acentuação ao regravar (aconteceu em 2026-07-08; reparado). Use sempre as
  ferramentas Edit/Write, mesmo para substituições repetitivas em vários arquivos.

## Contexto de negócio

- Conversão real = envio do formulário (evento `Lead` / `lead_form_submit`).
  Campanhas do Meta otimizam por `Lead`; `cta_click` e `whatsapp_click` são sinais
  de topo de funil (remarketing/análise), nunca o evento de otimização.
- Webhook dos leads: constante `WEBHOOK_URL` em `src/components/LpForm.jsx` (Make).
