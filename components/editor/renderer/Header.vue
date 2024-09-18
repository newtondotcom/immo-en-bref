<template>
    <div>
        <div v-if="data.level === 1" class="flex flex-col">
            <h1 class="text-5xl font-bold" v-html="data.text" />
            <div class="flex flex-row justify-between">
                <div>
                    <Avatar>
                        <AvatarImage src="/dje.jpg" alt="JA" />
                        <AvatarFallback>JA</AvatarFallback>
                    </Avatar>
                </div>
                <div class="text-neutral-500">{{ date }}</div>
            </div>
        </div>
        <h2 v-else-if="data.level === 2" class="text-4xl font-bold" v-html="data.text" />
        <h3 v-else-if="data.level === 3" class="text-3xl font-bold" v-html="data.text" />
        <h4 v-else-if="data.level === 4" class="text-2xl font-bold" v-html="data.text" />
        <h5 v-else-if="data.level === 5" class="text-xl font-bold" v-html="data.text" />
        <h6 v-else-if="data.level === 6" class="text-lg font-bold" v-html="data.text" />
    </div>
</template>

<script setup lang="ts">
    import moment from 'moment';
    import type { HeaderData } from '@editorjs/header';

    const props = defineProps({
        data: {
            type: Object as PropType<HeaderData>,
            required: true,
        },
        time: {
            type: Object as PropType<number>,
            required: true,
        },
    });

    const date = moment(new Date(props.time).toISOString().substring(0, 10), 'YYYY-MM-DD').format(
        'LL',
    );
</script>
