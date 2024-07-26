<template>
	<div class="mx-2 my-2 h-full w-[20vw] rounded-2xl border-2 border-blue-400 bg-blue-400 px-4 py-2">
		<div class="flex flex-row items-center justify-between">
			<div class="text-2xl font-bold">Articles</div>
			<div><Plus strokeWidth="2.5" /></div>
		</div>
		<ul class="">
			<li v-for="article in articles">{{ capitalizeFirstLetter(article.name) }}</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { capitalizeFirstLetter } from '~/lib/utils';
import { Plus } from 'lucide-vue-next';

defineProps({
	articles: {
		type: Object,
		required: true
	}
});
</script>
