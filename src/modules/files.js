'use strict'
import { Platform } from 'quasar'
// this module abstracts the file system using cordova-plugin-file
// files are stored on cordova.file.documentsDirectory on iOS and
// cordova.file.externalDataDirectory on Android
// to retrieve the file from iTunes see this: https://stackoverflow.com/questions/31554886/how-do-you-export-a-file-out-of-ios-when-using-cordova-file-plugin
// this plugin can be used to automatically set the permissions: https://github.com/christianjunk/cordova-plugin-itunesfilesharing#readme

/**
* Utility function that translates the error code to a string
*/
let errorCodeToString = (code) => {
  switch (code) {
    case 1:
      return 'NOT_FOUND_ERR'
    case 2:
      return 'SECURITY_ERR'
    case 3:
      return 'ABORT_ERR'
    case 4:
      return 'NOT_READABLE_ERR'
    case 5:
      return 'ENCODING_ERR'
    case 6:
      return 'NO_MODIFICATION_ALLOWED_ERR'
    case 7:
      return 'INVALID_STATE_ERR'
    case 8:
      return 'SYNTAX_ERR'
    case 9:
      return 'INVALID_MODIFICATION_ERR'
    case 10:
      return 'QUOTA_EXCEEDED_ERR'
    case 11:
      return 'TYPE_MISMATCH_ERR'
    case 12:
      return 'PATH_EXISTS_ERR'
    default:
      return 'Unknown Error ' + code
  }
}

export default {

  /**
  * Opens a file.
  * @param {string} filename - filename to be opened
  * @param {string} forcecreate - if true the file is created if does not exist
  */
  async openFile (filename, forcecreate, onOpen, onError) {
    let folder
    if (Platform.is.ios) folder = cordova.file.documentsDirectory
    else folder = cordova.file.externalDataDirectory

    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(folder, function (dir) {
        dir.getFile(filename, { create: true }, function (file) {
          resolve(file)
        }, function (e) {
          reject('Cannot get file ' + filename + ', ' + errorCodeToString(e.code))
        })
      })
    })
  },

  /**
  * Reads a file and delivers the content as an object
  * @param {string} filename - the file to be opened
  */
  async load (filename) {
    let file = await this.openFile(filename)

    return new Promise((resolve, reject) => {
      file.file(function (file) {
        var reader = new FileReader()
        reader.onloadend = function () {
          resolve(this.result)
        }
        reader.readAsText(file)
      }, function (e) {
        reject('Cannot read file ' + filename + ': ' + errorCodeToString(e.code))
      })
    })
  },

  /**
  * Saves an object as a JSON file
  * @param {string} filename - filename is the name of the file
  * @param {object} object - is the object to be saved
  */
  async save (filename, object) {
    let file = await this.openFile(filename)
    return new Promise((resolve, reject) => {
      file.createWriter(function (fileWriter) {
        var blob = JSON.stringify(object)

        fileWriter.onwriteend = function (e) {
          resolve()
        }
        fileWriter.onerror = function (e) {
          reject('Cannot write to file: ' + errorCodeToString(e.code))
        }
        fileWriter.write(blob)
      })
    })
  }
}
