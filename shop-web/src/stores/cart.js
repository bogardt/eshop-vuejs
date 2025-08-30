// shop-web/src/stores/cart.js
import { defineStore } from "pinia";

const STORAGE_KEY = "cart:v1";

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.items)) return { items: [] };
    return parsed;
  } catch {
    return { items: [] };
  }
}

function save(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }));
}

export const useCart = defineStore("cart", {
  state: () => load(), // [{ product: {...}, qty }]
  getters: {
    count: (s) => s.items.reduce((a, i) => a + i.qty, 0),
    subtotal: (s) => s.items.reduce((a, i) => a + i.product.price * i.qty, 0),
    // Exemple TVA 20% optionnelle
    vat: (s) => s.items.reduce((a, i) => a + i.product.price * i.qty * 0.2, 0),
    total() {
      return this.subtotal; // ajuste si tu ajoutes VAT/fees: this.subtotal + this.vat
    },
  },
  actions: {
    _persist() { save(this.$state); },

    add(product, qty = 1) {
      const idx = this.items.findIndex((i) => i.product.slug === product.slug);
      if (idx >= 0) this.items[idx].qty += qty;
      else this.items.push({ product, qty });
      this._persist();
    },

    setQty(slug, qty) {
      qty = Math.max(1, parseInt(qty || "1", 10));
      const item = this.items.find((i) => i.product.slug === slug);
      if (!item) return;
      item.qty = qty;
      this._persist();
    },

    increment(slug) {
      const item = this.items.find((i) => i.product.slug === slug);
      if (!item) return;
      item.qty += 1;
      this._persist();
    },

    decrement(slug) {
      const item = this.items.find((i) => i.product.slug === slug);
      if (!item) return;
      item.qty = Math.max(1, item.qty - 1);
      this._persist();
    },

    remove(slug) {
      this.items = this.items.filter((i) => i.product.slug !== slug);
      this._persist();
    },

    clear() {
      this.items = [];
      this._persist();
    },
  },
});
