// Cliente mínimo da GA4 Data API usando conta de serviço, sem dependências:
// assina o JWT com o crypto nativo e troca por um access token OAuth.
import crypto from "node:crypto";
import fs from "node:fs";

let cached = { token: null, exp: 0 };

function loadCreds() {
  // Em produção (Vercel): JSON inteiro na env GOOGLE_SERVICE_ACCOUNT_JSON.
  // Local: fallback para o arquivo ga4.credentials.json (ignorado pelo git).
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  }
  const localPath = new URL("../../ga4.credentials.json", import.meta.url);
  return JSON.parse(fs.readFileSync(localPath, "utf8"));
}

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  if (cached.token && now < cached.exp - 60) return cached.token;

  const creds = loadCreds();
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const input =
    b64({ alg: "RS256", typ: "JWT" }) +
    "." +
    b64({
      iss: creds.client_email,
      scope: "https://www.googleapis.com/auth/analytics.readonly",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    });
  const sig = crypto.createSign("RSA-SHA256").update(input).sign(creds.private_key, "base64url");

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body:
      "grant_type=" +
      encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer") +
      "&assertion=" +
      input +
      "." +
      sig,
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("Falha na autenticação GA4: " + JSON.stringify(data));
  cached = { token: data.access_token, exp: now + (data.expires_in || 3600) };
  return cached.token;
}

// Executa um runReport na propriedade configurada.
export async function runReport(body) {
  const property = process.env.GA4_PROPERTY_ID;
  if (!property) throw new Error("GA4_PROPERTY_ID não configurado");
  const token = await getAccessToken();
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${property}:runReport`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  if (data.error) throw new Error("GA4 runReport: " + JSON.stringify(data.error));
  return data;
}

// Converte a resposta do runReport em array de objetos simples.
export function rowsToObjects(report) {
  const dims = (report.dimensionHeaders || []).map((d) => d.name);
  const mets = (report.metricHeaders || []).map((m) => m.name);
  return (report.rows || []).map((row) => {
    const o = {};
    dims.forEach((name, i) => (o[name] = row.dimensionValues[i].value));
    mets.forEach((name, i) => (o[name] = Number(row.metricValues[i].value)));
    return o;
  });
}
