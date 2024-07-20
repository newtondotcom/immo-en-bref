<script lang="ts">
	import Header from '$lib/components/editor/Header.svelte';
	import Image from '$lib/components/editor/Image.svelte';
	import Paragraph from '$lib/components/editor/Paragraph.svelte';
	import Quote from '$lib/components/editor/Quote.svelte';

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
	};

	let show = false;
</script>

<div class="px-10 py-4">
	{#each schema.blocks as block}
		{#if block.type === 'header'}
			<Header data={block.data} />
		{/if}
		{#if block.type === 'paragraph'}
			<Paragraph data={block.data} />
		{/if}
		{#if block.type === 'quote'}
			<Quote data={block.data} />
		{/if}
		{#if block.type === 'image'}
			<Image data={block.data} />
		{/if}
	{/each}
</div>
