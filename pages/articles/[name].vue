<script setup lang="ts">
const route = useRoute();
const name = route.params.name;

const schema = ref({
	time: 1721479935690,
	blocks: [
		{
			id: '4_RflBDpCZ',
			type: 'header',
			data: {
				text: 'Heading',
				level: 2
			}
		},
		{
			id: '2NOe-b5Dy-',
			type: 'paragraph',
			data: {
				text: 'ceci est un texte<br>'
			}
		},
		{
			id: 'Z5Md8vsAdI',
			type: 'paragraph',
			data: {
				text: 'Ceci est encore un test<br> zdq<b>dzqd</b>'
			}
		},
		{
			id: 'anDCHE_MXS',
			type: 'quote',
			data: {
				text: 'Test',
				caption: 'test de quote<br>',
				alignment: 'left'
			}
		},
		{
			id: 'hZAjSnqYMX',
			type: 'image',
			data: {
				file: {
					url: '/favicon.png'
				},
				withBorder: false,
				withBackground: false,
				stretched: false,
				caption: 'CodeX Code Camp 2019'
			}
		}
	],
	version: '2.30.2'
});
</script>

<template>
	<div class="flex w-full flex-col px-10 py-4">
		<div v-for="block in schema.blocks">
			<EditorRendererHeader v-if="block.type === 'header'" :data="block.data" />
			<EditorRendererParagraph v-if="block.type === 'paragraph'" :data="block.data" />
			<EditorRendererQuote v-if="block.type === 'quote'" :data="block.data" />
			<EditorRendererImage v-if="block.type === 'image'" :data="block.data" />
		</div>
	</div>
</template>
