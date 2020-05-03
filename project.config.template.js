
// USE THESE TO TWEAK THE COMPILATION OPTIONS
module.exports = {
  API_ENDPOINT: 'MOCK', // use 'MOCK' for mock api, '/api' for local server
  HEALTHSTORE: 'MOCK', // use 'MOCK' for mock healthstore or 'cordova-health' for the cordova health plugin
  NOTIFICATIONS: 'WEB', // use 'WEB' for browser notifications or 'cordova-notification-local' for the cordova plugin
  STORAGE: 'local', // use 'local' for browser localStorage or 'native' for cordova native storage
  PHONE: 'MOCK', // use 'MOCK' for mocked phone functionalities or 'cordova' otherwise
  MAPS_API: 'XXXXXXXXXX' // Google Maps API key
}
