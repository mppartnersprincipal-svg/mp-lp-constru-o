// Helper de chamada às rotas /api com a senha do dashboard no header.
const KEY = "mp_dashboard_password";

export const getPassword = () => localStorage.getItem(KEY) || "";
export const setPassword = (p) => localStorage.setItem(KEY, p);
export const clearPassword = () => localStorage.removeItem(KEY);

export async function apiGet(path, days) {
  const res = await fetch(`${path}?days=${days}`, {
    headers: { Authorization: `Bearer ${getPassword()}` },
  });
  if (res.status === 401) {
    clearPassword();
    throw new Error("unauthorized");
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Erro ${res.status}`);
  return data;
}
