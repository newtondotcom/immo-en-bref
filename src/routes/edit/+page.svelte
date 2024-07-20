<script lang="ts">
	import EditorJS from '@editorjs/editorjs';
	import { default as Header2 } from '@editorjs/header';
	import SimpleImage from '@editorjs/simple-image';
	import Quote from '@editorjs/quote';
	import ImageTool from '@editorjs/image';
	import NestedList from '@editorjs/nested-list';
	import Checklist from '@editorjs/checklist';
	import LinkTool from '@editorjs/link';
	import Button from '$lib/components/ui/button/button.svelte';

	const editor = new EditorJS({
		tools: {
			image: SimpleImage,
			list: {
				class: NestedList,
				inlineToolbar: true,
				config: {
					defaultStyle: 'unordered'
				}
			},
			checklist: {
				class: Checklist,
				inlineToolbar: true
			},
			header: Header2,
			quote: Quote
		}
	});

	async function save() {
		const data = await editor.save();
		console.log(data);
	}
</script>

<Button on:click={save}>Save</Button>
<div class="border-2" id="editorjs"></div>
