# Rastreamento — Fonte da Verdade

Toda a stack de tracking da LP: GTM, Meta Pixel, eventos e configuração de campanha.
Atualize este arquivo sempre que o tracking mudar.

_Última atualização: 2026-07-08_

## IDs e contas

| Item | Valor |
|---|---|
| Contêiner GTM ativo | `GTM-PCD4K574` |
| Contêiner GTM antigo (desativado) | `GTM-MBDQT8Z7` |
| Meta Pixel | **Pixel LP Construção** — ID `1732259497966479` |
| Business Manager | M|P Assessoria (264321…) |
| Domínio verificado no Meta | `mpconstrucao.com.br` (metatag no `<head>` do `index.html`) |
| GA4 (não migrado — pendência) | `G-XNM42NM1CX` |
| Google Ads (não migrado — pendência) | `AW-17258791328` |

## Eventos do dataLayer (disparados pelo código do site)

Todos via `pushEvent()` de `src/track.js`:

| Evento | Parâmetros | Quando dispara | Onde no código |
|---|---|---|---|
| `lead_form_submit` | `segmento`, `fatura` | Formulário validado e enviado ao webhook | `src/components/LpForm.jsx` |
| `cta_click` | `location`: `topbar`, `hero`, `prova_social`, `matematica`, `cta_final` | Clique em qualquer CTA "Quero..." (rola até o formulário) | `src/main.jsx` (função `goForm`) |
| `whatsapp_click` | `location`: `botao_flutuante`, `rodape` | Clique no botão flutuante ou link do rodapé | `src/main.jsx` e `src/components/LpResults.jsx` |

## Disparos diretos no código (NÃO passam pelo GTM)

No envio do formulário (`src/components/LpForm.jsx`), além do `lead_form_submit`:

- `window.fbq('track', 'Lead')` — evento padrão **Lead** do Meta Pixel.
- `window.gtag('event', 'conversion')` — conversão do Google Ads (inativo enquanto
  o gtag não existir na página; ver pendência GA4/Ads abaixo).

⚠️ **Regra anti-duplicação:** por causa do `fbq` direto, NÃO deve existir tag de
`Lead` no GTM. O `Lead` também não aparece como tag disparada no debug do GTM —
para testá-lo, use a aba "Testar eventos" do Gerenciador de Eventos do Meta.

## Tags publicadas no painel do GTM (contêiner GTM-PCD4K574)

| Tag | Tipo | O que envia | Acionador |
|---|---|---|---|
| Meta Pixel - PageView | Meta Pixel (galeria) | Standard `PageView` | All Pages |
| Meta — CTA Click | Meta Pixel | Custom `cta_click` (+ `location`) | Evento personalizado `cta_click` |
| Meta — WhatsApp Click | Meta Pixel | Custom `whatsapp_click` (+ `location`) | Evento personalizado `whatsapp_click` |
| GA4 — Base | Tag do Google | Config GA4 `G-W59B5D77T3` (pageviews automáticos) | Initialization - All Pages |
| GA4 — Eventos | Google Analytics: evento do GA4 | `{{Event}}` + parâmetros `location`, `segmento`, `fatura` | Evento personalizado (regex) `^(cta_click\|whatsapp_click\|lead_form_submit)$` |

Variáveis definidas pelo usuário (todas "Variável da camada de dados"):
**`DL - location`**, **`DL - segmento`**, **`DL - fatura`**.

Config das tags Meta Pixel: Pixel ID `1732259497966479`, Consent Granted (GDPR) = True.

GA4 instalado e coletando desde 2026-07-08 (validado no Tempo real). Dimensões
personalizadas criadas na propriedade (escopo Evento): `location`, `segmento`, `fatura`.

## Setup no Meta (Gerenciador de Eventos / Anúncios)

- Domínio `mpconstrucao.com.br` **verificado** via metatag
  (`029gctpncy3rs2b2oxrbp5wjoqyswn`, no `<head>` do `index.html`).
- Fluxo testado e validado em 2026-07-08: `PageView` → `cta_click` → `Lead`
  chegando como "Processado" nos Eventos de teste.
- Eventos `SubscribedButtonClick` que aparecem no pixel = rastreamento automático
  de botões do Meta. Normais, podem ser ignorados.

### Diretrizes de campanha

- **Local da conversão: "Site"** (não usar "Formulários no site e instantâneos" —
  o formulário instantâneo desviaria o lead do funil LP → Make → /sucesso).
- **Evento de conversão da campanha: `Lead`** (evento padrão; conta e otimiza por
  envio real de formulário).
- `cta_click` = sinal de topo de funil. Usar para público personalizado de
  remarketing (ex.: disparou `cta_click` e não disparou `Lead`) ou conversão
  personalizada com categoria "Exibição de conteúdo"/"Contato" — **nunca** categoria
  Lead e nunca como evento de otimização da campanha.
- Aviso "Configurar evento de conversão" no conjunto de anúncios é orientativo
  (aparece enquanto o `Lead` não indexa na lista de eventos do dataset) — não
  bloqueia a publicação da campanha.

## Como testar o tracking

1. **GTM:** modo Visualizar (Tag Assistant) → conferir tags disparadas e o
   `location` na aba Camada de dados.
2. **Meta:** Gerenciador de Eventos → pixel → "Testar eventos" → navegar no site,
   clicar CTAs e enviar formulário de teste. Esperado: `PageView`, `cta_click`,
   `whatsapp_click` e `Lead` como "Processado".
3. **Produção:** conferir contêiner servido:
   `(Invoke-WebRequest https://www.mpconstrucao.com.br/).Content | Select-String "GTM-"`

## Dashboard de métricas (em construção — ver HISTORICO.md)

Infraestrutura de dados do dashboard próprio (hospedagem futura: Vercel):

| Item | Valor |
|---|---|
| GA4 da LP (propriedade nova, dedicada) | **`G-W59B5D77T3`** — propriedade "LP Construção" (ID `544749733`), fluxo `15222467490` |
| Conta de serviço Google (leitura GA4) | `dashboard-ga4@mp-dashboard-501816.iam.gserviceaccount.com` (papel Leitor na propriedade) |
| Usuário de sistema Meta (leitura Ads) | `dashboard-lp` (app "MP Dashboard", perms `ads_read` + `read_insights`) |
| GA4 do site institucional (NÃO usar na LP) | `G-XNM42NM1CX` → mppartners.com.br |
| Conta de anúncio Meta (fonte do dashboard) | **`act_2643219305863486`** — "M|P - Assessoria" (Business: Marcos Goulart) |
| Campanha da LP | `120250865648840153` — "[M\|P] [LP] [LEAD] [FRIO] [CONSTRUÇÃO] [JULHO]" (ativa desde 2026-07-08) |
| Supabase — projeto | `mp-lp-construcao`, ref `tjtvtvlymissdebyiuko`, região `sa-east-1` |
| Supabase — URL da API | `https://tjtvtvlymissdebyiuko.supabase.co` |
| Supabase — chave publishable (só INSERT via RLS) | `sb_publishable_9Iu7Y1bLEup3X-CktzA0gA_U8GVFKy4` |
| Tabela de leads | `public.leads` (nome, whatsapp, segmento, fatura, origem, created_at) |

RLS da tabela `leads`: `anon` só insere (é a chave que o Make usa); leitura exige
service role (server-side do dashboard). Os leads são gravados pelo **Make** (módulo
HTTP após a notificação), não pelo site.

## Pendências conhecidas

- [x] ~~GA4 não migrado~~ → **Resolvido em 2026-07-08**: criada propriedade GA4
  dedicada da LP (`G-W59B5D77T3`) e instalada via GTM. O `G-XNM42NM1CX` era do site
  institucional (mppartners.com.br) e nunca deveria ter estado na LP.
- [ ] **Google Ads não migrado:** a tag `AW-17258791328` existia no contêiner antigo
  e sumiu do site na troca. Recriar dentro do `GTM-PCD4K574` se campanhas de
  Google Ads voltarem a rodar para a LP.
- [ ] Conversão personalizada do `cta_click` no Meta ainda não criada (aguardava
  indexação do evento; opcional — público personalizado cobre o caso de remarketing).
- [ ] Público personalizado de remarketing (`cta_click` sem `Lead`) ainda não criado.
