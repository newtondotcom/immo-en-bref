<template>
    <div class="flex flex-row">
        <EditorListArticles :articles :select :create />

        <div class="flex flex-row" v-if="currentArticle != ''">
            <Editor v-model:html="html" v-model:changes="editionNonSaved" />

            <Separator orientation="vertical" />

            <div class="w-[40vw] border-2 border-red-400">
                <article class="prose lg:prose-xl" v-html="html" />
            </div>
        </div>
        <div v-else>
            <div class="flex flex-row items-center justify-center w-full h-full">
                <p class="text-2xl">Sélectionnez un article</p>
            </div>
        </div>
    </div>

    <div
        class="fixed bottom-0 left-0 right-0 z-10 flex h-[50px] items-center justify-center bg-secondary"
    >
        <Button class="mx-1" :disabled="!editionNonSaved" @click="save" variant="secondary">
            Annuler les modifications
        </Button>
        <Button class="mx-1" :disabled="!editionNonSaved" @click="save">Sauvegarder</Button>
    </div>
</template>

<script setup lang="ts">
    import { urlizeName } from '~/lib/utils';

    const editionNonSaved = ref(false);
    const html = ref('');

    const currentArticle = ref('');

    async function save() {
        const data = await $fetch('/api/article', {
            method: 'POST',
            body: { name: 'test', data: html.value },
        });
    }

    const articles = ref([]);

    async function getArticles() {
        const data = await $fetch('/api/list');
        data.listDir.map((article) => articles.value.push({ name: article }));
    }

    getArticles();

    async function select(name: string) {
        const data = await $fetch('/api/article', {
            query: { name },
        });
        editor.value?.setContent(data);
        html.value = date.content;
        currentArticle.value = name;
    }

    async function create(name: string) {
        const nameUrl = urlizeName(name);
        const data = await $fetch('/api/article', {
            method: 'POST',
            body: { name: nameUrl, data: '' },
        });
        articles.value.push({ name });
    }

    // PROTECT WITH AUTH
</script>
