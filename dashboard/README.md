# Dashboard — LP Construção

Painel de métricas da LP (Meta Ads + GA4 + leads do Supabase), protegido por senha.
React (Vite) + funções serverless da Vercel. Nenhum segredo vai para o navegador:
o frontend fala só com `/api/*`, que roda no servidor.

## Rotas da API (todas exigem `Authorization: Bearer <DASHBOARD_PASSWORD>`)

| Rota | Fonte | Retorna |
|---|---|---|
| `/api/meta?days=N` | Meta Marketing API | gasto/impressões/cliques/leads: totais, série diária e por campanha |
| `/api/ga4?days=N` | GA4 Data API | sessões, eventos (`cta_click`, `whatsapp_click`, `lead_form_submit`), quebra por `location` |
| `/api/leads?days=N` | Supabase (service role) | total, por segmento/fatura/dia e últimos leads |

## Variáveis de ambiente (Vercel → Settings → Environment Variables)

| Variável | O que é |
|---|---|
| `META_ACCESS_TOKEN` | Token do usuário de sistema `dashboard-lp` (ads_read, read_insights) |
| `META_AD_ACCOUNT_ID` | `act_2643219305863486` |
| `GA4_PROPERTY_ID` | ID numérico da propriedade "LP Construção" |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Conteúdo integral do JSON da conta de serviço `dashboard-ga4@...` |
| `SUPABASE_URL` | `https://tjtvtvlymissdebyiuko.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave secreta do projeto (Settings → API Keys) — leitura dos leads |
| `DASHBOARD_PASSWORD` | Senha de acesso ao painel |

Local: os mesmos valores em `dashboard/.env.local` (gitignored). O cliente GA4 também
aceita o arquivo `dashboard/ga4.credentials.json` como fallback local do JSON.

## Desenvolvimento e deploy

- `npm install` e `npm run build` dentro de `dashboard/`.
- Deploy: projeto próprio na Vercel apontando para este repositório com
  **Root Directory = `dashboard`** (Framework: Vite). Push na `main` republica.
