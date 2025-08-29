import { defineStore } from "pinia";

export const useCart = defineStore("cart", {
  state: () => ({ items: [] }),
  getters: {
    count: (s) => s.items.reduce((a, i) => a + i.qty, 0),
    total: (s) => s.items.reduce((a, i) => a + i.product.price * i.qty, 0)
  },
  actions: {
    add(product, qty = 1) {
      const idx = this.items.findIndex(i => i.product.slug === product.slug);
      if (idx >= 0) this.items[idx].qty += qty;
      else this.items.push({ product, qty });
    },
    remove(slug) { this.items = this.items.filter(i => i.product.slug !== slug); },
    clear() { this.items = []; }
  }
});
