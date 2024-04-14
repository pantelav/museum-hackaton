<template>
  <q-page class="py-5 px-2">
    <search-input class="mb-5 w-[40%] min-w-[400px]" @find="findItemsByText" />
    <q-infinite-scroll
      @load="getMoreItems"
      :offset="textSearchMode ? -1000 : 200"
      class="grid-box w-full"
    >
      <item-card
        v-for="item in items"
        :key="item.id"
        :data="item"
        class="card"
      />
      <template #loading>
        <div class="w-full">
          <q-circular-progress
            indeterminate
            rounded
            size="50px"
            color="primary"
            class="text-center justify-center"
          />
        </div>
      </template>
    </q-infinite-scroll>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getAllItems } from '../api/index'
import ItemCard from 'src/components/ItemCard.vue'
import SearchInput from 'src/components/app/SearchInput.vue'
import { useItemStore } from 'src/stores/items'
import { api } from 'src/boot/axios'
import { useRoute } from 'vue-router'
import type { IReqItem } from 'src/types/items'

const route = useRoute()
const isLoading = ref(true)
const items = ref<IReqItem[]>()
const offset = ref(0)
const itemStore = useItemStore()


const textSearchMode = ref(false)

onMounted(async () => {
  if (route.query.search) {
    await findItemsByText()
    return
  }
  try {
    items.value = await getAllItems(offset.value)
    offset.value += 50
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
})

async function getMoreItems(idx, done) {
  if (textSearchMode.value) return
  try {
    const newItems = await getAllItems(offset.value)
    items.value?.push(...newItems)
    offset.value += 50
  } catch (error) {
    console.log(error)
  } finally {
    done()
  }
}

async function findItemsByText() {
  try {
    itemStore.processSearch = true
    const { data } = await api.post('/exhibits/find_by_text', {
      text: itemStore.textQuery,
    })
    items.value = data.similar
    textSearchMode.value = true
  } catch (error) {
    console.log(error)
  } finally {
    itemStore.processSearch = false
  }
}

</script>

<style scoped lang="scss">
.grid-box {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 50px;
  align-content: center;
  justify-content: center;
}

@media screen and (max-width: 1300px) {
  .grid-box {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (max-width: 1050px) {
  .grid-box {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 680px) {
  .grid-box {
    grid-template-columns: repeat(1, 1fr);
    align-items: center;
    justify-content: center;
    .card {
      justify-self: center;
    }
  }
}
</style>
