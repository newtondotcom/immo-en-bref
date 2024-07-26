<template>
    <div 
    class="flex h-full w-full flex-col items-center justify-center py-4"
    v-html="data.text"
    />
  </template>
  
  <script lang="ts" setup>

  
 defineProps({
    data: {
      type: Object,
      required: true
    }
  });
  </script>