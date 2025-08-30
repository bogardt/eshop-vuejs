<!-- shop-web/src/pages/ProductPage.vue -->
<template>
  <div v-if="product">
    <div class="row">
      <div class="col-md-6">
        <img v-if="product.images?.[0]" :src="product.images[0]" class="img-fluid rounded border" />
      </div>
      <div class="col-md-6">
        <h3>{{ product.title }}</h3>
        <p class="text-muted">
          {{ product.category?.name }}
          <span v-if="product.subcategory">/ {{ product.subcategory?.name }}</span>
        </p>
        <h4 class="text-primary">{{ product.price.toFixed(2) }} €</h4>
        <p class="mt-3">{{ product.description }}</p>

        <div class="d-flex align-items-center">
          <div class="input-group me-2" style="width: 140px;">
            <button class="btn btn-outline-secondary" @click="qty = Math.max(1, qty - 1)">-</button>
            <input class="form-control text-center" type="number" v-model.number="qty" min="1" />
            <button class="btn btn-outline-secondary" @click="qty++">+</button>
          </div>
          <button class="btn btn-success" @click="addToCart()">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading…</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "../services/api";
import { useCart } from "../stores/cart";

const route = useRoute();
const cart = useCart();
const product = ref(null);
const qty = ref(1);

async function fetchProduct() {
  product.value = await api.getProduct(route.params.slug);
}
function addToCart() { cart.add(product.value, qty.value); }

onMounted(fetchProduct);
</script>
