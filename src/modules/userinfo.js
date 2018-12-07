import DB from './db'

/**
* Simple object store ofr user information
*/
console.log('!!!!!!!!!!!!!!!!!!')
export default {
  async init () {
    this.user = await DB.getUserSession()
    if (!this.user) {
      this.user = {
        loggedin: false,
        _key: undefined,
        token: undefined
      }
    }
  },
  login (newuser) {
    this.user.loggedin = true
    this.user._key = newuser._key
    this.user.token = newuser.token
    DB.setUserSession(newuser)
  },
  logout () {
    this.user = {
      loggedin: false,
      _key: undefined,
      token: undefined
    }
    DB.removeUserSession()
  }
}
