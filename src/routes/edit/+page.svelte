<script lang="ts">
	import EditorJS from '@editorjs/editorjs';
	import Header from '@editorjs/header';
	import SimpleImage from '@editorjs/simple-image';
	import Quote from '@editorjs/quote';
	import ImageTool from '@editorjs/image';
	import NestedList from '@editorjs/nested-list';
	import Checklist from '@editorjs/checklist';
	import LinkTool from '@editorjs/link';
	import Button from '$lib/components/ui/button/button.svelte';

	const editor = new EditorJS({
		tools: {
			header: Header,
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
			quote: Quote,
			image: {
				class: SimpleImage,
				inlineToolbar: true
			}
		},

		onReady: () => {
			console.log('Editor.js is ready to work!');
		},

		/*
		onChange: (api, event) => {
			console.log('Now I know that Editor\'s content changed!', event)
		},
		*/

		data: {},

		autofocus: true,

		placeholder: 'Write your beautiful article here!'
	});

	async function save() {
		const data = await editor.save();
		console.log(data);
	}
</script>

<Button on:click={save}>Save</Button>
<div class="border-2" id="editorjs"></div>
