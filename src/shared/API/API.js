// API implementation
import axios from 'axios'

const BASE_URL = process.env.API_ENDPOINT
let axiosConfig = {}

export default {
  getServersList: () => {
    return [
      {
        en: 'Malmo University',
        sv: 'Malmö Universitet',
        es: 'Universidad de Malmo',
        it: 'Università di Malmo'
      },
      {
        en: 'Campus Bio Medico University of Rome',
        sv: 'Campus Bio Medico universitetet i Rom',
        es: 'Universidad Campus Bio-Medico de Roma',
        it: 'Università Campus Bio-Medico di Roma'
      }
    ]
  },
  setToken: (newtoken) => {
    axiosConfig = {
      headers: {
        Authorization: 'Bearer ' + newtoken
      }
    }
  },
  unsetToken: () => {
    axiosConfig = {}
  },
  // Log in
  login: async (email, password) => {
    const resp = await axios.post(BASE_URL + '/login', { email, password })
    return resp.data
  },
  // Registration
  registerUser: async (email, password) => {
    return axios.post(BASE_URL + '/users', {
      email,
      password,
      role: 'participant'
    })
  },
  // Password reset
  resetPW: async (email) => {
    return axios.post(BASE_URL + '/sendResetPasswordEmail', { email })
  },
  // Change password
  changePW: async (token, newpw) => {
    return axios.post(BASE_URL + '/resetPassword', { token, password: newpw })
  },
  searchDiseaseConcept: async (disease, lang) => {
    const resp = await axios.get(BASE_URL + '/vocabulary/' + lang + '/disorder/search?term=' + disease + '&limit=10')
    return resp.data
  },
  searchMedicationConcept: async (med, lang) => {
    const resp = await axios.get(BASE_URL + '/vocabulary/' + lang + '/substance/search?term=' + med + '&limit=10')
    return resp.data
  },
  /// ////////////////////////////////////
  // from here on, we need to use tokens
  /// ////////////////////////////////////

  // token renewal
  renewToken: async () => {
    const resp = await axios.get(BASE_URL + '/users/renewToken', axiosConfig)
    return resp.data
  },

  // Create the participant profile
  createProfile: async function (profile) {
    const resp = axios.post(BASE_URL + '/participants', profile, axiosConfig)
    return resp.data
  },

  // Get the participant profile
  getProfile: async function (userKey) {
    const resp = await axios.get(BASE_URL + '/participants/byuserkey/' + userKey, axiosConfig)
    return resp.data
  },

  // Updating details
  updateProfile: async function (profile) {
    return axios.patch(BASE_URL + '/participants/byuserkey/' + profile.userKey, profile, axiosConfig)
  },

  // Permanently delete the user
  deleteUser: async function (userKey) {
    return axios.delete(BASE_URL + '/participants/byuserkey/' + userKey, axiosConfig)
  },

  // update status of a study
  updateStudyStatus: async function (userKey, studyKey, studyParticipation) {
    return axios.patch(BASE_URL + `/participants/byuserkey/${userKey}/studies/${studyKey}`, studyParticipation, axiosConfig)
  },

  // update status of a task item consent
  updateTaskItemConsent: async function (userKey, studyKey, taskId, taskItemConsent) {
    return axios.patch(BASE_URL + `/participants/byuserkey/${userKey}/studies/${studyKey}/taskItemsConsent/${taskId}`, taskItemConsent, axiosConfig)
  },

  // retrieves study descritpion
  getStudyDescription: async function (studyKey) {
    const resp = await axios.get(BASE_URL + '/studies/' + studyKey, axiosConfig)
    return resp.data
  },

  // retrieves the keys of the new studies already filtered out by inclusion criteria
  getNewStudiesKeys: async function () {
    const resp = await axios.get(BASE_URL + '/studies/newStudies/', axiosConfig)
    return resp.data
  },

  // retrieves an invitational study based on a code
  getInvitationalStudy: async function (invitationalCode) {
    const resp = await axios.get(BASE_URL + `/studies/invitational/${invitationalCode}`, axiosConfig)
    return resp.data
  },

  // gets a form given its key
  getForm: async function (formKey) {
    const resp = await axios.get(BASE_URL + '/forms/' + formKey, axiosConfig)
    return resp.data
  },

  // sends an attachment file, returns the file name chosen by the server
  sendAttachment: async function (studyKey, taskId, filename, fileData) {
    const config = {
      method: 'post',
      url: BASE_URL + '/attachments/' + studyKey + '/' + taskId,
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
  getEnvironmentFromPosition: async function (lat, long) {
    const resp = await axios.get(BASE_URL + '/environment?lat=' + lat + '&long=' + long, axiosConfig)
    return resp.data
  },

  // send tasks results data
  sendTasksResults: async function (data) {
    return axios.post(BASE_URL + '/tasksResults', data, axiosConfig)
  }

}
