'use strict'

export async function isAvailable () {
  return new Promise((resolve, reject) => {
    if (!navigator.health) reject(new Error('Cordova Health is not installed'))
    navigator.health.isAvailable(resolve, reject)
  })
}

export async function promptInstallFit () {
  return new Promise((resolve, reject) => {
    if (!navigator.health) reject(new Error('Cordova Health is not installed'))
    navigator.health.promptInstallFit(resolve, reject)
  })
}

export async function requestAuthorization (datatypes) {
  return new Promise((resolve, reject) => {
    if (!navigator.health) reject(new Error('Cordova Health is not installed'))
    navigator.health.requestAuthorization(datatypes, resolve, reject)
  })
}

export async function isAuthorized (datatypes) {
  return new Promise((resolve, reject) => {
    if (!navigator.health) reject(new Error('Cordova Health is not installed'))
    navigator.health.isAuthorized(datatypes, resolve, reject)
  })
}

export async function disconnect () {
  return new Promise((resolve, reject) => {
    if (!navigator.health) reject(new Error('Cordova Health is not installed'))
    navigator.health.disconnect(resolve, reject)
  })
}

export async function query (queryOpts) {
  return new Promise((resolve, reject) => {
    if (!navigator.health) reject(new Error('Cordova Health is not installed'))
    navigator.health.query(queryOpts, resolve, reject)
  })
}

export async function queryAggregated (queryOpts) {
  return new Promise((resolve, reject) => {
    if (!navigator.health) reject(new Error('Cordova Health is not installed'))
    navigator.health.queryAggregated(queryOpts, resolve, reject)
  })
}
