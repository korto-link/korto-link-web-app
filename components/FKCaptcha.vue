<template>
    <NuxtTurnstile v-if="loaded" @update:modelValue="($event) => onUpdated($event)" :style="{display: visible ? 'flex': 'none'}" />
</template>

<script setup lang="ts">
import { get, set } from '@vueuse/core';

const props = defineProps<{
    context: any,
}>()

const loaded = ref(false)
const visible = ref(true)
const token = ref(null)

useHead({
  script: [
    {
      async: true,
      src: 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit',
    },
  ],
})

declare global {
    interface Window {
        turnstile: any
    }
}

onMounted(() => {
  const interval = setInterval(() => {
    if (window && window.turnstile) {
      clearInterval(interval);
      set(loaded, true)
    }
  }, 100);
})

const onUpdated = (value: string) => {
    props.context.node.input(value)
    set(token, value)
}

const reset = async () => {
  console.log('resetted')
  set(loaded, false)
  await wait(1000)
  set(loaded, true)
}

watch(props.context, (value, oldValue) => {
    if (typeof value.attrs.visible === 'boolean') {
        set(visible, value.attrs.visible)
    }

    if (get(token) !== null && typeof value.node.value === 'undefined') {
      reset()
    }
})
</script>