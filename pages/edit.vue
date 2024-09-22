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
        <Button class="mx-1" :disabled="!editionNonSaved" variant="secondary">
            Annuler les modifications
        </Button>
        <Button class="mx-1" :disabled="!editionNonSaved" @click="save">
            <Save class="h-4 w-4" />
        </Button>

        <AlertDialog>
            <AlertDialogTrigger>
                <Button class="mx-1" variant="outline" :disabled="currentArticle == ''">
                    <Trash class="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Suppresion d'un article</AlertDialogTitle>
                    <AlertDialogDescription>
                        Êtes-vous sûr de vouloir supprimer cet article ?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction @click="del()">Supprimer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
</template>

<script setup lang="ts">
    import { Buffer } from 'buffer';
    import { useToast } from '@/components/ui/toast/use-toast';
    import { unurlizeName, urlizeName } from '~/lib/utils';
    import { Save, Trash } from 'lucide-vue-next';

    const { toast } = useToast();

    const editionNonSaved = ref(false);
    const html = ref('');

    // the name is already urlized
    const currentArticle = ref('');

    // names are not urlized
    const articles = ref([]);

    async function getArticles() {
        const data = await $fetch('/api/list');
        data.list.map((article) => articles.value.push({ name: unurlizeName(article.title) }));
    }

    async function select(name: string) {
        const data = await $fetch('/api/article', {
            query: { name: urlizeName(name) },
        });
        html.value = data.article.content;
        currentArticle.value = urlizeName(name);
    }

    async function create(name: string) {
        const nameUrl = urlizeName(name);
        const data = await $fetch('/api/article', {
            method: 'POST',
            body: { name: nameUrl, data: '' },
        });
        currentArticle.value = '';
        articles.value.push({ name });
        toast({
            title: 'Création',
            description: 'Article créé',
        });
    }

    async function del() {
        const data = await $fetch('/api/article', {
            method: 'DELETE',
            query: { name: currentArticle.value },
        });
        articles.value = articles.value.filter(
            (article) => article.name != unurlizeName(currentArticle.value),
        );
        currentArticle.value = '';
        toast({
            title: 'Suppression',
            description: 'Article supprimé',
        });
    }

    async function save() {
        const data = await $fetch('/api/article', {
            method: 'POST',
            body: { name: currentArticle.value, data: html.value },
        });
        toast({
            title: 'Sauvegarde',
            description: 'Article sauvegardé',
        });
        editionNonSaved.value = false;
    }

    getArticles();
</script>
