'use strict'
/**
* Wrapper of the cordova native storage plugin
* Needs this plugin: https://github.com/TheCocoaProject/cordova-plugin-nativestorage#README.md
*/
const storage = window.NativeStorage

export async function getItem (key) {
  return new Promise((resolve, reject) => {
    storage.getItem(key, (item) => {
      resolve(JSON.parse(item))
    }, reject)
  })
}

export async function setItem (key, value) {
  return new Promise((resolve, reject) => {
    storage.setItem(key, JSON.stringify(value), resolve, reject)
  })
}

export async function removeItem (key) {
  return new Promise((resolve, reject) => {
    storage.removeItem(key, resolve, reject)
  })
}

export async function clear () {
  return new Promise((resolve, reject) => {
    storage.clear(resolve, reject)
  })
}
