const URL_BASE = 'https://db.ygoprodeck.com/api/v7';

export async function fetchAllCards() {
  const res = await fetch(`${URL_BASE}/cardinfo.php`);
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  const payload = await res.json();
  return payload.data;
}

export async function fetchCardsByName(name, signal) { 
  try {
    const res = await fetch(`${URL_BASE}/cardinfo.php?fname=${encodeURIComponent(name)}`, {
      signal
    });
    if (!res.ok) {
      if (res.status === 400) {
        return [];
      }     
      try {
        const errorData = await res.json();
        throw new Error(errorData.error || `Erro ${res.status}`);
      } catch {
        throw new Error(`Erro na busca: ${res.statusText}`);
      }
    }
    const payload = await res.json();
    return payload.data || [];
  } catch (err) {
    if (err.name === 'AbortError') {
      throw err;
    }   
    if (err.message.includes("No card matching")) {
      return [];
    }   
    throw new Error(err.message || 'Erro na pesquisa');
  }
}