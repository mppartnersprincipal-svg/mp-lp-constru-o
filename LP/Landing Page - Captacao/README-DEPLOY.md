# Como colocar a landing page no ar (Vercel)

Esta pasta é a landing page completa e **pronta para publicar**. Ela já está compilada
(`app.js`), então **não precisa instalar nada** para subir — só fazer o deploy.

---

## 1. Publicar na Vercel

Você tem dois caminhos. O **mais rápido** é o A.

### Caminho A — Pelo terminal (recomendado, sem Git)
Abra o terminal **dentro desta pasta** (`Landing Page - Captacao`) e rode:
```bash
npx vercel --prod
```
- Na primeira vez ele pede para fazer login (abre o navegador — pode usar a conta Google).
- Aceite as respostas padrão apertando Enter (nome do projeto, etc.).
- Ao final, ele mostra o link de produção, tipo `https://seu-projeto.vercel.app`.
  **Está no ar.**

A Vercel já está configurada (no `vercel.json`) para **só servir os arquivos** — não precisa
instalar nem compilar nada na nuvem, porque o `app.js` já vem pronto.

### Caminho B — Pelo site, conectando ao GitHub
1. Suba esta pasta para um repositório no **GitHub**.
2. Em **https://vercel.com → Add New… → Project**, importe esse repositório.
3. Em *Framework Preset*, deixe **Other** e clique em **Deploy**.

> Toda vez que você atualizar os arquivos no GitHub, a Vercel republica sozinha.

---

## 2. Adicionar os arquivos que ainda faltam

A página já funciona sem eles (mostra um espaço reservado elegante), mas o ideal é
colocá-los assim que tiver:

| Arquivo a colocar em `assets/` | Onde aparece | Observação |
|--------------------------------|--------------|------------|
| `assets/donos-hero.jpg`        | Foto do Marcos e Pedro no topo (Hero) | Já existe uma **foto temporária**. Substitua pela foto real (mesmo nome). Formato `.jpg`, vertical (proporção ~4:5). |
| `assets/marcos-metodo.mp4`     | Vídeo "O Marcos explica o método" na seção do método | Enquanto não existir, mostra um botão de play reservado. Vídeo vertical (9:16). |

**Como trocar/adicionar:** basta colocar o arquivo dentro da pasta `assets/` com **exatamente
esse nome** e **publicar de novo** (repita o passo 1). Não precisa rodar nenhum build.

> Dica: se mudou só a foto/vídeo, a versão nova pode levar até 1 dia para aparecer por causa
> do cache do navegador. Para ver na hora, abra em uma aba anônima.

---

## 3. Para onde vão os leads

O formulário **não usa banco de dados**. Quando a pessoa preenche as 5 perguntas e envia,
os dados são mandados para um **webhook do Make** (a automação que avisa os donos), e em
seguida o lead é **redirecionado para a página de sucesso** (`/sucesso`) — que mostra a
confirmação "Parabéns pela sua decisão!". O lead **não** é jogado direto no WhatsApp.

Para trocar o destino do webhook, edite a constante `WEBHOOK_URL` em
`src/components/LpForm.jsx`, depois rode `npm run build`.

---

## 4. Rastreamento / Anúncios (Google Tag Manager)

O **Google Tag Manager** já está instalado no site (contêiner `GTM-PCD4K574`), tanto na
`index.html` quanto na página de sucesso (`sucesso.html`). Todo pixel de anúncio (Meta,
Google Ads, GA4) agora é configurado **dentro do painel do GTM** — não precisa mexer no
código do site.

Três sinais já saem prontos do site para o GTM:

- **Página de sucesso** — quando o lead envia o formulário, ele cai em `/sucesso`. Use um
  gatilho de *Pageview* com "Caminho da Página contém `sucesso`" para disparar sua tag de
  conversão (o evento mais importante: lead gerado).
- **Cliques no WhatsApp** — o botão flutuante e o link do rodapé empurram o evento
  `whatsapp_click` para o `dataLayer` (com o parâmetro `location` = `botao_flutuante` ou
  `rodape`). Use um gatilho de *Evento Personalizado* com nome `whatsapp_click`.
- **Cliques nos CTAs** — os cinco botões "Quero..." empurram o evento `cta_click` para o
  `dataLayer` (com o parâmetro `location` = `topbar`, `hero`, `prova_social`, `matematica`
  ou `cta_final`). Use um gatilho de *Evento Personalizado* com nome `cta_click`. É sinal
  de topo de funil — bom para remarketing; otimize campanhas pelo lead, não por ele.

Também sai um evento `lead_form_submit` no envio do formulário (com `segmento` e `fatura`),
caso queira rastrear a conversão pelo evento em vez do pageview de `/sucesso`.

---

## 5. Domínio próprio (opcional)

No painel da Vercel: **Project → Settings → Domains → Add**. Aponte o seu domínio
(ex.: `lp.suaempresa.com.br`) conforme as instruções de DNS que a Vercel mostra.

---

## Editar a página (para quem mexe no código)

O código-fonte fica em `src/`. Depois de editar, recompile:
```bash
npm install   # só na primeira vez
npm run build # gera o app.js E o HTML pré-renderizado dentro do index.html
```
O `npm run build` faz **duas** coisas (desde 2026-07-11):

1. `build:app` — esbuild compila `src/main.jsx` → `app.js` (bundle commitado).
2. `build:html` — renderiza o `<App />` no Node (`src/prerender-entry.jsx`) e injeta
   o HTML estático dentro do `<div id="root">` do `index.html`, entre os marcadores
   `<!-- prerender:start -->` / `<!-- prerender:end -->`. É isso que faz o hero
   pintar sem esperar o JavaScript (LCP baixo). **Nunca edite o conteúdo do `#root`
   à mão** — ele é sobrescrito a cada build. Commite o `index.html` junto com o
   `app.js`.

As fontes (Montserrat/Inter) são **self-hosted** em `assets/fonts/` (woff2 variáveis,
`@font-face` no `colors_and_type.css`) — o site não depende mais do Google Fonts.

Para testar localmente antes de publicar:
```bash
npm run serve   # abre em http://localhost:5050
```
