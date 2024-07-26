<template>
    <div class="flex h-full w-full flex-col items-center justify-center py-4">
      <img
        :src="data.file.url"
        :alt="data.caption"
        :class="cn(data.withBorder ? 'px-4' : '', data.stretched ? 'w-full' : '')"
      />
      <p class="text-neutral-700">{{ data.caption }}</p>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { cn } from '$lib/utils';
  import type { ImageData } from '@editorjs/simple-image';
  
  const props = defineProps({
    data: {
      type: Object as PropType<ImageData>,
      required: true
    }
  });
  </script>