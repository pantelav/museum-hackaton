<template>
  <div
    class="container h-full mx-auto flex items-center justify-between gap-10"
  >
    <div class="flex gap-10">
      <div v-for="link in headerLinks" :key="link.title">
        <router-link
          class="transition-colors hover:text-[#a89c74]"
          :to="link.to"
          ><q-icon :name="link.icon" class="pr-1" />
          {{ link.title }}</router-link
        >
      </div>
    </div>
    <p class="text-h6">Экспонатов в базе: {{ counter }}</p>
  </div>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios'
import { ref, onMounted } from 'vue'

const headerLinks = [
  { title: 'Поиск по каталогу', to: '/', icon: 'search' },
  { title: 'Каталог', to: '/items', icon: 'menu_book' },
]

const counter = ref(0)

onMounted(async () => {
  await getCount()
  setInterval(async () => {
    await getCount()
  }, 5000)
})

async function getCount() {
  const { data } = await api('/exhibits/image_counts')
  counter.value = data
}
</script>

<style scoped lang="scss">
.router-link-exact-active {
  color: #cdbc90;
}
</style>
