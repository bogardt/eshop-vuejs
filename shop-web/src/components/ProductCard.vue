<template>
  <div class="card h-100">
    <img v-if="product.images?.[0]" :src="product.images[0]" class="card-img-top" alt="" />
    <div class="card-body d-flex flex-column">
      <h6 class="card-title flex-grow-1">{{ product.title }}</h6>
      <div class="d-flex align-items-center justify-content-between">
        <span class="fw-bold">{{ product.price.toFixed(2) }} €</span>
        <a :href="`/p/${product.slug}`" class="btn btn-sm btn-primary">Voir</a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ product: { type: Object, required: true } });
</script>
