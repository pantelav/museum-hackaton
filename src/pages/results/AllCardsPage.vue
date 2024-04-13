<template>
  <div class="grid-container">
    <similar-card
      v-for="item in itemStore.searchingItem?.similar"
      :key="item.id"
      :data="item"
      class="card"
    />
  </div>
</template>

<script setup lang="ts">
import SimilarCard from '/src/components/SimilarCard.vue'
import { useItemStore } from 'src/stores/items'
const itemStore = useItemStore()
</script>

<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 450px);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  flex-wrap: nowrap;
}
@media screen and (max-width: 1550px) {
  .grid-container {
    grid-template-columns: repeat(1, 1fr);
    .card {
      width: 100% !important;
    }
  }
}
@media screen and (max-width: 1050px) {
}
@media screen and (max-width: 680px) {
}
</style>
