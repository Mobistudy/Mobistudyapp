'use strict'
// API implementation
import axios from 'axios'

const BASE_URL = process.env.API_ENDPOINT
let axiosConfig = {}

export default {
  setToken: (newtoken) => {
    axiosConfig = {
      headers: {
        'Authorization': 'Bearer ' + newtoken
      }
    }
  },
  unsetToken: () => {
    axiosConfig = {}
  },
  // Log in
  login: async (email, password) => {
    let resp = await axios.post(BASE_URL + '/login', { email: email, password: password })
    return resp.data
  },
  // Registration
  registerUser: async (email, password) => {
    return axios.post(BASE_URL + '/users', {
      email: email,
      password: password,
      role: 'participant'
    })
  },
  // Password reset
  resetPW: async (email) => {
    return axios.post(BASE_URL + '/sendResetPasswordEmail', { email: email })
  },
  // Change password
  changePW: async (token, newpw) => {
    return axios.post(BASE_URL + '/resetPassword', { token: token, password: newpw })
  },
  /// ////////////////////////////////////
  // from here on, we need to use tokens
  /// ////////////////////////////////////

  // Create the participant profile
  createProfile: async function (profile) {
    return axios.post(BASE_URL + '/participants', profile, axiosConfig)
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

  // search for disease on SNOMED
  searchSNOMEDDisease: async function (diseaseDescription) {
    // Declare top level URL vars
    const baseUrl = 'https://browser.ihtsdotools.org/api/v1/snomed/'
    const edition = 'en-edition'
    const version = '20180131'
    // Construct Disease Query URL
    const diseaseQueryURL = baseUrl + '/' + edition + '/v' + version + '/descriptions?query=' + encodeURIComponent(diseaseDescription) + '&limit=50&searchMode=partialMatching' + '&lang=english&statusFilter=activeOnly&skipTo=0' + '&semanticFilter=disorder' + '&returnLimit=100&normalize=true'

    const response = await axios.get(diseaseQueryURL)
    const dataDis = response.data
    // Filter out already selected diseases
    const resFiltByLen = dataDis.matches.filter(entry => entry['term'].length < 50)
    const retval = resFiltByLen.map((item) => {
      return {
        label: item.term,
        value: item.term,
        conceptId: item.conceptId
      }
    })
    return retval
  },

  // search for medications on SNOMED
  searchSNOMEDMedication: async function (medDescription) {
    // Declare top level URL vars
    var baseUrl = 'https://browser.ihtsdotools.org/api/v1/snomed/'
    var edition = 'en-edition'
    var version = '20180131'
    // Construct medications Query URL
    var medQueryURL = baseUrl + '/' + edition + '/v' + version + '/descriptions?query=' + encodeURIComponent(medDescription) + '&limit=50&searchMode=partialMatching' + '&lang=english&statusFilter=activeOnly&skipTo=0' + '&semanticFilter=substance' + '&returnLimit=100&normalize=true'

    const response = await axios.get(medQueryURL)
    const dataMed = response.data
    // Filter out already selected medications
    let resMedsFiltByLen = dataMed.matches.filter(entry => entry['term'].length < 50)
    const retval = resMedsFiltByLen.map((item) => {
      return {
        label: item.term,
        value: item.term,
        conceptId: item.conceptId
      }
    })
    return retval
  },

  // retrieves study descritpion
  getStudyDescription: async function (studyKey) {
    let resp = await axios.get(BASE_URL + '/studies/' + studyKey, axiosConfig)
    return resp.data
  },

  // retrieves the keys of the new studies already filtered out by inclusion criteria
  getNewStudiesKeys: async function () {
    let resp = await axios.get(BASE_URL + '/newStudies/', axiosConfig)
    return resp.data
  },

  // gets a form given its key
  getForm: async function (formKey) {
    let resp = await axios.get(BASE_URL + '/forms/' + formKey, axiosConfig)
    return resp.data
  },

  // send answers to server
  sendAnswers: function (answers) {
    return axios.post(BASE_URL + '/answers', answers, axiosConfig)
  },

  // send health data from query
  sendDataQuery: function (data) {
    return axios.post(BASE_URL + '/healthStoreData', data, axiosConfig)
  }
}
