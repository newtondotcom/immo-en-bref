<template>
    <div>
      <h1 v-if="level === 1" class="text-3xl font-bold" v-html="data.text"></h1>
      <h2 v-else-if="level === 2" class="text-2xl font-bold" v-html="data.text"></h2>
      <h3 v-else-if="level === 3" class="text-xl font-bold" v-html="data.text"></h3>
      <h4 v-else-if="level === 4" class="text-lg font-bold" v-html="data.text"></h4>
      <h5 v-else-if="level === 5" class="text-base font-bold" v-html="data.text"></h5>
      <h6 v-else-if="level === 6" class="text-sm font-bold" v-html="data.text"></h6>
    </div>
  </template>
  
  <script lang="ts" setup>
  import type { HeaderData } from '@editorjs/header';
  
  defineProps({
    data: {
      type: Object as PropType<HeaderData>,
      required: true
    },
    level: {
      type: Number,
      default: 2
    }
  });
  </script>