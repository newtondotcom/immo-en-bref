<template>
    <body class="bg-secondary">
        <header class="w-full px-4 md:px-0 md:w-[60%] mx-auto">
            <div class="flex flex-row justify-between items-center py-20 mx-auto">
                <NuxtLink to="/" class="text-black dark:text-white text-3xl font-bold">
                    Immo-en-bref
                </NuxtLink>
                <div
                    class="flex flex-row space-x-2 items-center font-semibold text-black dark:text-white text-lg"
                >
                    <NuxtLink to="/about">A propos</NuxtLink>
                    <BlogColorMode />
                </div>
            </div>
        </header>
        <div class="min-h-screen w-full px-4 md:px-0 md:w-[60%] mx-auto">
            <slot />
        </div>
        <footer class="h-[100px] w-full px-4 md:px-0 md:w-[60%] mx-auto">
            <Separator class="mb-2" />
            Site en open source disponible
            <a class="text-primary" href="https://github.com/newtondotcom/immo-en-bref">ici</a>
            , créé et imaginé par
            <a class="text-primary" href="https://www.linkedin.com/in/robin-augereau/">
                Robin Augereau
            </a>
            .
        </footer>
    </body>
</template>
