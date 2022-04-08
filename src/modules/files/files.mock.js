export default {

  /**
  * Reads a file and delivers the content
  * @param {string} filename - the file to be opened
  * @param {string} folder - folder, either 'cache' (default) or 'shared'
  * @param {string} type - how to read the data, 'blob' for Uint8Array, 'text' for text
  */
  async load (filename, folder, type) {
    let file = window.localStorage.getItem(folder + '_' + filename)
    if (type === 'text') return Promise.resolve(file)
    else if (type === 'blob') {
      let enc = new TextEncoder()
      let blob = enc.encode(file)
      return Promise.resolve(blob)
    }
  },

  /**
  * Saves an object as a JSON file
  * @param {string} filename - filename is the name of the file
  * @param {object} object - is the object to be saved
  */
  async save (filename, folder, object) {
    window.localStorage.setItem(folder + '_' + filename, JSON.stringify(object))
    return Promise.resolve(true)
  },

  /**
   * Deletes a file
   * @param {string} filename
   * @param {string} folder
   * @returns a promise
   */
  async delete (filename, folder) {
    window.localStorage.removeItem(folder + '_' + filename)
    return Promise.resolve(true)
  }
}
