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
├── index.html                ← página principal (GTM snippet, metatag do Meta, SEO)
├── sucesso.html              ← thank-you page /sucesso (noindex, GTM snippet)
├── app.js                    ← bundle COMPILADO e COMMITADO (gerado pelo esbuild)
├── src/                      ← código-fonte React 18
│   ├── main.jsx              ← entrada; goForm() centraliza o evento cta_click
│   ├── track.js              ← pushEvent() → dataLayer do GTM
│   └── components/           ← LpForm.jsx (formulário/webhook/Lead), LpHero, etc.
├── README-DEPLOY.md          ← guia de deploy e sinais de GTM (manter atualizado)
└── package.json              ← scripts esbuild
docs/
├── HISTORICO.md              ← diário de sessões (ler antes, registrar depois)
└── RASTREAMENTO.md           ← fonte da verdade do tracking
```

As demais pastas em `LP/` (assets, ui_kits, ebook, etc.) são material de apoio/design
— não fazem parte do deploy.

## Comandos (rodar dentro de `LP/Landing Page - Captacao/`)

- `npm run build` — gera `app.js` (esbuild, minificado). **Obrigatório após qualquer
  mudança em `src/`** — o bundle é commitado, não é gerado na nuvem.
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
- **Sempre rebuildar** (`npm run build`) e commitar o `app.js` junto com mudanças
  em `src/` — sem isso a produção não muda.
- Alterações no site só valem em produção após **commit + push** (Vercel auto-deploy).
- Contêiner GTM ativo: **GTM-PCD4K574** (em `index.html` e `sucesso.html`).
  O antigo `GTM-MBDQT8Z7` foi desativado — ver pendências no `docs/RASTREAMENTO.md`.
- Não remover a metatag `facebook-domain-verification` do `index.html`
  (verificação de domínio do Meta).
- Idioma do projeto: PT-BR (código, comentários, docs e comunicação com o usuário).

## Contexto de negócio

- Conversão real = envio do formulário (evento `Lead` / `lead_form_submit`).
  Campanhas do Meta otimizam por `Lead`; `cta_click` e `whatsapp_click` são sinais
  de topo de funil (remarketing/análise), nunca o evento de otimização.
- Webhook dos leads: constante `WEBHOOK_URL` em `src/components/LpForm.jsx` (Make).
