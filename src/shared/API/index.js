// API implementation
import axios from 'axios'

let axiosConfig = {}

export default {
  baseURL: '',
  getServersList: () => {
    return [
      {
        id: 'malmo',
        url: process.env.API_ENDPOINT === 'OFFICIAL' ? 'https://app.mobistudy.org/api' : process.env.API_ENDPOINT,
        names: {
          en: 'Malmo University',
          sv: 'Malmö Universitet',
          es: 'Universidad de Malmo',
          it: 'Università di Malmo'
        }
      },
      {
        id: 'ucbm',
        url: process.env.API_ENDPOINT === 'OFFICIAL' ? 'https://mobistudy.ucbm.it/api' : process.env.API_ENDPOINT,
        names: {
          en: 'Campus Bio Medico University of Rome',
          sv: 'Campus Bio Medico universitetet i Rom',
          es: 'Universidad Campus Bio-Medico de Roma',
          it: 'Università Campus Bio-Medico di Roma'
        }
      }
    ]
  },
  setBaseUrl (url) {
    this.baseURL = url
  },
  setToken (newtoken) {
    axiosConfig = {
      headers: {
        Authorization: 'Bearer ' + newtoken
      }
    }
  },
  unsetToken () {
    axiosConfig = {}
  },
  // Log in
  async login (email, password) {
    const resp = await axios.post(this.baseURL + '/login', { email, password })
    return resp.data
  },
  // Registration
  async registerUser (email, password) {
    return axios.post(this.baseURL + '/users', {
      email,
      password,
      role: 'participant'
    })
  },
  // Password reset
  async resetPW (email) {
    return axios.post(this.baseURL + '/sendResetPasswordEmail', { email })
  },
  // Change password
  async changePW (token, newpw) {
    return axios.post(this.baseURL + '/resetPassword', { token, password: newpw })
  },
  async searchDiseaseConcept (disease, lang) {
    const resp = await axios.get(this.baseURL + '/vocabulary/' + lang + '/disorder/search?term=' + disease + '&limit=10')
    return resp.data
  },
  async searchMedicationConcept (med, lang) {
    const resp = await axios.get(this.baseURL + '/vocabulary/' + lang + '/substance/search?term=' + med + '&limit=10')
    return resp.data
  },
  /// ////////////////////////////////////
  // from here on, we need to use tokens
  /// ////////////////////////////////////

  // token renewal
  async renewToken () {
    const resp = await axios.get(this.baseURL + '/users/renewToken', axiosConfig)
    return resp.data
  },

  // Create the participant profile
  async createProfile (profile) {
    const resp = axios.post(this.baseURL + '/participants', profile, axiosConfig)
    return resp.data
  },

  // Get the participant profile
  async getProfile (userKey) {
    const resp = await axios.get(this.baseURL + '/participants/byuserkey/' + userKey, axiosConfig)
    return resp.data
  },

  // Updating details
  async updateProfile (profile) {
    return axios.patch(this.baseURL + '/participants/byuserkey/' + profile.userKey, profile, axiosConfig)
  },

  // Permanently delete the user
  async deleteUser (userKey) {
    return axios.delete(this.baseURL + '/participants/byuserkey/' + userKey, axiosConfig)
  },

  // update status of a study
  async updateStudyStatus (userKey, studyKey, studyParticipation) {
    return axios.patch(this.baseURL + `/participants/byuserkey/${userKey}/studies/${studyKey}`, studyParticipation, axiosConfig)
  },

  // update status of a task item consent
  async updateTaskItemConsent (userKey, studyKey, taskId, taskItemConsent) {
    return axios.patch(this.baseURL + `/participants/byuserkey/${userKey}/studies/${studyKey}/taskItemsConsent/${taskId}`, taskItemConsent, axiosConfig)
  },

  // retrieves study descritpion
  async getStudyDescription (studyKey) {
    const resp = await axios.get(this.baseURL + '/studies/' + studyKey, axiosConfig)
    return resp.data
  },

  // retrieves the keys of the new studies already filtered out by inclusion criteria
  async getNewStudiesKeys () {
    const resp = await axios.get(this.baseURL + '/studies/newStudies/', axiosConfig)
    return resp.data
  },

  // retrieves an invitational study based on a code
  async getInvitationalStudy (invitationalCode) {
    const resp = await axios.get(this.baseURL + `/studies/invitational/${invitationalCode}`, axiosConfig)
    return resp.data
  },

  // gets a form given its key
  async getForm (formKey) {
    const resp = await axios.get(this.baseURL + '/forms/' + formKey, axiosConfig)
    return resp.data
  },

  // sends an attachment file, returns the file name chosen by the server
  async sendAttachment (studyKey, taskId, filename, fileData) {
    const config = {
      method: 'post',
      url: this.baseURL + '/attachments/' + studyKey + '/' + taskId,
      params: { filename },
      headers: {
        Authorization: axiosConfig.headers.Authorization,
        'Content-Type': 'application/octet-stream'
      },
      data: fileData
    }

    const resp = await axios(config)
    return resp.data
  },

  // get environment data from position
  async getEnvironmentFromPosition (lat, long) {
    const resp = await axios.get(this.baseURL + '/environment?lat=' + lat + '&long=' + long, axiosConfig)
    return resp.data
  },

  // send tasks results data
  async sendTasksResults (data) {
    return axios.post(this.baseURL + '/tasksResults', data, axiosConfig)
  }

}
