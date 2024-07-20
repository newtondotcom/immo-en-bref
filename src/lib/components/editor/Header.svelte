<script lang="ts">
	import type { HeaderData } from '@editorjs/header';

	export let data: HeaderData;
	export let level = 2;
</script>

{#if level === 1}
	<h1 class="text-3xl font-bold">{@html data.text}</h1>
{:else if level === 2}
	<h2 class="text-2xl font-bold">{@html data.text}</h2>
{:else if level === 3}
	<h3 class="text-xl font-bold">{@html data.text}</h3>
{:else if level === 4}
	<h4 class="text-lg font-bold">{@html data.text}</h4>
{:else if level === 5}
	<h5 class="text-base font-bold">{@html data.text}</h5>
{:else if level === 6}
	<h6 class="text-sm font-bold">{@html data.text}</h6>
{/if}
