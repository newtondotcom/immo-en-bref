<template>
    <div class="flex w-full flex-col px-10 py-4">
        <div
            id="bandeau"
            class="flex w-full flex-row rounded-xl bg-secondary px-4 py-2 items-center space-x-4"
        >
            <img src="/G.jpeg" class="h-16 w-16 rounded-full" />
            <div class="flex flex-col justify-center px-4">
                <div>
                    Ce blog est écrit par
                    <a href="https://www.linkedin.com/in/jerome-augereau/" class="text-primary">
                        Jérôme Augereau
                    </a>
                    . Je suis journaliste en immobilier et je vous propose de découvrir l'actualité
                    du secteur. N'hésitez pas à me contacter pour toute question ou suggestion. Je
                    vous souhaite une bonne lecture.
                </div>
            </div>
        </div>
        <div class="flex flex-col my-8 text-lg">
            <span class="font-semibold my-2">Contact :</span>
            <a
                href="https://www.linkedin.com/in/jerome-augereau/"
                rel="noreferrer"
                target="_blank"
                class="text-gray-400 transition hover:text-primary"
            >
                <span class="sr-only">LinkedIn</span>
                <svg
                    class="h-6 w-6"
                    fill="currentColor"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>LinkedIn</title>
                    <path
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                </svg>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts"></script>
