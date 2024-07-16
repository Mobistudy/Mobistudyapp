/**
 * Simple store for keeping variables used across components, or for passing
 * complex params when vue router doesn't allow (vue router only allows simple params, such as strings)
 * We could use Pinia or similar, but this uses session storage which survives page refreshes
 */
export default {

  /**
   * Session store for server connection.
   * @typedef {Object} ServerInfo
   * @property {string} token - JWT token
   * @property {string} serverUrl - main endpoint URL of the server API
   */

  /**
   * Session store for server connection.
   * @typedef {Object} UserInfo
   * @property {string} userKey - key of the user
   * @property {string} email - email address of the user
   * @property {string} language - language of the user
   */

  /**
   * Session store for user details.
   * @typedef {Object} UserSession
   * @property {UserInfo} user - session of the server connection
   * @property {ServerInfo} server - session of the server connection
   */

  /**
   * Stores the current user session
   * @param {UserSession} session - the current session
   */
  setUserSession (session) {
    sessionStorage.setItem('userSession', JSON.stringify(session))
  },

  /**
   * Gets the current user session
   * @param {UserSession} key
   */
  getUserSession () {
    return JSON.parse(sessionStorage.getItem('userSession'))
  },

  /**
   * Deletes the current user session
   */
  removeUserSession () {
    return sessionStorage.removeItem('userSession')
  }
}
