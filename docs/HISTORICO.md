# Histórico de Sessões

Diário do que foi feito no projeto, em ordem cronológica inversa (mais recente
primeiro). **Toda sessão que fizer mudança relevante deve adicionar uma entrada aqui**
com data, o que mudou, por quê, e pendências deixadas.

---

## 2026-07-08 (fim do dia) — Otimização de carregamento da LP (commit `90b2130`)

**Gatilho:** Meta mostrava 5 cliques no link e só 1 visualização da página de destino.
Diagnóstico: página com ~11,5 MB de payload inicial no mobile.

- `donos-hero.jpg` 1.776→127 KB (recompressão q5, mesma dimensão 1086×1448).
- `logo-mundo-das-bombas.jpg` 179→7 KB (2250px→200px altura).
- `pacheco-solar.mp4` 8,9→4,9 MB (540p, crf 28, faststart) **e** `preload` de
  `auto`→`metadata` no `VideoSlot` (LpProof.jsx) — o vídeo não baixa mais no load.
- Hero: `fetchpriority="high"` + `<link rel="preload">` no index.html (o LCP baixa
  em paralelo ao app.js, sem esperar o React montar).
- `loading="lazy"` + `decoding="async"` nas imagens abaixo da dobra.
- Payload inicial: **~11,5 MB → ~0,7 MB**. Originais recuperáveis no histórico do git
  (até o commit `f58f742`).
- Pendência futura opcional: substituir Lucide via unpkg (348 KB) por SVGs inline
  dos ~15 ícones usados.

Acompanhar nos próximos dias: razão "cliques no link → visualizações da página de
destino" no Meta (estava 1/5; esperado subir para 60–90%).

---

## 2026-07-08 (tarde) — Dashboard de métricas da LP: infraestrutura + construção

**Objetivo:** dashboard próprio com senha (Vercel) unindo Meta Ads + funil do site
(GA4) + leads (Supabase). Detalhes técnicos em `dashboard/README.md` e na seção
"Dashboard" do `RASTREAMENTO.md`.

### Infraestrutura criada (Fase 1)

- **Supabase** `mp-lp-construcao` (ref `tjtvtvlymissdebyiuko`, sa-east-1): tabela
  `public.leads` com RLS — `anon` só insere (chave usada pelo Make), leitura só com
  service role. **Make grava cada lead** via módulo HTTP após a notificação (testado).
- **GA4 dedicado da LP**: propriedade "LP Construção" (`G-W59B5D77T3`, ID `544749733`)
  criada porque o `G-XNM42NM1CX` antigo era do site institucional. Instalado via GTM
  (tags `GA4 — Base` e `GA4 — Eventos` com regex dos 3 eventos + params location/
  segmento/fatura). Dimensões personalizadas criadas. Coleta validada no Tempo real.

### Credenciais (Fase 2) — valores em `dashboard/.env.local` (gitignored)

- **Meta:** app "MP Dashboard" + usuário de sistema `dashboard-lp` (ads_read,
  read_insights), token validado lendo a campanha ativa.
- **Google:** conta de serviço `dashboard-ga4@mp-dashboard-501816.iam.gserviceaccount.com`
  (Leitor na propriedade GA4); JSON em `dashboard/ga4.credentials.json` (gitignored).
- **Supabase:** service role key (leitura de leads).

### Dashboard construído (Fase 3)

- `dashboard/`: React (Vite) + Recharts + 3 rotas serverless (`/api/meta`, `/api/ga4`,
  `/api/leads`) protegidas por `DASHBOARD_PASSWORD` via Bearer. Todas as 3 rotas
  **testadas localmente com dados reais** em 2026-07-08.
- Campanha ativa na conta `act_2643219305863486`:
  "[M|P] [LP] [LEAD] [FRIO] [CONSTRUÇÃO] [JULHO]" (`120250865648840153`).

### Pendências deixadas

- **Deploy na Vercel** (usuário faz): novo projeto no mesmo repo com Root Directory
  `dashboard` + colar as 7 variáveis de ambiente do `dashboard/README.md`.
- GA4 acumula histórico só a partir de 2026-07-08 (não retroativo).

---

## 2026-07-08 — Troca de contêiner GTM, evento cta_click e setup completo do Meta

**Contexto:** migração do tracking para um contêiner GTM novo e preparação da
primeira campanha de Leads no Meta Ads.

### Mudanças no código (commits `bbbbabf` e `1c823bc`)

- **Contêiner GTM trocado** de `GTM-MBDQT8Z7` para `GTM-PCD4K574` em `index.html`,
  `sucesso.html` e `README-DEPLOY.md`.
- **Novo evento `cta_click`** com parâmetro `location` (`topbar`, `hero`,
  `prova_social`, `matematica`, `cta_final`): implementado de forma centralizada na
  função `goForm()` de `src/main.jsx` — os 5 CTAs "Quero..." passam a registrar
  qual botão originou o clique antes de rolar até o formulário. `app.js` rebuildado.
- **Metatag de verificação de domínio do Meta** adicionada ao `<head>` do
  `index.html` (`facebook-domain-verification`).
- `README-DEPLOY.md` atualizado: agora documenta os três sinais do site
  (pageview de `/sucesso`, `whatsapp_click`, `cta_click`).

### Configuração feita nos painéis (fora do código)

- **GTM (`GTM-PCD4K574`)** — criadas e publicadas 3 tags Meta Pixel
  (ID `1732259497966479`): `Meta Pixel - PageView` (All Pages), `Meta — CTA Click`
  e `Meta — WhatsApp Click` (eventos personalizados), + variável `DL - location`.
- **Meta** — domínio `mpconstrucao.com.br` verificado; fluxo completo validado nos
  Eventos de teste (`PageView` → `cta_click` → `Lead`, todos "Processado");
  campanha de Leads iniciada (orientada a: Local da conversão = Site, evento = Lead).

### Decisões importantes (o porquê)

- **`Lead` dispara pelo código, não pelo GTM** (`fbq('track','Lead')` no
  `LpForm.jsx`) → proibido criar tag de Lead no GTM (duplicaria a conversão).
- **`cta_click` ≠ conversão**: é sinal de topo de funil para remarketing; campanhas
  otimizam pelo `Lead`. Se virar conversão personalizada, categoria "Exibição de
  conteúdo"/"Contato", nunca "Lead".
- Descoberto que o deploy é **automático via GitHub → Vercel** (push na `main`
  republica o site em segundos).

### Pendências deixadas

- GA4 (`G-XNM42NM1CX`) e Google Ads (`AW-17258791328`) estavam no contêiner antigo
  e **não foram migrados** — o site ficou sem GA4/tag de Ads. Recriar no contêiner
  novo se necessário.
- `Lead` ainda não tinha aparecido na lista de eventos da Visão geral do dataset
  (atraso normal de indexação; já chegava como "Processado" no teste).
- Campanha de Leads em criação pelo usuário — conferir Local da conversão = "Site"
  antes de publicar.
- Público de remarketing (`cta_click` sem `Lead`) sugerido, não criado.

---

## Antes de 2026-07-08 (histórico do git)

- `2da0192` — Instala GTM (contêiner antigo), rastreamento de conversão e página
  de sucesso (`/sucesso`).
- `c58c620` — Integra formulário ao webhook do Make e adiciona campo de nome.
- `65d259c` — Ajusta texto do hero ("e diversas outras empresas do setor").
- `6f3ffb5` / `da21b87` — Logos YCON, Manu Tintas e IBT Telhas no carrossel do hero.
