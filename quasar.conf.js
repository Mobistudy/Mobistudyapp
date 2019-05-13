// Configuration for your app

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'axios', 'vuelidate'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons' // optional, you are not bound to it
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
      },
      env: {
        APP_VERSION: JSON.stringify(require('./package.json').version),
        API_ENDPOINT: JSON.stringify('https://ibme-linuxdev.eng.ox.ac.uk:7777'), // use 'MOCK' for mock api, '' for local server or 'https://ibme-linuxdev.eng.ox.ac.uk:7777' for test server
        HEALTHSTORE: JSON.stringify('cordova-health'), // use 'MOCK' for mock healthstore or 'cordova-health' for the cordova health plugin
        NOTIFICATIONS: JSON.stringify('cordova-notification-local') // use 'MOCK' for browser notifications or 'cordova-notification-local' for the cordova plugin
      }
    },
    devServer: {
      // https: true,
      port: 8080,
      open: true, // opens browser window automatically
      proxy: {
        // proxy all requests starting with /api to jsonplaceholder
        '/api': {
          target: 'http://127.0.0.1:3000',
          changeOrigin: true
        }
      }
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      config: {
        cordova: {
          iosStatusBarPadding: false, // add the dynamic top padding on iOS mobile devices
          // backButtonExit: true/false // Quasar handles app exit on mobile phone back button
        }
      },
      components: [
        'QAlert',
        'QAutocomplete',
        'QBtn',
        'QBtnGroup',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardActions',
        'QCheckbox',
        'QChipsInput',
        'QCollapsible',
        'QDatetime',
        'QField',
        'QIcon',
        'QInput',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QItemSeparator',
        'QItemTile',
        'QJumbotron',
        'QLayout',
        'QLayoutHeader',
        'QList',
        'QListHeader',
        'QModal',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QPopover',
        'QRadio',
        'QScrollArea',
        'QStepper',
        'QStep',
        'QStepperNavigation',
        'QSelect',
        'QToggle',
        'QTabs',
        'QTab',
        'QTabPane',
        'QRouteTab',
        'QToolbar',
        'QToolbarTitle'
      ],
      directives: [
        'Ripple',
        'CloseOverlay'
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'Dialog',
        'Loading'
      ]
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      // i18n: 'de' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-16x16.png',
            'sizes': '16x16',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-32x32.png',
            'sizes': '32x32',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.mobistudy.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
