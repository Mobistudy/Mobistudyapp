
// USE THESE TO TWEAK THE COMPILATION OPTIONS
module.exports = {
  // use 'MOCK' for mock api, '/api' for local server, 'https://app.mobistudy.org/api' for real server
  API_ENDPOINT: 'https://app.mobistudy.org/api',

  // use 'MOCK' for mock healthstore or 'cordova' for the cordova health plugin
  HEALTHSTORE: 'cordova',

  // use 'MOCK' for mock , 'WEB' for browser notifications or 'cordova' for the cordova plugin
  NOTIFICATIONS: 'cordova',

  // use 'MOCK' for mock, 'local' for browser localStorage or 'encrypted' for encrypted native
  STORAGE: 'encrypted',

  // use 'MOCK' for mocked phone functionalities or 'cordova' otherwise
  PHONE: 'cordova',

  // use 'MOCK' for mocked tracker or 'cordova' otherwise
  MIBAND3: 'cordova',

  // use 'MOCK' for mocked pulse oximeter or 'cordova' otherwise
  PO60: 'cordova',

  // API key for https://openweathermap.org/
  API_KEY_OPENWEATHER: '',

  // API key for https://www.getambee.com/
  API_KEY_AMBEE: ''
}
