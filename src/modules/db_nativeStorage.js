/* eslint-disable standard/no-callback-literal */
let Db = function () {}

let storage = window.NativeStorage

Db.prototype.getUserSession = function (cb) {
  storage.getItem('session', function (res) {
    cb(res)
  })
}

Db.prototype.setUserSession = function (session, cb) {
  storage.setItem('session', session, function (res) {
    cb(true)
  }, function () {
    cb(false)
  })
}

Db.prototype.rmUserSession = function (cb) {
  storage.removeItem('session', function (res) {
    cb(true)
  }, function () {
    cb(false)
  })
}

module.exports = new Db()
