import { CONFIG } from "./config";
export const demo = !CONFIG.sheetUrl;
const key = (k) => "diwali:demo:" + k;
const read = (k) => {
  try {
    return JSON.parse(localStorage.getItem(key(k)) || "[]");
  } catch {
    return [];
  }
};

export const api = {
  
  async list(kind) {
    if (demo) return read(kind);
    const r = await fetch(`${CONFIG.sheetUrl}?kind=${kind}&t=${Date.now()}`);
    const j = await r.json();
    return j.ok ? j.rows : [];
  },

  async add(kind, row) {
    if (demo) {
      localStorage.setItem(key(kind), JSON.stringify([...read(kind), row]));
      return;
    }
    // text/plain body avoids a CORS preflight, which Apps Script doesn’t answer
    await fetch(CONFIG.sheetUrl, {
      method: "POST",
      body: JSON.stringify({ kind, row }),
    });
  },
  
  async search(term) {
    const u = demo
      ? `https://itunes.apple.com/search?media=music&entity=song&limit=8&country=${CONFIG.storeCountry}&term=${encodeURIComponent(term)}`
      : `${CONFIG.sheetUrl}?kind=search&country=${CONFIG.storeCountry}&term=${encodeURIComponent(term)}`;
    const r = await fetch(u);
    return (await r.json()).results || [];
  },
};
export const wa = (text) =>
  `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(text)}`;
export const img = (n) => `${import.meta.env.BASE_URL}stickers/${n}`;
