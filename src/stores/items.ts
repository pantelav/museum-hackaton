import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IReqItem, IFoundedItem } from 'src/types/items'

export const useItemStore = defineStore('target-item', () => {
  const targetItem = ref<IReqItem>()
  const searchingItem = ref<IFoundedItem>()
  const textQuery = ref('')

  function setTarget(item: IReqItem) {
    localStorage.setItem('target-item', JSON.stringify(item))
    targetItem.value = item
  }

  return { targetItem, setTarget, searchingItem, textQuery }
})
