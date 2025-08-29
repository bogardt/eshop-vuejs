<template>
  <div class="row">
    <div class="col-12 col-lg-3 mb-3">
      <CategorySidebar :categories="categories" />
    </div>
    <div class="col-12 col-lg-9">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-0">Nouveaux produits</h5>
        <select v-model="sort" class="form-select w-auto" @change="fetchProducts()">
          <option value="">Tri: récent</option>
          <option value="price_asc">Prix ↑</option>
          <option value="price_desc">Prix ↓</option>
        </select>
      </div>

      <div class="row g-3">
        <div v-for="p in products" :key="p._id" class="col-6 col-md-4 col-xl-3">
          <ProductCard :product="p" />
        </div>
      </div>

      <nav class="mt-3">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: page===1 }">
            <button class="page-link" @click="page--; fetchProducts()">Précédent</button>
          </li>
          <li class="page-item disabled"><span class="page-link">{{ page }} / {{ pages }}</span></li>
          <li class="page-item" :class="{ disabled: page===pages }">
            <button class="page-link" @click="page++; fetchProducts()">Suivant</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";
import CategorySidebar from "../components/CategorySidebar.vue";
import ProductCard from "../components/ProductCard.vue";

const categories = ref([]);
const products = ref([]);
const page = ref(1);
const pages = ref(1);
const sort = ref("");

async function fetchCategories() {
  categories.value = await api.getCategories();
}

async function fetchProducts() {
  const res = await api.listProducts({ page: page.value, limit: 12, sort: sort.value });
  products.value = res.items;
  pages.value = res.pages;
}

onMounted(() => {
  fetchCategories();
  fetchProducts();
});
</script>
