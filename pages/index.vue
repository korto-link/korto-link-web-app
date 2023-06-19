<template>
  <div>
    <div class="bg-white">
      <header class="absolute inset-x-0 top-0 z-50">
        <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div class="flex lg:flex-1">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">{{ appName }}</span>
              <img class="h-8 w-auto" src="/logo.png" alt="" />
            </a>
          </div>
        </nav>
      </header>

      <div class="relative isolate px-6 pt-14 lg:px-8">
        <div class="mx-auto max-w-2xl py-6 sm:py-48 lg:py-56">
          <div class="hidden sm:mb-8 sm:flex sm:justify-center">
            <div v-if="docsUrl"
              class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Learn about the project. <nuxt-link :to="docsUrl" class="font-semibold text-primary-600"><span
                  class="absolute inset-0" aria-hidden="true" />Docs <span aria-hidden="true">&rarr;</span></nuxt-link>
            </div>
            <div v-else
              class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Docs coming soon...
            </div>
          </div>
          <div class="text-center">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Yet another open-source URL shortener
            </h1>
            <p class="mt-2 sm:mt-6 texl-xl sm:text-lg leading-8 text-gray-600">Make your own URL shortener website to create shorter,
              shareable
              links with ease</p>
            <div class="mt-4 sm:mt-10 flex-col items-center justify-center gap-x-6">
              <FormKit type="form" :plugins="[zodPlugin]" :actions="false" @submit="submitHandler"
                class="sm:mx-auto sm:max-w-xl lg:mx-0 w-full" :incomplete-message="false" #default="{ value }">
                <div class="sm:flex">
                  <div class="min-w-0 flex-1">
                    <label for="url" class="sr-only">URL</label>
                    <FormKit id="url" type="text" name="url" placeholder="Enter your URL"
                      input-class="block w-full rounded-md border-0 ring ring-primary-100 formkit-loading:ring-gray-100 focus:outline-none focus:ring focus:ring-primary-600 px-4 py-3 text-base text-gray-900 placeholder-gray-500"
                      message-class="text-left text-sm mt-1 text-error" />
                  </div>
                  <div class="mt-3 sm:ml-3 sm:mt-0">
                    <FormKit v-if="value.captcha" type="submit"
                      input-class="block w-full rounded-md bg-primary-600 formkit-loading:bg-gray-400 hover:bg-primary-500 px-6 py-3 font-medium text-white shadow focus:outline-none formkit-loading:outline-none focus:ring-2 formkit-loading:ring-0 focus:ring-primary-600 focus:ring-offset-2">
                      Make
                      it korto</FormKit>
                    <FormKit :type="captcha" name="captcha" :visible="value.captcha === undefined" />
                  </div>
                </div>
              </FormKit>
              <p class="mt-3 text-sm text-gray-400 sm:mt-4">
                By sending you agree to our <a :href="termsOfServiceUrl" target="_blank"
                  class="font-medium underline">terms of service</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <UrlModal :url="generatedUrl" @close="onClose" />

    <footer class="bg-white sm:absolute sm:bottom-0 w-full">
      <div class="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div class="flex justify-center space-x-6 md:order-2">
          <a :href="githubUrl" target="_blank" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Github</span>
            <svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="1em"
              viewBox="0 0 496 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg>
          </a>
        </div>
        <div class="mt-8 md:order-1 md:mt-0">
          <p class="text-center text-xs leading-5 text-gray-500">&copy; 2023 Kiube. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { createInput } from '@formkit/vue'
import { createZodPlugin } from '@formkit/zod'
import { set } from '@vueuse/core';
import { Link } from '../types/link'
import FKCaptcha from '~/components/FKCaptcha.vue';

const captcha = createInput(FKCaptcha)

const generatedUrl = ref(null)

const appName = computed(() => {
  return useAppConfig().name
})

const docsUrl = computed(() => {
  return useRuntimeConfig().public.docsUrl
})

const githubUrl = computed(() => {
  return useRuntimeConfig().public.githubUrl
})

const termsOfServiceUrl = computed(() => {
  return useRuntimeConfig().public.termsOfServiceUrl
})

const schema = z.object({
  url: z.string().url(),
  captcha: z.string()
})

const [zodPlugin, submitHandler] = createZodPlugin(schema, async (data, node) => {
  const link = await $fetch<Link>('/api/create', {
    method: 'post',
    body: data
  })

  set(generatedUrl, link.url)
  node?.reset()
})

const onClose = () => {
  set(generatedUrl, null)
}
</script>
