<template>
    <div v-if="isLoading" class="h-screen w-screen flex flex-col items-center justify-center">
        <img src="/logo.png" class="landscape:h-1/6">
    </div>
    <div v-else-if="isError || (!isLoading && data && data.url === null)" class="h-screen w-screen flex flex-col items-center justify-center">
        <img src="/error.png" class="landscape:h-1/6">
        <p v-if="data && data.url === null">Invalid link</p>
        <p v-else>Something wrong happened</p>
    </div>
</template>

<script setup lang="ts">
import {useQuery} from '@tanstack/vue-query'
import { FindLinkBody } from '~/types/link';
import {FetchError} from 'ofetch'

const id = useRoute().params.id

const {isError, isLoading, data, error} = useQuery({
    queryKey: ['find', id],
    queryFn: async (): Promise<FindLinkBody|{url: null}|undefined> => {
        try {
            return {
                url: await $fetch(`/api/find/${id}`)
            }
        } catch (error) {
            if (error instanceof FetchError && error.statusCode === 404)
            return {
                url: null
            }
        }
    },
    retry: false
})

watch(data, (link) => {
    if (link && link.url) window.location.assign(link.url)
})

watch(error, (errorValue) => {
    console.log(errorValue)
})
</script>