import DB from './db'

/**
* Simple object store of user information
*/
export default {
  async init () {
    this.user = await DB.getUserSession()

    if (!this.user) {
      this.user = {
        loggedin: false
      }
    } else this.user.loggedin = true
  },
  async login (newuser) {
    this.user.loggedin = true
    this.user._key = newuser._key
    this.user.email = newuser.email
    this.user.serverUrl = newuser.serverUrl
    this.user.token = newuser.token
    return DB.setUserSession(this.user)
  },
  async setProfile (profile) {
    this.user.participantKey = profile._key
    this.user.name = profile.name
    this.user.surname = profile.surname
    this.user.dob = profile.dateOfBirth
    this.user.weight = profile.weight
    this.user.height = profile.height
    this.user.sex = profile.sex
    this.user.language = profile.language
    return DB.setUserSession(this.user)
  },
  async logout () {
    this.user = {
      loggedin: false
    }
    return DB.removeUserSession()
  }
}
