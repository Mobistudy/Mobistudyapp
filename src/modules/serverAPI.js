import axios from 'axios'

const BASE_URL = '/api'
// const BASE_URL = 'https://ibme-linuxdev.eng.ox.ac.uk:7777/api'
let axiosConfig = {}

export function setToken (newtoken) {
  axiosConfig = {
    headers: {
      'Authorization': 'Bearer ' + newtoken
    }
  }
}

export function unsetToken () {
  axiosConfig = {}
}

// Logging in
export async function login (email, password) {
  let resp = await axios.post(BASE_URL + '/login', { email: email, password: password })
  return resp.data
}

// Registration
export async function registerUser (email, password) {
  return axios.post(BASE_URL + '/users', {
    email: email,
    password: password,
    role: 'participant'
  })
}

// Password reset
export async function resetPW (email) {
  return axios.post(BASE_URL + '/sendResetPasswordEmail', { email: email })
}

// Change password
export async function changePW (token, newpw) {
  return axios.post(BASE_URL + '/resetPassword', { token: token, password: newpw })
}

/// ////////////////////////////////////
// from here on, we need to use tokens
/// ////////////////////////////////////

// Create the participant profile
export async function createProfile (profile) {
  return axios.post(BASE_URL + '/participants', profile, axiosConfig)
}

// Get the participant profile
export async function getProfile (userKey) {
  const resp = await axios.get(BASE_URL + '/participants/byuserkey/' + userKey, axiosConfig)
  return resp.data
}

// Updating details
export async function updateProfile (profile) {
  return axios.patch(BASE_URL + '/participants/byuserkey/' + profile.userKey, profile, axiosConfig)
}

// Permanently delete the user
export async function deleteUser (userKey) {
  return axios.delete(BASE_URL + '/participants/byuserkey/' + userKey, axiosConfig)
}

// update status of a study
export async function updateStudyStatus (userKey, studyKey, status, details) {
  let statusObj = {}
  if (details) statusObj = details
  statusObj.currentStatus = status
  return axios.post(BASE_URL + `/participants/byuserkey/${userKey}/studies/${studyKey}/currentStatus`, statusObj, axiosConfig)
}

// search for disease on SNOMED
export async function searchSNOMEDDisease (diseaseDescription) {
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
}

// search for medications on SNOMED
export async function searchSNOMEDMedication (medDescription) {
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
}

// retrieves study descritpion
export async function getStudyDescription (studyKey) {
  let resp = await axios.get(BASE_URL + '/studies/' + studyKey, axiosConfig)
  return resp.data
}

// retrieves the keys of the new studies already filtered out by inclusion criteria
export async function getNewStudiesKeys () {
  let resp = await axios.get(BASE_URL + '/newStudies/', axiosConfig)
  return resp.data
}

// gets a form given its key
export async function getForm (formKey) {
  let resp = await axios.get(BASE_URL + '/forms/' + formKey, axiosConfig)
  return resp.data
}

// send answers to server
export function sendAnswers (answers) {
  return axios.post(BASE_URL + '/answers', answers, axiosConfig)
}

// send health data from query
export function sendDataQuery (data) {
  return axios.post(BASE_URL + '/healthdata', data, axiosConfig)
}
