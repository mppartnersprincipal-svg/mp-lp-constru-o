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

O formulário **não usa banco de dados**. Quando a pessoa preenche as 4 perguntas e envia,
abre o **WhatsApp dos donos** (`55 62 99388-7179`) já com a mensagem preenchida:

```
Empresa: ...
Segmento: ...
Fatura acima de R$ 50 mil/mês: ...
WhatsApp: ...
```

Para trocar o número, edite a constante `WHATSAPP` em `src/components/LpForm.jsx`
(e também o link do botão flutuante em `src/main.jsx`), depois rode `npm run build`.

---

## 4. Pixel / Anúncios (recomendado antes de rodar tráfego)

Como essa página vai receber tráfego pago, vale instalar o **Meta Pixel** e/ou a **Google
Tag**. No arquivo `index.html` já existe um espaço marcado:

```html
<!-- PIXEL / ANALYTICS — cole aqui quando tiver os IDs -->
```

Cole o código do pixel ali dentro do `<head>` e publique de novo.

---

## 5. Domínio próprio (opcional)

No painel da Vercel: **Project → Settings → Domains → Add**. Aponte o seu domínio
(ex.: `lp.suaempresa.com.br`) conforme as instruções de DNS que a Vercel mostra.

---

## Editar a página (para quem mexe no código)

O código-fonte fica em `src/`. Depois de editar, recompile:
```bash
npm install   # só na primeira vez
npm run build # gera o app.js atualizado
```
Para testar localmente antes de publicar:
```bash
npm run serve   # abre em http://localhost:5050
```
