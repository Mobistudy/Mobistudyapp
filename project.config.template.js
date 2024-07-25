// USE THESE TO TWEAK THE COMPILATION OPTIONS
module.exports = {
  // use 'MOCK' for mock api, 'OFFICIAL' for official server, anything else for testing, for example '/api' for local server
  API_ENDPOINT: 'OFFICIAL',

  // use 'MOCK' for mock healthstore or 'cordova' for the cordova health plugin
  HEALTHSTORE: 'cordova',

  // use 'MOCK' for mock , 'WEB' for browser notifications or 'cordova' for the cordova plugin
  NOTIFICATIONS: 'cordova',

  // use 'MOCK' for mock, 'local' for browser localStorage or 'encrypted' for encrypted native
  // note that when using MOCK the session storage is also mocked, that is it's not persistent
  STORAGE: 'encrypted',

  // use 'MOCK' for mock healthstore or 'cordova' for the cordova health plugin
  FILES: 'cordova',

  // use 'MOCK' for mocked phone functionalities or 'cordova' otherwise
  PHONE: 'cordova',

  // use 'MOCK' for mocked BLE devices, 'WEB' for web BLE api (Chrome only) or 'cordova' for the real ones
  // this affects all BLE devices!
  BLE: 'cordova',

  // use 'MOCK' for mocked peak flow meter or 'cordova' otherwise
  PEAKFLOW: 'MOCK'
}
