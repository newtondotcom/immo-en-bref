<template>
    <div>
      <h1 v-if="data.level === 1" class="text-5xl font-bold" v-html="data.text"></h1>
      <h2 v-else-if="data.level === 2" class="text-4xl font-bold" v-html="data.text"></h2>
      <h3 v-else-if="data.level === 3" class="text-3xl font-bold" v-html="data.text"></h3>
      <h4 v-else-if="data.level === 4" class="text-2xl font-bold" v-html="data.text"></h4>
      <h5 v-else-if="data.level === 5" class="text-xl font-bold" v-html="data.text"></h5>
      <h6 v-else-if="data.level === 6" class="text-lg font-bold" v-html="data.text"></h6>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { HeaderData } from '@editorjs/header';

  
  const props = defineProps({
    data: {
      type: Object as PropType<HeaderData>,
      required: true
    }
  });
  </script>