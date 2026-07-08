# Histórico de Sessões

Diário do que foi feito no projeto, em ordem cronológica inversa (mais recente
primeiro). **Toda sessão que fizer mudança relevante deve adicionar uma entrada aqui**
com data, o que mudou, por quê, e pendências deixadas.

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
