<template>
    <div class="flex w-[40vw] flex-col border-2 bg-white px-1 py-1">
        <div class="flex flex-wrap" v-if="editor">
            <Button
                value="strike"
                aria-label="Toggle strike"
                @click="editor.chain().focus().toggleStrike().run()"
                :variant="editor.isActive('strike') ? 'outline' : 'ghost'"
            >
                <Strikethrough class="h-4 w-4" />
            </Button>

            <Button
                value="code"
                aria-label="Toggle code"
                @click="editor.chain().focus().toggleCode().run()"
                :variant="editor.isActive('code') ? 'outline' : 'ghost'"
            >
                <Code class="h-4 w-4" />
            </Button>

            <Button
                value="h1"
                aria-label="Toggle heading level 1"
                @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                :variant="editor.isActive('heading', { level: 1 }) ? 'outline' : 'ghost'"
            >
                <Heading1 class="h-4 w-4" />
            </Button>

            <Button
                value="h2"
                aria-label="Toggle heading level 2"
                @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                :variant="editor.isActive('heading', { level: 2 }) ? 'outline' : 'ghost'"
            >
                <Heading2 class="h-4 w-4" />
            </Button>

            <Button
                value="h3"
                aria-label="Toggle heading level 3"
                @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                :variant="editor.isActive('heading', { level: 3 }) ? 'outline' : 'ghost'"
            >
                <Heading3 class="h-4 w-4" />
            </Button>

            <Button
                value="bulletList"
                aria-label="Toggle bullet list"
                @click="editor.chain().focus().toggleBulletList().run()"
                :variant="editor.isActive('bulletList') ? 'outline' : 'ghost'"
            >
                <List class="h-4 w-4" />
            </Button>

            <Button
                value="orderedList"
                aria-label="Toggle ordered list"
                @click="editor.chain().focus().toggleOrderedList().run()"
                :variant="editor.isActive('orderedList') ? 'outline' : 'ghost'"
            >
                <ListOrdered class="h-4 w-4" />
            </Button>

            <Button
                value="blockquote"
                aria-label="Toggle blockquote"
                @click="editor.chain().focus().toggleBlockquote().run()"
                :variant="editor.isActive('blockquote') ? 'outline' : 'ghost'"
            >
                <Quote class="h-4 w-4" />
            </Button>

            <Button
                value="codeBlock"
                aria-label="Toggle code block"
                @click="editor.chain().focus().toggleCodeBlock().run()"
                :variant="editor.isActive('codeBlock') ? 'outline' : 'ghost'"
            >
                <Code class="h-4 w-4" />
            </Button>

            <Button
                value="separator"
                aria-label="Insert horizontal rule"
                @click="editor.chain().focus().setHorizontalRule().run()"
                variant="ghost"
            >
                <Minus class="h-4 w-4" />
            </Button>

            <Button
                value="undo"
                aria-label="Undo"
                @click="editor.chain().focus().undo().run()"
                variant="ghost"
            >
                <Undo class="h-4 w-4" />
            </Button>

            <Button
                value="redo"
                aria-label="Redo"
                @click="editor.chain().focus().redo().run()"
                variant="ghost"
            >
                <Redo class="h-4 w-4" />
            </Button>
        </div>

        <editor-content :editor="editor" />

        <BubbleMenu :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor">
            <div class="flex rounded-lg border border-gray-100 bg-white shadow-md">
                <Button
                    value="bold"
                    aria-label="Toggle bold"
                    @click="editor.chain().focus().toggleBold().run()"
                    :variant="editor.isActive('bold') ? 'outline' : 'ghost'"
                >
                    <Bold class="h-4 w-4" />
                </Button>
                <Button
                    value="italic"
                    aria-label="Toggle italic"
                    @click="editor.chain().focus().toggleItalic().run()"
                    :variant="editor.isActive('italic') ? 'outline' : 'ghost'"
                >
                    <Italic class="h-4 w-4" />
                </Button>
                <Button
                    value="underline"
                    aria-label="Toggle middleline"
                    @click="editor.chain().focus().toggleUnderline().run()"
                    :variant="editor.isActive('underline') ? 'outline' : 'ghost'"
                >
                    <Underline class="h-4 w-4" />
                </Button>
            </div>
        </BubbleMenu>
    </div>
</template>

<script setup lang="ts">
    import StarterKit from '@tiptap/starter-kit';
    import { BubbleMenu, EditorContent, useEditor } from '@tiptap/vue-3';
    import {
        Bold,
        Code,
        Heading,
        Heading1,
        Heading2,
        Heading3,
        Image,
        Italic,
        List,
        ListOrdered,
        Minus,
        Quote,
        Redo,
        Strikethrough,
        Underline,
        Undo,
    } from 'lucide-vue-next';

    const html: string = defineModel('html');
    const changes: boolean = defineModel('changes');

    const content = '<p>I’m running Tiptap with Vue.js. 🎉</p>';
    const editor = useEditor({
        content: content,
        extensions: [StarterKit],
        onUpdate: ({ editor }) => {
            html.value = editor.getHTML();
            changes.value = true;
        },
    });

    html.value = content;

    onBeforeUnmount(() => {
        editor.value?.destroy();
    });
</script>
