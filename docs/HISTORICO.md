# Histórico de Sessões

Diário do que foi feito no projeto, em ordem cronológica inversa (mais recente
primeiro). **Toda sessão que fizer mudança relevante deve adicionar uma entrada aqui**
com data, o que mudou, por quê, e pendências deixadas.

---

## 2026-07-08 (noite) — Validação obrigatória do formulário + investigação do lead vazio

### Validação do formulário (código incluído no commit `c170316`, junto com a rodada 3)

Pedido do usuário: todas as perguntas obrigatórias para enviar o formulário.
Mudanças em `src/components/LpForm.jsx`:

- **WhatsApp agora exige número válido com DDD** (10–11 dígitos, aceita com ou sem
  o prefixo 55) — antes qualquer texto não-vazio passava (ex.: "abc").
- **Erro some na hora** que o usuário corrige o campo (antes só no próximo envio).
- **Rolagem automática até a primeira pergunta pendente** ao bloquear o envio
  (no mobile o erro ficava fora da tela e o formulário parecia travado).
- `aria-required`/`aria-invalid` nos inputs; `id="campo-*"` em cada pergunta.

Obs.: esta sessão e a da rodada 3 de performance rodaram em paralelo; o commit
`c170316` levou as duas mudanças juntas (o bundle `app.js` já saiu com ambas).

**Verificado em produção** (navegador headless): envio vazio bloqueado com os 5
erros visíveis; "abc" e "12345678" rejeitados no WhatsApp; caminho feliz testado
localmente com fetch/fbq/gtag stubados — payload completo com `whatsapp_intl`
normalizado ("5562993887179", sem duplicar o 55), `Lead` e `lead_form_submit`
disparados, redirect para `/sucesso`. Nenhum lead/evento de teste real foi enviado.

### Lead vazio das 18:07 (investigação)

Chegou um registro com todos os campos vazios (Supabase `created_at` 18:07:54
local). Evidências: o Pixel registrou só **1 Lead** na faixa 18h–19h (o teste
manual "pedro/trenheira" das 18:52) — ou seja, o vazio **não veio do formulário**
(a validação, antiga e nova, impede envio vazio; o `fetch` só dispara após passar).
Conclusão: algo chamou a **URL do webhook do Make diretamente** (a URL fica
exposta no `app.js`; qualquer GET/POST dispara o cenário com campos vazios).
Provável bot/scanner (o anúncio foi ao ar hoje — crawler de revisão da Meta é
candidato, mas sem os headers da requisição não dá para atribuir).

**Atualização (mesma noite):** um **segundo disparo vazio** chegou às 19:38 —
confirmando que é recorrente. Providências tomadas (commit `4a997b3`):

- **Token anti-spam no payload**: `token: "mplp-7947819f30e54035"` (constante
  `FORM_TOKEN` em `LpForm.jsx`, enviada junto com o lead). Verificado em produção.
- **Supabase limpo** (a pedido do usuário): removidas as 2 linhas vazias (18:07 e
  19:38) e o teste manual "pedro" das 18:52. Tabela `leads` zerada.
- Confirmado via Pixel (dataset stats) que os disparos vazios **não** geraram
  evento `Lead` — não vieram do formulário.

**Atualização 2 (mesma noite):** URL do webhook **rotacionada** (commit `e9260f8`)
— a antiga (`...jlpu2a7pn...`) estava queimada (2 disparos de bot). Nova:
`hook.us1.make.com/q6yefdvx5a3bgfse6l3aseom6hplw9l2`, criada pelo usuário no Make,
publicada e verificada em produção. Amostra de estrutura (com `token`) enviada ao
webhook novo (aceita, aguardando processamento do cenário).

**Pendências (fazer no painel do Make):**
1. **Filtro após o webhook** (hoje): `nome` *is not empty* E `whatsapp` *is not
   empty* — mata notificações/linhas de lixo.
2. **Endurecer o filtro** (a partir do dia seguinte): adicionar condição
   `token` *equal to* `mplp-7947819f30e54035`. Não exigir o token de imediato:
   o `app.js` tem cache de 1h — visitante com bundle antigo enviaria lead real
   sem token e seria descartado.
3. **Deletar o webhook antigo amanhã** — antes, conferir a fila dele: um lead
   real de visitante com bundle em cache pode ter caído lá (recuperável).
4. Ativar "Get request headers" no webhook para identificar a origem de próximos
   disparos suspeitos.
5. Limpar manualmente do Google Sheets as linhas vazias/teste (sem acesso daqui).
6. Apagar do Supabase a linha "TESTE ESTRUTURA (pode ignorar)" quando o cenário
   processar a amostra.

---

## 2026-07-08 (noite) — Rodada 2 de performance: PageSpeed 42 → alvo 75+ (commit `484ab31`)

**Gatilho:** PageSpeed mobile 42 (LCP 8,4s, TBT 1.460ms) mesmo após a rodada 1.

- **Fontes:** removido `@import` do Google Fonts do `colors_and_type.css` (bloqueava
  a renderização ~2s); agora carregam assíncronas no `<head>` (`media="print"`
  + onload swap + fallback noscript).
- **Ícones:** criado `src/components/Icon.jsx` com os 10 SVGs usados (mesmos
  desenhos Lucide); eliminados o script unpkg de 348 KB e o MutationObserver de
  re-render em `main.jsx` (fonte de TBT/reflow forçado). Nenhum `data-lucide` resta.
- **Cache:** `vercel.json` — assets 30 dias + swr; app.js/css 1h + swr.
  ⚠️ Se substituir um asset mantendo o nome, visitantes recorrentes podem ver a
  versão antiga por até 30 dias — renomeie o arquivo nesses casos.
- **Imagens:** `donos-hero-640.jpg` (60 KB) via srcset para mobile (preload com
  `imagesrcset` casando com o `<img>`); `telhas-coral-whatsapp.jpeg` 168→78 KB.

Verificado em produção. Conferir nota nova no PageSpeed após alguns minutos.

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
