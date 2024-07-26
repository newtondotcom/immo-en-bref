<template>
	<div class="flex flex-col items-center justify-center">
		<blockquote
			class="mx-4 w-full rounded-lg bg-neutral-200 px-2 py-1"
			:class="alignmentClass"
			v-html="data.text"
		></blockquote>
		<p class="text-md italic text-neutral-900" v-html="data.caption"></p>
	</div>
</template>

<script lang="ts" setup>
import type { QuoteData } from '@editorjs/quote';

const props = defineProps({
	data: {
		type: Object as PropType<QuoteData>,
		required: true
	}
});

const alignmentClass = computed(() => {
	switch (props.data.alignment) {
		case 'left':
			return 'text-left';
		case 'center':
			return 'text-center';
		case 'right':
			return 'text-right';
		default:
			return '';
	}
});
</script>
