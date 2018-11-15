/* eslint-disable standard/no-callback-literal */

// ************************************
// * THIS ENTIRE CODEBASE IS UNTESTED *
// ************************************

let storage = window.NativeStorage

export function getUserSession () {
  return storage.getItem('session', function (res) {
    return Promise.resolve(res)
  }, function (err) {
    return Promise.reject(err)
  })
}

export function setUserSession (session) {
  return storage.setItem('session', session, function (res) {
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

export function pushToServerQueue (obj) {
  storage.getItem('serverQueue', function (res) {
    res.push(obj)
    storage.setItem('serverQueue', res, function (res) {
      return Promise.resolve(true)
    }, function (err) {
      return Promise.reject(err)
    })
  }, function (e) {
    storage.setItem('serverQueue', [obj], function (res) {
      return Promise.resolve(true)
    }, function (err) {
      return Promise.reject(err)
    })
  })
}

export function retrieveServerQueue () {
  storage.getItem('serverQueue', function (res) {
    return Promise.resolve(res)
  }, function (e) {
    return Promise.resolve([])
  })
}

export function clearServerQueue () {
  storage.remove('serverQueue', function (res) {
    return Promise.resolve(true)
  }, function (err) {
    return Promise.reject(err)
  })
}
