/* eslint-env node */
const config = require('./project.config.js')
const path = require('node:path')

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js

const ESLintPlugin = require('eslint-webpack-plugin')

const { configure } = require('quasar/wrappers')

module.exports = configure(function (ctx) {
  return {
    // https://v2.quasar.dev/quasar-cli-webpack/supporting-ts
    supportTS: false,

    // https://v2.quasar.dev/quasar-cli-webpack/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-webpack/boot-files
    boot: [
      'i18n',
      'axios'
    ],

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-css
    css: [
      'app.css'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v7',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-build
    build: {
      vueRouterMode: 'hash', // available values: 'hash', 'history'

      // transpile: false,
      // publicPath: '/',

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      // rtl: true, // https://quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://v2.quasar.dev/quasar-cli-webpack/handling-webpack
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain

      chainWebpack (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js', 'vue'] }])
      },

      extendWebpack (cfg) {
        if (config.API_ENDPOINT.toLowerCase() === 'mock') cfg.resolve.alias['@shared/API/API'] = path.resolve(__dirname, './src/shared/API/API.mock')
        if (config.HEALTHSTORE.toLowerCase() === 'mock') cfg.resolve.alias['@shared/healthstore'] = path.resolve(__dirname, './src/shared/healthstore.mock')
        if (config.NOTIFICATIONS.toLowerCase() === 'web') cfg.resolve.alias['@shared/notifications/notifications'] = path.resolve(__dirname, './src/shared/notifications/notifications.web')
        if (config.NOTIFICATIONS.toLowerCase() === 'mock') cfg.resolve.alias['@shared/notifications/notifications'] = path.resolve(__dirname, './src/shared/notifications/notifications.mock')
        if (config.PHONE.toLowerCase() === 'mock') cfg.resolve.alias['@shared/phone/phone'] = path.resolve(__dirname, './src/shared/phone/phone.mock')
        if (config.MIBAND3.toLowerCase() === 'mock') cfg.resolve.alias['@shared/miband3/miband3'] = path.resolve(__dirname, './src/shared/miband3/miband3.mock')
        if (config.PO60.toLowerCase() === 'mock') cfg.resolve.alias['@shared/po60/IPulseOxDevice'] = path.resolve(__dirname, './src/shared/po60/IPulseOxDevice.mock')
        if (config.PEAKFLOW.toLowerCase() === 'mock') cfg.resolve.alias['@shared/peakflow/peakflow'] = path.resolve(__dirname, './src/shared/peakflow/peakflow.mock')
        if (config.STORAGE.toLowerCase() === 'local') cfg.resolve.alias['@shared/storage/storage'] = path.resolve(__dirname, './src/shared/storage/storage.local')
        if (config.STORAGE.toLowerCase() === 'mock') cfg.resolve.alias['@shared/storage/storage'] = path.resolve(__dirname, './src/shared/storage/storage.mock')
        if (config.STORAGE.toLowerCase() === 'encrypted') cfg.resolve.alias['@shared/storage/storage'] = path.resolve(__dirname, './src/shared/storage/storage.encrypted')
        if (config.FILES.toLowerCase() === 'mock') cfg.resolve.alias['@shared/files/files'] = path.resolve(__dirname, './src/shared/files/files.mock')
        cfg.resolve.alias = {
          ...cfg.resolve.alias,
          '@components': path.resolve(__dirname, './src/components'),
          '@shared': path.resolve(__dirname, './src/shared'),
          '@i18n': path.resolve(__dirname, './src/i18n')
        }
      },

      env: {
        // environmental variables passed to the rest of the code
        APP_VERSION: require('./package.json').version,
        API_ENDPOINT: config.API_ENDPOINT
      }

    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-devServer
    devServer: {
      server: {
        type: 'http'
      },
      port: 8080,
      open: true, // opens browser window automatically
      proxy: {
        '/api': { // <- this must be the same as API_ENDPOINT
          target: 'http://localhost:3000', // WARNING: this address can be changed if testing the app on the phone, but any change should NOT be committed. If this is != loclahost, please change it back to localhost.
          changeOrigin: true
        }
      }
    },

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-framework
    framework: {
      config: {
        brand: {
          primary: '#459399',
          secondary: '#71bbcd',
          accent: '#459399',

          dark: '#191919',

          positive: '#65e060',
          negative: '#e83c4b',
          info: '#f0f0f0',
          warning: '#fcc450'
        }
      },

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: ['Notify', 'Dialog']
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://v2.quasar.dev/quasar-cli-webpack/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      maxAge: 1000 * 60 * 60 * 24 * 30,
      // Tell browser when a file from the server should expire from cache (in ms)

      chainWebpackWebserver (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js'] }])
      },

      middlewares: [
        ctx.prod ? 'compression' : '',
        'render' // keep this as last one
      ]
    },

    // https://v2.quasar.dev/quasar-cli-webpack/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW

      // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
      // if using workbox in InjectManifest mode

      chainWebpackCustomSW (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js'] }])
      },

      manifest: {
        name: 'Mobistudy App',
        short_name: 'Mobistudy App',
        description: 'App for participants',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'mobistudyapp'
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain

      chainWebpackMain (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js'] }])
      },

      chainWebpackPreload (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js'] }])
      }

    }
  }
})
