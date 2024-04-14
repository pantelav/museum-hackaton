<template>
  <form @submit.prevent="submitForm" class="min-w-[400px]">
    <input
      type="file"
      name="image"
      accept="image/*"
      ref="fileUploader"
      class="hidden"
      @change="uploadFile"
    />
    <q-input
      rounded
      outlined
      color="secondary"
      bg-color="white"
      v-model="searchQuery"
      placeholder="Поиск по описанию (напр. Лицо, Круглое и т.д.)"
    >
      <template #prepend>
        <q-icon name="search" />
      </template>
      <template #append>
        <q-spinner color="primary" size="1em" class="mr-2" v-if="itemStore.processSearch"/>
        <q-icon
          name="add_photo_alternate"
          color="secondary"
          class="cursor-pointer"
          size="1.5em"
          @click="selectFile"
          title="Выбрать изображение"
        />
      </template>
    </q-input>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useItemStore } from 'src/stores/items'
import { useRouter, useRoute } from 'vue-router'
import { findItem } from 'src/api'
import type { IReqItem } from 'src/types/items'

const emit = defineEmits(['find'])
const router = useRouter()
const route = useRoute()
const itemStore = useItemStore()
const searchQuery = ref('')
const fileUploader = ref<HTMLInputElement | null>(null)

function selectFile() {
  fileUploader.value?.click()
}

async function uploadFile() {
  const file = fileUploader.value?.files
  if (!file) return
  const data = await findItem(file[0])
  if (!data) return

  itemStore.searchingItem = data
  const itemDescription: IReqItem = {
    name: '',
    description: '',
    exh_id: 0,
    id: data.id,
    timestamp: Date.now(),
    type_id: data.type_id,
  }

  itemStore.setTarget(itemDescription)
  router.push('/result')
}

function submitForm() {
  if (!searchQuery.value) return
  itemStore.processSearch = true
  itemStore.textQuery = searchQuery.value
  emit('find')
  if (route.path === '/') router.push('/items?search=true')
}
</script>

<style scoped lang="scss"></style>
