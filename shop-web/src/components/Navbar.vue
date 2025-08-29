<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom">
    <div class="container">
      <a class="navbar-brand fw-bold" href="/">MyShop</a>
      <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="nav" class="collapse navbar-collapse">
        <form class="d-flex ms-auto" @submit.prevent="$emit('search', q)">
          <input v-model="q" class="form-control me-2" type="search" placeholder="Rechercher..." />
          <button class="btn btn-outline-primary" type="submit">
            <i class="bi bi-search"></i>
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
const q = ref("");
</script>
