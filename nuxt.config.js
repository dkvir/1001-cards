// https://nuxt.com/docs/api/configuration/nuxt-config
import favicon from "./config/favicon";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: ["@pinia/nuxt", "nuxt-icons", "@vueuse/nuxt", "nuxt-gtag", "@nuxtjs/device"],
  runtimeConfig: {
    public: {
      siteUrl: process.env.PUBLIC_SITE_URL,
    },
  },
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
        { name: "pinterest", content: "nopin" },
        { name: "google", content: "notranslate" },
        // ...favicon.meta,
      ],
      link: [...favicon.links],
      script: [{ src: "/js/InertiaPlugin.min.js" }],
    },
  },
  gtag: {
    id: "G-21R6N9EPX6",
  },
  css: ["@/assets/sass/style.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          api: "modern-compiler",
          silenceDeprecations: [
            "legacy-js-api",
            "mixed-decls",
            "color-functions",
            "global-builtin",
            "import",
          ],
          additionalData: '@import "@/assets/sass/app.scss";',
        },
      },
    },
  },
  build: {
    transpile: ["three"],
  },
});