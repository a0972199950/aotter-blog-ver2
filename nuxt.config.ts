import { Configuration } from '@nuxt/types';

const config: Configuration = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [
    "~/assets/scss/app.scss",
    "quill/dist/quill.core.css",
    "quill/dist/quill.snow.css",
    "quill/dist/quill.bubble.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/filters",
    "~/plugins/font-awesome",
    "~/plugins/axios",
    "~/plugins/sweetAlert",
    "~/plugins/vuelidate",
    { src: "~/plugins/vue-quill-editor", mode: "client" },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '~/modules/api'
  ],
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.BASE_URL || "http://localhost:3000"
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
    },

  },
  // serverMiddleware: [
  //   { path: "/api", handler: "~/server/index.ts" }
  // ]
}

export default config;
