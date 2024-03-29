// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
// const webpack = require('webpack')
const config = require('./project.config.js')

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files
    boot: [
      'i18n',
      'axios',
      'vuelidate'
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.css'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v4',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      // iconSet: 'ionicons-v4', // Quasar icon set
      // lang: 'de', // Quasar language pack

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      all: 'auto',

      components: [
        'QTabPanels',
        'QTabPanel',
        'QTabs',
        'QTab',
        'QRouteTab',
        'GoBack',
        'QBtn'
      ],
      directives: [],

      // Quasar plugins
      plugins: [
        'Notify',
        'Dialog',
        'Loading'
      ]
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
    supportIE: false,

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // showProgress: false,
      // gzip: true,
      // analyze: true,
      // preloadChunks: false,
      // extractCSS: false,
      env: {
        // environmental variables passed to the rest of the code
        APP_VERSION: require('./package.json').version,
        API_ENDPOINT: config.API_ENDPOINT
      },
      // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish')
          }
        })
        cfg.resolve.alias['i18n/(.*)$'] = 'src/i18n/$1'
        cfg.resolve.alias['moment$'] = 'moment/moment.js'
        if (!cfg.resolve.modules) cfg.resolve.modules = []
        cfg.resolve.modules.push('./src')
        if (config.API_ENDPOINT.toLowerCase() === 'mock') cfg.resolve.alias['modules/API/API'] = 'modules/API/API.mock'
        if (config.HEALTHSTORE.toLowerCase() === 'mock') cfg.resolve.alias['modules/healthstore'] = 'modules/healthstore.mock'
        if (config.NOTIFICATIONS.toLowerCase() === 'web') cfg.resolve.alias['modules/notifications/notifications'] = 'modules/notifications/notifications.web'
        if (config.NOTIFICATIONS.toLowerCase() === 'mock') cfg.resolve.alias['modules/notifications/notifications'] = 'modules/notifications/notifications.mock'
        if (config.PHONE.toLowerCase() === 'mock') cfg.resolve.alias['modules/phone/phone'] = 'modules/phone/phone.mock'
        if (config.MIBAND3.toLowerCase() === 'mock') cfg.resolve.alias['modules/miband3/miband3'] = 'modules/miband3/miband3.mock'
        if (config.PO60.toLowerCase() === 'mock') cfg.resolve.alias['modules/po60/IPulseOxDevice'] = 'modules/po60/IPulseOxDevice.mock'
        if (config.PEAKFLOW.toLowerCase() === 'mock') cfg.resolve.alias['modules/peakflow/peakflow'] = 'modules/peakflow/peakflow.mock'
        if (config.STORAGE.toLowerCase() === 'local') cfg.resolve.alias['modules/storage/storage'] = 'modules/storage/storage.local'
        if (config.STORAGE.toLowerCase() === 'mock') cfg.resolve.alias['modules/storage/storage'] = 'modules/storage/storage.mock'
        if (config.STORAGE.toLowerCase() === 'encrypted') cfg.resolve.alias['modules/storage/storage'] = 'modules/storage/storage.encrypted'
        if (config.FILES.toLowerCase() === 'mock') cfg.resolve.alias['modules/files/files'] = 'modules/files/files.mock'
      }
    },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      // https: true,
      // port: 8080,
      open: true, // opens browser window automatically
      proxy: {
        '/api': { // <- this must be the same as API_ENDPOINT
          target: 'http://localhost:3000', // WARNING: this address can be changed if testing the app on the phone, but any change should NOT be committed. If this is != loclahost, please change it back to localhost.
          changeOrigin: true
        }
      }
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [
      'fadeIn',
      'fadeOut',
      'slideInDown',
      'slideInRight',
      'slideInLeft',
      'slideOutUp'
    ],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'Mobistudy App',
        // short_name: 'Mobistudy App',
        // description: 'The participants' app of Mobistudy',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    // https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // id: 'org.mobistudy.app',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      // hideSplashscreen: false
    },

    // https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      // bundler: 'builder', // or 'packager'

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

        // appId: 'mobistudyapp'
      },

      // keep in sync with /src-electron/main-process/electron-main
      // > BrowserWindow > webPreferences > nodeIntegration
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      }
    }
  }
}
