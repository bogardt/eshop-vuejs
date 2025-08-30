// shop-web/src/router.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import CategoryPage from "./pages/CategoryPage.vue";
import ProductPage from "./pages/ProductPage.vue";
import CartPage from "./pages/CartPage.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/c/:categorySlug/:subcategorySlug?", name: "category", component: CategoryPage, props: true },
    { path: "/p/:slug", name: "product", component: ProductPage, props: true },
    { path: "/cart", name: "cart", component: CartPage }
  ],
  scrollBehavior() { return { top: 0 }; }
});
