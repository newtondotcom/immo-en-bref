<template>
    <section class="flex justify-center items-center h-screen">
        <Card>
            <CardHeader class="space-y-1">
                <CardTitle class="text-2xl">Portail de connexion</CardTitle>
                <CardDescription>
                    Connectez-vous pour accéder à votre espace personnel
                </CardDescription>
            </CardHeader>
            <CardContent class="grid gap-4">
                <div class="grid gap-2">
                    <Label for="password">Utilisateur</Label>
                    <Input id="username" type="text" v-model="username" placeholder="admin" />
                </div>
                <div class="grid gap-2">
                    <Label for="password">Mot de passe</Label>
                    <Input id="password" type="password" v-model="password" placeholder="xyz" />
                </div>
            </CardContent>
            <CardFooter>
                <Button @click="auth" class="w-full">Se connecter</Button>
            </CardFooter>
        </Card>
    </section>
</template>

<script setup lang="ts">
    import { useToast } from '@/components/ui/toast/use-toast';

    definePageMeta({ layout: false });

    const { toast } = useToast();

    const username = ref('');
    const password = ref('');

    async function auth() {
        try {
            await $fetch('/api/auth/in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username.value,
                    password: password.value,
                }),
            });
            navigateTo('/edit');
        } catch (e) {
            console.error(e);
            toast({
                title: 'Erreur',
                description: 'Identifiants incorrects',
                variant: 'destructive',
            });
        }
    }
</script>
