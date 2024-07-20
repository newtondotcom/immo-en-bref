<script lang="ts">
	import type { QuoteData } from '@editorjs/quote';
	export let data: QuoteData;
	const test = data.text;
	const caption = data.caption;
	const alignment = data.alignment;
</script>

<div class="flex flex-col items-center justify-center">
	<blockquote class=" mx-4 w-full rounded-lg bg-neutral-200 px-2 py-1">{@html test}</blockquote>
	<p class="text-md italic text-neutral-900">{@html caption}</p>
</div>
