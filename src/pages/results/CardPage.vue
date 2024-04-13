<template>
  <q-circular-progress
    indeterminate
    rounded
    size="50px"
    color="primary"
    class="q-ma-md"
    v-if="isLoading"
  />
  <div
    class="w-full relative p-5 flex flex-nowrap gap-5 items-center bg-white"
    v-else
  >
    <RouterLink to="/result" class="absolute top-3 text-3xl">
      <q-icon name="arrow_back" />
    </RouterLink>
    <q-btn
      round
      color="primary"
      icon="search"
      size="md"
      class="absolute top-5 right-3"
      @click="findSimilar"
      title="Найти похожие"
      :loading="findLoading"
    />
    <img
      :src="config.getImageSrc(itemInfo?.id || '')"
      alt="item"
      class="basis-1/2 object-contain max-w-[500px]"
    />
    <div>
      <div class="flex justify-between items-center mb-3">
        <p class="text-h5 q-mt-sm q-mb-xs">{{ itemInfo?.name }}</p>
        <p class="text-lg">Класс: {{ itemInfo?.type_id }}</p>
      </div>
      <p class="text-justify">
        {{ itemInfo?.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { findById, findSimilarById } from 'src/api'
import { IReqItem } from 'src/types/items'
import { config } from 'src/config'
import { useItemStore } from 'src/stores/items'
const route = useRoute()
const router = useRouter()
const isLoading = ref(true)
const findLoading = ref(false)
const itemInfo = ref<IReqItem>()
const itemStore = useItemStore()
const bus = inject('bus')
onMounted(async () => {
  itemInfo.value = await findById(route.params.id as string)
  isLoading.value = false
})

async function findSimilar() {
  if (!itemInfo.value) return
  findLoading.value = true
  itemStore.setTarget(itemInfo.value)
  const data = await findSimilarById(itemInfo.value?.id)
  if (!data) {
    isLoading.value = false
    return
  }
  itemStore.searchingItem = data
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  bus.emit('replace')
  router.push('/result')
}
</script>

<style scoped lang="scss"></style>
