
// USE THESE TO TWEAK THE COMPILATION OPTIONS
module.exports = {
  API_ENDPOINT: '/api', // use 'MOCK' for mock api, '/api' for local server
  HEALTHSTORE: 'MOCK', // use 'MOCK' for mock healthstore or 'cordova' for the cordova health plugin
  NOTIFICATIONS: 'WEB', // use 'WEB' for browser notifications or 'cordova' for the cordova plugin
  STORAGE: 'local', // use 'local' for browser localStorage or 'native' for cordova native storage, 'encrypted' for encrypted native
  PHONE: 'MOCK', // use 'MOCK' for mocked phone functionalities or 'cordova' otherwise
  MIBAND3: 'MOCK', // use 'MOCK' for mocked tracker or 'driver' otherwise
  PO60: 'driver' // use 'MOCK' for mocked pulse oximeter or 'driver' otherwise
}
