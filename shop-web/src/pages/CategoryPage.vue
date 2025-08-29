<template>
  <div>
    <h5 class="mb-3 text-capitalize">{{ categorySlug.replace('-', ' ') }}</h5>
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
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import api from "../services/api";
import ProductCard from "../components/ProductCard.vue";

const route = useRoute();
const products = ref([]);
const page = ref(1);
const pages = ref(1);

const categorySlug = ref(route.params.categorySlug);

async function fetchProducts() {
  const cats = await api.getCategories();
  const cat = cats.find(c => c.slug === categorySlug.value);
  if (!cat) { products.value = []; pages.value = 1; return; }
  const res = await api.listProducts({ category: cat._id, page: page.value, limit: 12 });
  products.value = res.items; pages.value = res.pages;
}

onMounted(fetchProducts);
watch(() => route.params.categorySlug, (nv) => { categorySlug.value = nv; page.value = 1; fetchProducts(); });
</script>
