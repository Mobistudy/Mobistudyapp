import DB from './db'

/**
* Simple object store ofr user information
*/
export default {
  async init () {
    this.user = await DB.getUserSession()
    if (!this.user) {
      this.user = {
        loggedin: false,
        _key: undefined,
        email: undefined,
        token: undefined,
        name: undefined,
        surname: undefined,
        gender: undefined,
        dob: undefined,
        language: undefined
      }
    } else this.user.loggedin = true
  },
  async login (newuser) {
    this.user.loggedin = true
    this.user._key = newuser._key
    this.user.email = newuser.email
    this.user.token = newuser.token
    await DB.setUserSession(this.user)
  },
  async setProfile (profile) {
    this.user.name = profile.name
    this.user.surname = profile.surname
    this.user.dob = profile.dateOfBirth
    this.user.gender = profile.gender
    this.user.language = profile.language
    await DB.setUserSession(this.user)
  },
  logout () {
    this.user = {
      loggedin: false,
      _key: undefined,
      email: undefined,
      token: undefined,
      name: undefined,
      surname: undefined,
      gender: undefined,
      dob: undefined,
      language: undefined
    }
    DB.removeUserSession()
  }
}
