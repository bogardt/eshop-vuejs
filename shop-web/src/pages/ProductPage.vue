<template>
  <div v-if="product">
    <div class="row">
      <div class="col-md-6">
        <img v-if="product.images?.[0]" :src="product.images[0]" class="img-fluid rounded border" />
      </div>
      <div class="col-md-6">
        <h3>{{ product.title }}</h3>
        <p class="text-muted">{{ product.category?.name }} <span v-if="product.subcategory">/ {{ product.subcategory?.name }}</span></p>
        <h4 class="text-primary">{{ product.price.toFixed(2) }} €</h4>
        <p class="mt-3">{{ product.description }}</p>
        <button class="btn btn-success" @click="addToCart()">Ajouter au panier</button>
      </div>
    </div>
  </div>
  <div v-else>Chargement…</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "../services/api";
import { useCart } from "../stores/cart";

const route = useRoute();
const cart = useCart();
const product = ref(null);

async function fetchProduct() {
  product.value = await api.getProduct(route.params.slug);
}
function addToCart() { cart.add(product.value, 1); }

onMounted(fetchProduct);
</script>
