// Presets de período espelhando o Gerenciador de Anúncios do Meta.
// Regras iguais às da API do Meta (date_preset): "Últimos N dias" NÃO inclui
// hoje (termina ontem); a semana começa no domingo. Datas no fuso de Brasília.

// Primeiro dia com dados do projeto (campanha/GA4/leads começaram em jul/2026).
// Usado no preset "Máximo" — ajustar se a conta ganhar histórico anterior.
export const DATA_START = "2026-07-01";

const TZ = "America/Sao_Paulo";

// Hoje (YYYY-MM-DD) no fuso de Brasília.
export const todayYMD = () =>
  new Date().toLocaleDateString("sv-SE", { timeZone: TZ });

// Aritmética sobre strings YYYY-MM-DD (meio-dia UTC evita deslizes de fuso).
const toDate = (ymd) => new Date(ymd + "T12:00:00Z");
const fmt = (d) => d.toISOString().slice(0, 10);
const addDays = (ymd, n) => {
  const d = toDate(ymd);
  d.setUTCDate(d.getUTCDate() + n);
  return fmt(d);
};
const weekday = (ymd) => toDate(ymd).getUTCDay(); // 0 = domingo

export const PRESETS = [
  { id: "maximum", label: "Máximo" },
  { id: "today", label: "Hoje" },
  { id: "yesterday", label: "Ontem" },
  { id: "last_7d", label: "Últimos 7 dias" },
  { id: "last_14d", label: "Últimos 14 dias" },
  { id: "last_28d", label: "Últimos 28 dias" },
  { id: "last_30d", label: "Últimos 30 dias" },
  { id: "this_week", label: "Esta semana" },
  { id: "last_week", label: "Semana passada" },
  { id: "this_month", label: "Este mês" },
  { id: "last_month", label: "Mês passado" },
];

// Converte um preset em {since, until}. Para "custom", usa o intervalo escolhido.
export function resolvePeriod(preset, custom) {
  const today = todayYMD();
  const yesterday = addDays(today, -1);
  switch (preset) {
    case "maximum":
      return { since: DATA_START, until: today };
    case "today":
      return { since: today, until: today };
    case "yesterday":
      return { since: yesterday, until: yesterday };
    case "last_14d":
      return { since: addDays(yesterday, -13), until: yesterday };
    case "last_28d":
      return { since: addDays(yesterday, -27), until: yesterday };
    case "last_30d":
      return { since: addDays(yesterday, -29), until: yesterday };
    case "this_week":
      return { since: addDays(today, -weekday(today)), until: today };
    case "last_week": {
      const start = addDays(today, -weekday(today) - 7);
      return { since: start, until: addDays(start, 6) };
    }
    case "this_month":
      return { since: today.slice(0, 8) + "01", until: today };
    case "last_month": {
      const lastDay = addDays(today.slice(0, 8) + "01", -1);
      return { since: lastDay.slice(0, 8) + "01", until: lastDay };
    }
    case "custom": {
      let { since, until } = custom || {};
      if (!since || !until) return { since: addDays(yesterday, -6), until: yesterday };
      if (since > until) [since, until] = [until, since];
      return { since, until: until > today ? today : until };
    }
    case "last_7d":
    default:
      return { since: addDays(yesterday, -6), until: yesterday };
  }
}
