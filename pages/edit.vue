<template>
	<div class="flex flex-row">
		<EditorListArticles :articles :select :create />

		<Editor v-model:html="html" />

		<Separator orientation="vertical" />

		<div class="w-[40vw] border-2 border-red-400">
			<article class="prose lg:prose-xl" v-html="html" />
		</div>
	</div>

	<div
		class="fixed bottom-0 left-0 right-0 z-10 flex h-[50px] items-center justify-center bg-secondary"
	>
		<Button class="mx-1" :disabled="!editionNonSaved" @click="save" variant="secondary">
			Annuler les modifications
		</Button>
		<Button class="mx-1" :disabled="!editionNonSaved" @click="save"> Sauvegarder </Button>
	</div>
</template>

<script setup lang="ts">
import { urlizeName } from '~/lib/utils';

const editionNonSaved = ref(true);
const html = ref('');

async function save() {
	const data = await $fetch('/api/article', {
		method: 'POST',
		body: { name: 'test', data: html.value }
	});
}

const articles = ref([
	{
		name: 'credit'
	},
	{
		name: 'taux'
	}
]);

async function select(id: string) {
	const data = await $fetch('/api/article', {
		query: { id }
	});
	editor.value?.setContent(data);
}

async function create(name: string) {
	const nameUrl = urlizeName(name);
	const data = await $fetch('/api/article', {
		method: 'POST',
		body: { name: nameUrl, date: '' }
	});
	articles.value.push({ name });
}

// REFORMAT AND PROTECT WITH AUTH
</script>
