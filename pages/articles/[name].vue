<script setup lang="ts">
    import { Buffer } from 'buffer';
    import { unurlizeName } from '~/lib/utils';
    import { formatDistanceToNow } from 'date-fns';
    import { fr } from 'date-fns/locale';

    const route = useRoute();
    const name = route.params.name;

    const content = ref<string>('');
    const date = ref<Date>(new Date());
    const nameHuman = ref<string>(unurlizeName(name));

    const data = await $fetch('/api/article', {
        query: { name },
    });
    content.value = data.article.content;
    date.value = new Date(data.article.date);

    useSeoMeta({
        title: nameHuman.value,
        ogTitle: nameHuman.value,
        description: 'This is my amazing site, let me tell you all about it.',
        ogDescription: 'This is my amazing site, let me tell you all about it.',
        ogImage: 'https://example.com/image.png',
        twitterCard: 'summary_large_image',
    });
</script>

<template>
    <div class="flex w-full flex-col py-4">
        <div class="py-4">
            <h1
                className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
            >
                {{ nameHuman }}
            </h1>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400"></p>
        </div>
        <article class="prose lg:prose-xl py-8" v-html="content" />
        <div id="bandeau" class="flex w-full flex-row rounded-xl bg-secondary px-4 py-2">
            <img src="/G.jpeg" class="h-16 w-16 rounded-full" />
            <div class="flex flex-col justify-center px-4">
                <div>
                    Article écrit par
                    <a href="https://www.linkedin.com/in/jerome-augereau/" class="text-primary">
                        Jérôme Augereau
                    </a>
                </div>
                <div>
                    {{ formatDistanceToNow(date, { addSuffix: true, locale: fr }) }} - le
                    {{ date.toLocaleDateString('fr-FR') }}
                </div>
            </div>
        </div>
    </div>
</template>
