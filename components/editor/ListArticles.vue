<template>
    <Dialog>
        <div
            class="mx-2 my-2 min-h-screen min-w-[20vw] rounded-2xl border-2 border-blue-400 bg-blue-400 px-4 py-2"
        >
            <div class="flex flex-row items-center justify-between">
                <div class="text-2xl font-bold">Articles</div>
                <TooltipProvider>
                    <DialogTrigger>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button variant="ghost"><Plus strokeWidth="2.5" /></Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Ajouter un article</p>
                            </TooltipContent>
                        </Tooltip>
                    </DialogTrigger>
                </TooltipProvider>
            </div>
            <ul class="">
                <li @click="select(article.id)" v-for="article in articles">
                    {{ capitalizeFirstLetter(article.name) }}
                </li>
            </ul>
        </div>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Créer un article</DialogTitle>
                <DialogDescription>Entrez le nom de l'article</DialogDescription>
            </DialogHeader>

            <Input type="text" placeholder="Nom" v-model="name" />
            <DialogFooter>
                <DialogClose as-child>
                    <Button @click="create(name)">Créer</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
    import { capitalizeFirstLetter } from '~/lib/utils';
    import { Plus } from 'lucide-vue-next';

    const name = ref<string>('');

    interface ListArticlesProps {
        articles: Array<{ name: string; id: string }>;
        select: (id: string) => void;
        create: (name: string) => void;
    }
    const props = defineProps<ListArticlesProps>();
</script>
