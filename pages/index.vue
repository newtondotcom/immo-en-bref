<template>
    <div class="flex flex-col">
        <div class="py-4 text-primary">
            <h1
                className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
            >
                Articles récents
            </h1>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                Bienvenue sur Immo-en-bref, le blog d'un journaliste passionné d'immobillier.
            </p>
        </div>
        <Separator />
        <div v-for="article in articles" :key="article.name">
            <NuxtLink
                :to="'/articles/' + urlizeName(article.name)"
                class="flex flex-row py-4 items-center justify-between mx-auto"
            >
                <div class="flex flex-col truncate">
                    <h3 class="text-md font-semibold leading-7 text-gray-500 dark:text-gray-100">
                        {{ new Date(article.date).toLocaleDateString('fr-FR') }}
                    </h3>
                    <h2
                        class="text-2xl truncate font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14"
                    >
                        {{ article.name }}
                    </h2>
                </div>
                <CircleChevronRight class="w-8 h-8 text-primary" />
            </NuxtLink>
            <Separator />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { unurlizeName, urlizeName } from '~/lib/utils';
    import { CircleChevronRight } from 'lucide-vue-next';

    const articles = ref([]);
    async function getArticles() {
        const data = await $fetch('/api/list');
        data.list.map((article) =>
            articles.value.push({
                name: unurlizeName(article.title),
                content: article.content,
                date: article.date,
            }),
        );
        console.log(articles.value);
    }

    getArticles();
</script>
