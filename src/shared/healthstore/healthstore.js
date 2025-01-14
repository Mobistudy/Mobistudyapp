export default {
  isAvailable: async function () {
    return new Promise((resolve, reject) => {
      if (!navigator.health) reject(new Error('Cordova Health is not installed'))
      navigator.health.isAvailable(resolve, reject)
    })
  },

  promptInstallFit: async function () {
    return new Promise((resolve, reject) => {
      if (!navigator.health) reject(new Error('Cordova Health is not installed'))
      navigator.health.promptInstallFit(resolve, reject)
    })
  },

  requestAuthorization: async function (datatypes) {
    return new Promise((resolve, reject) => {
      if (!navigator.health) reject(new Error('Cordova Health is not installed'))
      navigator.health.requestAuthorization(datatypes, resolve, reject)
    })
  },

  isAuthorized: async function (datatypes) {
    return new Promise((resolve, reject) => {
      if (!navigator.health) reject(new Error('Cordova Health is not installed'))
      navigator.health.isAuthorized(datatypes, resolve, reject)
    })
  },

  disconnect: async function () {
    return new Promise((resolve, reject) => {
      if (!navigator.health) reject(new Error('Cordova Health is not installed'))
      navigator.health.disconnect(resolve, reject)
    })
  },

  query: async function (queryOpts) {
    return new Promise((resolve, reject) => {
      if (!navigator.health) reject(new Error('Cordova Health is not installed'))

      // we always need to request authorization before querying
      // this is needed for Android particularly
      navigator.health.requestAuthorization([{
        read: [queryOpts.dataType]
      }], () => {
        navigator.health.query(queryOpts, resolve, reject)
      }, reject)
    })
  },

  queryAggregated: async function (queryOpts) {
    return new Promise((resolve, reject) => {
      if (!navigator.health) reject(new Error('Cordova Health is not installed'))

      // we always need to request authorization before querying
      // this is needed for Android particularly
      navigator.health.requestAuthorization([{
        read: [queryOpts.dataType]
      }], () => {
        navigator.health.queryAggregated(queryOpts, resolve, reject)
      }, reject)
    })
  }

}
