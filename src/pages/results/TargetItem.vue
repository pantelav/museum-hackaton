<template>
  <div>
    <img
      :src="targetItem.imageUrl"
      alt="gun"
      class="w-full object-contain max-h-[40vh]"
    />
    <q-input
      outlined
      v-model="getTypeId"
      label="Класс экспоната"
      bg-color="white"
      class="mt-2"
    />
    <q-input
      outlined
      v-model="targetItem.name"
      label="Название экспоната"
      bg-color="white"
      class="mt-2"
    />
    <q-input
      outlined
      v-model="targetItem.description"
      type="textarea"
      label="Описание экспоната"
      bg-color="white"
      class="mt-2"
    />
    <q-btn color="secondary" label="Сохранить" class="w-full mt-2" @click="$router.push('/items')"/>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, inject, computed } from 'vue'
import { config } from '../../config'
import { useItemStore } from 'src/stores/items'
import type { IReqItem } from '../../types/items'

const itemStore = useItemStore()
const bus = inject('bus')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
bus.on('replace', () => {
  setData()
})

const targetItem = reactive<IReqItem & { imageUrl: string }>({
  name: itemStore.targetItem?.name || '',
  description: itemStore.targetItem?.description || '',
  exh_id: itemStore.targetItem?.exh_id || 0,
  id: itemStore.targetItem?.id || '',
  timestamp: itemStore.targetItem?.timestamp || 0,
  type_id: itemStore.targetItem?.type_id || '',
  imageUrl: config.getImageSrc(itemStore.targetItem?.id || ''),
})

const getTypeId = computed(() => {
  if (Array.isArray(targetItem.type_id)) {
    return targetItem.type_id[4]
  }
  return targetItem.type_id
})

onMounted(() => {
  // if (itemStore.targetItem) return
  // const lsItem = localStorage.getItem('target-item')
  // if (!lsItem) return
  // itemStore.setTarget(JSON.parse(lsItem))
  // setData()
})

function setData() {
  targetItem.name = itemStore.targetItem?.name || ''
  targetItem.description = itemStore.targetItem?.description || ''
  targetItem.exh_id = itemStore.targetItem?.exh_id || 0
  targetItem.id = itemStore.targetItem?.id || ''
  targetItem.timestamp = itemStore.targetItem?.timestamp || 0
  targetItem.type_id = itemStore.targetItem?.type_id || ''
  targetItem.imageUrl = config.getImageSrc(itemStore.targetItem?.id || '')
}
</script>

<style scoped lang="scss"></style>
