<template>
  <q-page class="container mx-auto flex flex-nowrap py-10 overflow-hidden">
    <target-item class="basis-1/3 pr-3" />
    <div
      class="basis-2/3 page pl-3 flex gap-y-5 justify-evenly overflow-y-scroll border-l-2"
    >
      <router-view />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import TargetItem from './TargetItem.vue'
</script>

<style scoped lang="scss">
$sb-track-color: #ffffff;
$sb-thumb-color: #cdbc90;
$sb-size: 4px;

.page {
  height: calc(100vh - 220px);

  // scrollbar-width: $sb-size;
  // scrollbar-color: $sb-thumb-color $sb-track-color;

  &::-webkit-scrollbar {
    width: $sb-size;
  }

  &::-webkit-scrollbar-track {
    background: $sb-track-color;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: $sb-thumb-color;
    border-radius: 3px;
  }
}

@supports not selector(::-webkit-scrollbar) {
  body {
    scrollbar-color: $sb-thumb-color $sb-track-color;
  }
}
</style>
