const URL_BASE = 'https://db.ygoprodeck.com/api/v7';

export async function fetchAllCards() {
  const res = await fetch(`${URL_BASE}/cardinfo.php`);
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  const payload = await res.json();
  return payload.data;
}

export async function fetchCardsByName(name, signal) {
  try {
    const res = await fetch(
      `${URL_BASE}/cardinfo.php?fname=${encodeURIComponent(name)}`,
      { signal }
    );
    if (!res.ok) {
      if (res.status === 400) return [];
      try {
        const errJson = await res.json();
        throw new Error(errJson.error || `Erro ${res.status}`);
      } catch {
        throw new Error(`Erro na busca: ${res.statusText}`);
      }
    }
    const payload = await res.json();
    return payload.data || [];
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    if (err.message.includes('No card matching')) return [];
    throw new Error(err.message || 'Erro na pesquisa');
  }
}

export async function fetchAllCardTypes() {
  const cards = await fetchAllCards();
  const types = Array.from(new Set(cards.map(c => c.type)));
  return types.sort();
}

export async function fetchCardsByFilters({ type = '', name = '' } = {}, signal) {
  const params = new URLSearchParams();
  if (type) params.append('type', type);
  if (name) params.append('fname', encodeURIComponent(name));

  const url = `${URL_BASE}/cardinfo.php${params.toString() ? '?' + params.toString() : ''}`;
  const res = await fetch(url, { signal });
  if (!res.ok) {
    if (res.status === 400) return [];
    throw new Error(`Erro na busca (${res.status})`);
  }
  const { data = [] } = await res.json();
  return data;
}
