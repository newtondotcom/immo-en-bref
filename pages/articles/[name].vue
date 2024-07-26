<script setup lang="ts">
const route = useRoute();
const name = route.params.name;

const schema = ref({});

onMounted(async () => {
	const data = await $fetch('/api/main', {
		query: { name: name }
	});
	console.log(data);
	schema.value = data;
});
</script>

<template>
	<div class="flex w-full flex-col px-10 py-4">
		<div v-for="block in schema.blocks">
			<EditorRendererHeader v-if="block.type === 'header'" :data="block.data" :time="schema.time" />
			<EditorRendererParagraph v-if="block.type === 'paragraph'" :data="block.data" />
			<EditorRendererQuote v-if="block.type === 'quote'" :data="block.data" />
			<EditorRendererImage v-if="block.type === 'image'" :data="block.data" />
		</div>
	</div>
</template>
