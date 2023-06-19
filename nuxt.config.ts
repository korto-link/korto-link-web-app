// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@formkit/nuxt', '@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt'],
  runtimeConfig: {
    app: {
      sentry: {
        enabled: process.env.NODE_ENV === 'production',
        apiDsn: process.env.SENTRY_API_DSN
      }
    },
    public: {
      docsUrl: process.env.DOCS_URL,
      githubUrl: process.env.GITHUB_URL,
      termsOfServiceUrl: process.env.TERMS_OF_SERVICE_URL,
      sentry: {
        dsn: process.env.SENTRY_DSN
      }
    },
  },
  ssr: false
})
