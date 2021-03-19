
// USE THESE TO TWEAK THE COMPILATION OPTIONS
module.exports = {
  API_ENDPOINT: 'https://app.mobistudy.org/api', // use 'MOCK' for mock api, '/api' for local server
  HEALTHSTORE: 'cordova', // use 'MOCK' for mock healthstore or 'cordova' for the cordova health plugin
  NOTIFICATIONS: 'cordova', // use 'WEB' for browser notifications or 'cordova' for the cordova plugin
  STORAGE: 'encrypted', // use 'local' for browser localStorage or 'native' for cordova native storage, 'encrypted' for encrypted native
  PHONE: 'cordova', // use 'MOCK' for mocked phone functionalities or 'cordova' otherwise
  MIBAND3: 'cordova', // use 'MOCK' for mocked tracker or 'cordova' otherwise
  PO60: 'cordova' // use 'MOCK' for mocked pulse oximeter or 'cordova' otherwise
}
