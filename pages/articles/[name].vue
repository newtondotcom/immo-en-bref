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
    <div class="flex w-full flex-col px-10 py-4">
        <div id="bandeau" class="flex w-full flex-row rounded-xl bg-secondary px-4 py-2">
            <img src="/G.jpeg" class="h-16 w-16 rounded-full" />
            <div class="flex flex-col justify-center px-4">
                <div>
                    Article écrit par
                    <a href="https://www.linkedin.com/in/jerome-augereau/" class="text-blue-500">
                        Jérôme Augereau
                    </a>
                </div>
                <div>
                    {{ formatDistanceToNow(date, { addSuffix: true, locale: fr }) }} - le
                    {{ date.toLocaleDateString('fr-FR') }}
                </div>
            </div>
        </div>
        <article class="prose lg:prose-xl py-8" v-html="content" />
    </div>
</template>
