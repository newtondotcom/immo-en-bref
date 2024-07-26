<template>
	<div class="flex flex-row">
		<EditorListArticles :articles />

		<div id="editorjs" class="w-[40vw] border-2 bg-neutral-50"></div>

		<div class="w-[40vw] border-2 border-red-400">
			<!-- <Separator orientation="vertical" /> -->
			<div v-for="block in schema.blocks">
				<EditorRendererHeader v-if="block.type === 'header'" :data="block.data" />
				<EditorRendererParagraph v-if="block.type === 'paragraph'" :data="block.data" />
				<EditorRendererQuote v-if="block.type === 'quote'" :data="block.data" />
				<EditorRendererImage v-if="block.type === 'image'" :data="block.data" />
			</div>
		</div>
	</div>

	<div
		class="fixed bottom-0 left-0 right-0 z-10 flex h-[50px] items-center justify-center border border-orange-500"
	>
		<Button class="mx-1" @click="save" variant="secondary">Annuler les modifications</Button>
		<Button class="mx-1" @click="save">Sauvegarder</Button>
	</div>
</template>

<script setup lang="ts">
import Header from '@editorjs/header';
import EditorJS from '@editorjs/editorjs';

const schema = ref({});

var editor = new EditorJS({
	tools: {
		header: Header
	},
	onChange: async (api, event) => {
		schema.value = await editor.save();
	}
});

async function save() {
	const data = await editor.save();
	schema.value = data;
	console.log(data);
}

const articles = ref([
	{
		name: 'credit'
	},
	{
		name: 'taux'
	}
]);
</script>
