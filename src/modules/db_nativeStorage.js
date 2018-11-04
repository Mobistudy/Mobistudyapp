/* eslint-disable standard/no-callback-literal */

let storage = window.NativeStorage

export function getUserSession () {
  storage.getItem('session', function (res) {
    return Promise.resolve(res)
  }, function (err) {
    return Promise.reject(err)
  })
}

export function setUserSession (session) {
  storage.setItem('session', session, function (res) {
    return Promise.resolve(true)
  }, function (err) {
    return Promise.reject(err)
  })
}

export function rmUserSession () {
  storage.remove('session', function (res) {
    return Promise.resolve(true)
  }, function (err) {
    return Promise.reject(err)
  })
}
