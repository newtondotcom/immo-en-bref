<script lang="ts">
	import Header from '$lib/components/editor/Header.svelte';
	import Paragraph from '$lib/components/editor/Paragraph.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	const name = data.params.name;

	const schema = {
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
					text: 'Ceci est encore un test<br>'
				}
			}
		],
		version: '2.30.2'
	};

	let show = false;
</script>

{#if show}
	<Header />
	<Paragraph />
{/if}
