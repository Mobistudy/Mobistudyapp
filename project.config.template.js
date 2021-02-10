
// USE THESE TO TWEAK THE COMPILATION OPTIONS
module.exports = {
<<<<<<< HEAD
  API_ENDPOINT: '/api', // use 'MOCK' for mock api, '/api' for local server
  HEALTHSTORE: 'MOCK', // use 'MOCK' for mock healthstore or 'cordova' for the cordova health plugin
  NOTIFICATIONS: 'WEB', // use 'WEB' for browser notifications or 'cordova' for the cordova plugin
  STORAGE: 'local', // use 'local' for browser localStorage or 'native' for cordova native storage, 'encrypted' for encrypted native
  PHONE: 'MOCK', // use 'MOCK' for mocked phone functionalities or 'cordova' otherwise
  MIBAND3: 'MOCK', // use 'MOCK' for mocked tracker or 'driver' otherwise
=======
  API_ENDPOINT: 'https://app.mobistudy.org/api', // use 'MOCK' for mock api, '/api' for local server
  HEALTHSTORE: 'cordova', // use 'MOCK' for mock healthstore or 'cordova' for the cordova health plugin
  NOTIFICATIONS: 'cordova', // use 'WEB' for browser notifications or 'cordova' for the cordova plugin
  STORAGE: 'encrypted', // use 'local' for browser localStorage or 'native' for cordova native storage, 'encrypted' for encrypted native
  PHONE: 'cordova', // use 'MOCK' for mocked phone functionalities or 'cordova' otherwise
  MIBAND3: 'driver', // use 'MOCK' for mocked tracker or 'driver' otherwise
>>>>>>> f2fbe2881635f15bf6abe1da6e176ec3f99ff74f
  PO60: 'driver' // use 'MOCK' for mocked pulse oximeter or 'driver' otherwise
}
