<template>
  <div class="list-group">
    <a v-for="cat in categories" :key="cat._id"
       class="list-group-item list-group-item-action"
       :href="`/c/${cat.slug}`">
      {{ cat.name }}
    </a>
  </div>
</template>

<script setup>
defineProps({ categories: { type: Array, default: () => [] } });
</script>
