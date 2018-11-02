/* eslint-disable standard/no-callback-literal */
let Db = function () {}

let storage = window.localStorage

Db.prototype.getUserSession = function (cb) {
  let session = storage.getItem('session')
  if (typeof session !== 'undefined') {
    cb(JSON.parse(session))
  } else {
    cb(false)
  }
}

Db.prototype.setUserSession = function (session, cb) {
  storage.setItem('session', JSON.stringify(session))
  cb(true)
}

Db.prototype.rmUserSession = function (cb) {
  storage.removeItem('session')
  cb(true)
}

module.exports = new Db()
