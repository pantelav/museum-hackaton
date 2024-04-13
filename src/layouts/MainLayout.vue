<template>
  <q-layout view="lHh Lpr lff">
    <q-header class="h-[60px] px-2 text-zinc-100 border-b font-medium text-lg">
      <the-header />
    </q-header>

    <q-page-container class="bg-slate-100">
      <router-view class="container mx-auto" />
    </q-page-container>

    <q-footer class="bg-primary text-black h-[80px]">
      <the-footer />
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import TheFooter from '/src/components/TheFooter.vue'
import TheHeader from '/src/components/TheHeader.vue'
</script>
