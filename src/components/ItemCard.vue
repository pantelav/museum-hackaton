<template>
  <q-card class="w-[300px] h-[450px] overflow-hidden text-ellipsis">
    <q-img
      class="w-[300px] h-[200px] object-contain"
      :src="config.getImageSrc(props.data.id)"
    />

    <q-card-section>
      <q-btn
        round
        color="primary"
        icon="search"
        size="md"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
        @click="findSimilar"
        title="Найти похожие"
        :loading="isLoading"
      />
      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">{{ props.data.name }}</div>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">Артикул: {{ props.data.exh_id }}</div>
      <div class="text-caption text-grey">
        {{ props.data.description }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { config } from 'src/config'
import { useRouter } from 'vue-router'
import { useItemStore } from 'src/stores/items'
import { findSimilarById } from 'src/api'
import type { IReqItem } from '../types/items'
const props = defineProps<{ data: IReqItem }>()
const router = useRouter()
const itemStore = useItemStore()
const isLoading = ref(false)

async function findSimilar() {
  isLoading.value = true
  itemStore.setTarget(props.data)
  const data = await findSimilarById(props.data.id)
  if (!data) {
    isLoading.value = false
    return
  }
  itemStore.searchingItem = data
  router.push('/result')
}
</script>

<style scoped lang="scss"></style>
