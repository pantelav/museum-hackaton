<template>
  <q-page class="flex flex-col justify-center items-center">
    <logo-text class="mb-8" />
    <search-input class="w-[40%]" />
    <p
      class="mt-8 text-xl text-center font-semibold tracking-widest text-gray-700"
    >
      ГОСУДАРСТВЕННЫЙ КАТАЛОГ МУЗЕЙНОГО ФОНДА<br />
      РОССИЙСКОЙ ФЕДЕРАЦИИ
    </p>
  </q-page>
</template>

<script setup lang="ts">
import LogoText from '/src/components/app/LogoText.vue'
import SearchInput from 'src/components/app/SearchInput.vue'
</script>
