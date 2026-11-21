export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/content', '@tresjs/nuxt', '@nuxt/fonts'],

  fonts: {
    families: [
      { name: 'Geist', provider: 'google', subsets: ['latin'] },
      { name: 'Geist Mono', provider: 'google', subsets: ['latin'] },
      { name: 'Instrument Serif', provider: 'google', subsets: ['latin'], styles: ['normal', 'italic'] },
      { name: 'Noto Sans SC', provider: 'google', global: true }
    ]
  },

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
