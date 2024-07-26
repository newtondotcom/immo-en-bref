<template>
    <div 
    class="flex h-full w-full flex-col justify-start py-4"
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