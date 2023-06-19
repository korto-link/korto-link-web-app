import { Toucan } from "toucan-js"

export default defineEventHandler((event) => {
    const sentry = new Toucan({
        dsn: useRuntimeConfig(event).app.sentry.apiDsn
    })

    event.context.sentry = sentry
})