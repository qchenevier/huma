const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/huma/',
        },
      }
    : {}

const HOSTNAME =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? 'https://qchenevier.github.io'
    : 'http://localhost:3000'

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'A blog about Humans & Machines',
      },
      {
        name: 'google-site-verification',
        content: 'T0qiHh85bpmmZw1lNNl9jk64tVQ07XHiGetTgCzo9BY',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    // Doc: https://sitemap.nuxtjs.org/guide/setup
    '@nuxtjs/sitemap',
  ],
  hooks: {
    'content:file:beforeInsert': (document) => {
      if (document.extension === '.md') {
        const { text } = require('reading-time')(document.text)
        document.readingTime = text
      }
    },
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {
    nestedProperties: ['tags.tag'],
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  ...routerBase,
  generate: {
    fallback: true,
  },
  sitemap: {
    hostname: HOSTNAME,
    gzip: true,
    routes: [
      'about',
      'how-to-value-information',
      'data-science-has-something-to-teach-you-about-agile',
      'france-elections-ML-part1',
    ],
  },
}
