export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/content', '@tresjs/nuxt'],

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2026-11-01',

  vite: {
    optimizeDeps: {
      include: ['three']
    }
  },

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    storageKey: 'intro-color-mode'
  },

  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})
