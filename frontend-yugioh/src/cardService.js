const URL_BASE = 'https://db.ygoprodeck.com/api/v7';

export async function fetchAllCards() {
  const res = await fetch(`${URL_BASE}/cardinfo.php`);
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  const payload = await res.json();
  return payload.data;
}
