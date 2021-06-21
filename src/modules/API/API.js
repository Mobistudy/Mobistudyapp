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
    console.log('Login BASE:', BASE_URL)
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

  // update status of a task item consent
  updateTaskItemConsent: async function (studyKey, taskId, taskItemConsent) {
    return axios.patch(BASE_URL + `/participants/studies/${studyKey}/taskItemsConsent/${taskId}`, taskItemConsent, axiosConfig)
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

  // retrieves an invitational study based on a code
  getInvitationalStudy: async function (invitationalCode) {
    let resp = await axios.get(BASE_URL + `/invitationalStudy/${invitationalCode}`, axiosConfig)
    return resp.data
  },

  // gets a form given its key
  getForm: async function (formKey) {
    let resp = await axios.get(BASE_URL + '/forms/' + formKey, axiosConfig)
    return resp.data
  },

  // send answers to server
  sendAnswers: async function (answers) {
    return axios.post(BASE_URL + '/answers', answers, axiosConfig)
  },

  // send health data from query
  sendDataQuery: async function (data) {
    return axios.post(BASE_URL + '/healthStoreData', data, axiosConfig)
  },

  // send data from SMWT
  sendSMWTData: async function (data) {
    return axios.post(BASE_URL + '/SMWTData', data, axiosConfig)
  },

  // send data from QCST
  sendQCSTData: async function (data) {
    return axios.post(BASE_URL + '/QCSTData', data, axiosConfig)
  },

  // send data from miBand3 stored data
  sendMiBand3Data: async function (data) {
    return axios.post(BASE_URL + '/miband3Data', data, axiosConfig)
  },

  // send data from po60 stored data
  sendPO60Data: async function (data) {
    return axios.post(BASE_URL + '/po60Data', data, axiosConfig)
  },

  // send position
  sendPosition: async function (data) {
    return axios.post(BASE_URL + '/positions', data, axiosConfig)
  },

  // get environment data from position
  getEnvironmentFromPosition: async function (lat, long) {
    const resp = await axios.get(BASE_URL + '/positions/environment?lat=' + lat + '&long=' + long, axiosConfig)
    return resp.data
  },

  // send data from Peak Flow Meter
  sendPeakFlow: async function (data) {
    return axios.post(BASE_URL + '/peakFlow', data, axiosConfig)
  },

  // send data from finger tapping data
  sendFingerTappingData: async function (data) {
    return axios.post(BASE_URL + '/fingerTapping', data, axiosConfig)
  }
}
