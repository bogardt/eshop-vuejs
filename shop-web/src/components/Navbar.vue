<!-- shop-web/src/components/Navbar.vue -->
<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom">
    <div class="container">
      <a class="navbar-brand fw-bold" href="/">MyShop</a>
      <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="nav" class="collapse navbar-collapse">
        <form class="d-flex ms-auto me-3" @submit.prevent="$emit('search', q)">
          <input v-model="q" class="form-control me-2" type="search" placeholder="Rechercher..." />
          <button class="btn btn-outline-primary" type="submit">
            <i class="bi bi-search"></i>
          </button>
        </form>

        <a href="/cart" class="btn btn-outline-dark position-relative">
          <i class="bi bi-cart"></i> Cart
          <span
            v-if="count > 0"
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {{ count }}
          </span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCart } from "../stores/cart";
const q = ref("");
const cart = useCart();
const count = computed(() => cart.count);
</script>
