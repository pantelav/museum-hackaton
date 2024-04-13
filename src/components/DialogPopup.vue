<template>
  <q-dialog v-model="model">
    <DialogCard />
  </q-dialog>
</template>

<script setup lang="ts">
import SimilarCard from './SimilarCard.vue'
import DialogCard from './DialogCard.vue'

const model = defineModel({ default: false })
</script>

<style scoped lang="scss"></style>
