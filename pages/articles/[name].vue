<script setup lang="ts">
const route = useRoute();
const name = route.params.name;

const content = ref({});

onMounted(async () => {
	const data = await $fetch('/api/article', {
		query: { name }
	});
	content.value = data;
});
</script>

<template>
	<div class="flex w-full flex-col px-10 py-4">
		<article class="prose lg:prose-xl" v-html="content" />
	</div>
</template>
