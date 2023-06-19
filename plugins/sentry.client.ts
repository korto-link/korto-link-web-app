import { init } from "@sentry/vue";

export default defineNuxtPlugin(({vueApp}) => {
    if (useRuntimeConfig().app.sentry.enabled) {
        init({
            app: vueApp,
            dsn: useRuntimeConfig().public.sentry.dsn
        })
    }

    init({
        app: vueApp,
        dsn: useRuntimeConfig().public.sentry.dsn
    })
})