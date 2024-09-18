<template>
	<div class="flex flex-row">
		<EditorListArticles :articles :select :create />

		<div class="flex w-[40vw] flex-col border-2 bg-neutral-50 px-1 py-1">
			<ToggleGroup type="multiple" v-if="editor">
				<ToggleGroupItem
					value="strike"
					aria-label="Toggle strike"
					@click="editor.chain().focus().toggleStrike().run()"
					:pressed="editor.isActive('strike')"
				>
					<Strikethrough class="h-4 w-4" />
				</ToggleGroupItem>

				<ToggleGroupItem
					value="code"
					aria-label="Toggle code"
					@click="editor.chain().focus().toggleCode().run()"
					:pressed="editor.isActive('code')"
				>
					<Code class="h-4 w-4" />
				</ToggleGroupItem>

				<ToggleGroupItem
					value="h1"
					aria-label="Toggle heading level 1"
					@click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
					:pressed="editor.isActive('heading', { level: 1 })"
				>
					<Heading1 class="h-4 w-4" />
				</ToggleGroupItem>

				<ToggleGroupItem
					value="h2"
					aria-label="Toggle heading level 2"
					@click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
					:pressed="editor.isActive('heading', { level: 2 })"
				>
					<Heading1 class="h-4 w-4" />
				</ToggleGroupItem>

				<ToggleGroupItem
					value="h3"
					aria-label="Toggle heading level 3"
					@click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
					:pressed="editor.isActive('heading', { level: 3 })"
				>
					<Heading3 class="h-4 w-4" />
				</ToggleGroupItem>

				<ToggleGroupItem
					value="bulletList"
					aria-label="Toggle bullet list"
					@click="editor.chain().focus().toggleBulletList().run()"
					:pressed="editor.isActive('bulletList')"
				>
					<List class="h-4 w-4" />
				</ToggleGroupItem>

				<ToggleGroupItem
					value="orderedList"
					aria-label="Toggle ordered list"
					@click="editor.chain().focus().toggleOrderedList().run()"
					:pressed="editor.isActive('orderedList')"
				>
					<ListOrdered class="h-4 w-4" />
				</ToggleGroupItem>

				<ToggleGroupItem
					value="blockquote"
					aria-label="Toggle blockquote"
					@click="editor.chain().focus().toggleBlockquote().run()"
					:pressed="editor.isActive('blockquote')"
				>
					<Quote class="h-4 w-4" />
				</ToggleGroupItem>

				<ToggleGroupItem
					value="codeBlock"
					aria-label="Toggle code block"
					@click="editor.chain().focus().toggleCodeBlock().run()"
					:pressed="editor.isActive('codeBlock')"
				>
					<Code class="h-4 w-4" />
				</ToggleGroupItem>

				<ToggleGroupItem
					value="separator"
					aria-label="Insert horizontal rule"
					@click="editor.chain().focus().setHorizontalRule().run()"
				>
					<Minus class="h-4 w-4" />
				</ToggleGroupItem>

				<ToggleGroupItem
					value="undo"
					aria-label="Undo"
					@click="editor.chain().focus().undo().run()"
				>
					<Undo class="h-4 w-4" />
				</ToggleGroupItem>

				<ToggleGroupItem
					value="redo"
					aria-label="Redo"
					@click="editor.chain().focus().redo().run()"
				>
					<Redo class="h-4 w-4" />
				</ToggleGroupItem>
			</ToggleGroup>
			<editor-content :editor="editor" />
		</div>

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

	<BubbleMenu :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor">
		<div class="flex rounded-lg border border-gray-100 bg-white shadow-md">
			<ToggleGroup type="multiple">
				<ToggleGroupItem
					value="bold"
					aria-label="Toggle bold"
					@click="editor.chain().focus().toggleBold().run()"
					:pressed="editor.isActive('bold')"
				>
					<Bold class="h-4 w-4" />
				</ToggleGroupItem>
				<ToggleGroupItem
					value="italic"
					aria-label="Toggle italic"
					@click="editor.chain().focus().toggleItalic().run()"
					:pressed="editor.isActive('italic')"
				>
					<Italic class="h-4 w-4" />
				</ToggleGroupItem>
				<ToggleGroupItem
					value="underline"
					aria-label="Toggle middleline"
					@click="editor.chain().focus().toggleUnderline().run()"
					:pressed="editor.isActive('underline')"
				>
					<Underline class="h-4 w-4" />
				</ToggleGroupItem>
			</ToggleGroup>
		</div>
	</BubbleMenu>
</template>

<script setup lang="ts">
import { BubbleMenu, useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import {
	Bold,
	Italic,
	Underline,
	Quote,
	Heading1,
	Heading,
	Heading2,
	Heading3,
	Undo,
	Redo,
	Code,
	Minus,
	Strikethrough,
	ListOrdered,
	List
} from 'lucide-vue-next';

const content = '<p>I’m running Tiptap with Vue.js. 🎉</p>';
const editor = useEditor({
	content: content,
	extensions: [StarterKit],
	onUpdate: ({ editor }) => {
		console.log(editor.getHTML());
		html.value = editor.getHTML();
		editionNonSaved.value = true;
	}
});

const html: string = ref(content);

const editionNonSaved = ref(true);

async function save() {
	console.log(html.value);
	const data = await $fetch('/api/article', {
		method: 'POST',
		body: { name: 'test', data: html.value }
	});
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
		body: { name, date: '' }
	});
	articles.value.push(data);
}

onBeforeUnmount(() => {
	editor.value?.destroy();
});
</script>
