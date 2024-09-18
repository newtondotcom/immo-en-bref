<script setup lang="ts">
import { Buffer } from 'buffer';
const route = useRoute();
const name = route.params.name;

const content = ref({});
const date = ref(new Date());
const nameHuman = ref(unurlizeName(name));

const data = await $fetch('/api/article', {
	query: { name }
});
console.log(data);
content.value = new Buffer(data.content).toString('utf-8');
date.value = data.date;

useSeoMeta({
	title: nameHuman,
	ogTitle: nameHuman,
	description: 'This is my amazing site, let me tell you all about it.',
	ogDescription: 'This is my amazing site, let me tell you all about it.',
	ogImage: 'https://example.com/image.png',
	twitterCard: 'summary_large_image'
});
</script>

<template>
	<div class="flex w-full flex-col px-10 py-4">
		{{ date }}
		<article class="prose lg:prose-xl" v-html="content" />
	</div>
</template>
