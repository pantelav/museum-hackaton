<template>
  <router-link
    :to="'/result/' + props.data.id"
    class="w-[450px] h-[250px] overflow-hidden"
  >
    <q-card flat bordered class="h-full relative">
      <q-badge color="blue" class="absolute">
        {{ props.data.type_id }}
      </q-badge>
      <q-card-section
        horizontal
        class="w-full h-full flex justify-between items-center"
      >
        <q-card-section class="q-pt-xs">
          <div class="q-mt-sm q-mb-xs">
            {{ props.data.name }}
          </div>
          <!-- <div class="text-caption text-grey">
            {{ props.data.description }}
          </div> -->
        </q-card-section>

        <q-card-section class="col-5 flex flex-center">
          <q-img
            class="rounded-borders object-contain"
            :src="config.getImageSrc(props.data.id)"
          />
        </q-card-section>
      </q-card-section>
      <q-badge color="primary" class="absolute bottom-0">
       Схожесть: {{ Math.floor(props.data.cosine_similarity * 100) }}%
      </q-badge>
    </q-card>
  </router-link>
</template>

<script setup lang="ts">
import { config } from 'src/config'
import type { ISimilarItem } from 'src/types/items'

const props = defineProps<{ data: ISimilarItem }>()
</script>

<style scoped lang="scss"></style>
