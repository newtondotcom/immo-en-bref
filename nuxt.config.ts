// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: false },
    routeRules: {
        '/articles/**': { isr: true },
        edit: { ssr: false },
    },
    modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxt/fonts'],
    shadcn: {
        prefix: '',
        componentDir: './components/ui',
    },
    runtimeConfig: {
        GITHUB_USERNAME: process.env.GITHUB_USERNAME,
        GITHUB_EMAIL: process.env.GITHUB_EMAIL,
        GITHUB_REPO: process.env.GITHUB_REPO,
        GITHUB_BRANCH: process.env.GITHUB_BRANCH,
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
        ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
        SEED: process.env.SEED,
        PASSWORD_ADMIN: process.env.PASSWORD_ADMIN,
        ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    },
    tailwindcss: {
        cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
        configPath: 'tailwind.config',
        exposeConfig: {
            level: 2,
        },
        viewer: false,
    },
});
