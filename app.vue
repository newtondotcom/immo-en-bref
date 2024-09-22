<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <Toaster />
    </div>
</template>

<script setup lang="ts">
    import Toaster from '@/components/ui/toast/Toaster.vue';
</script>

<style scoped>
    div {
        font-family:
            Space Grotesk,
            sans-serif;
    }
</style>
