import 'modules/files/files'
import files from './files'

export class Logger {
  /**
  * Instantiates a logger.
  * @param {string} filename - filename to be opened
  * @param {string} folder - can be either 'cache' (default) for temporary storage or 'shared' for exposed folder
  */
  constructor (filename, folder) {
    this.filename = filename
    this.folder = folder
    this.buffer = ''
    this.writing = false
    this.storageLocation = ''
    this.fileEntry = ''
  }

  /**
   * Creates a logger, instatiates the file and prepares it for logging.
   */
  async create () {
    this.buffer = ''
    this.writing = false

    this.fileEntry = await files.openFile(this.filename, this.folder, true)
  }

  writeBuffer (completed, error) {
    this.writing = true
    let toWrite = this.buffer
    this.buffer = ''

    this.fileEntry.createWriter((fileWriter) => {
      fileWriter.onerror = error
      fileWriter.onwriteend = () => {
        if (this.buffer.length > 0) {
          // buffer not empty, keep writing
          this.writeBuffer(completed, error)
        } else {
          // buffer empty, completed!
          this.writing = false
          if (completed) completed()
        }
      }
      fileWriter.seek(fileWriter.length)
      // dataObj = new Blob([line], { type: 'text/plain' })
      fileWriter.write(toWrite)
    }, error)
  }

  /**
  * Appends lines to the logger.
  * If the logger is busy writing, the promise resolves immediately
  * @param {string} line - the text to be appended
  */
  async log (line) {
    // add the line to the buffer
    this.buffer += line

    return new Promise((resolve, reject) => {
      // if writing, return immediately
      if (this.writing) resolve()
      else this.writeBuffer(resolve, reject)
    })
  }

  /**
  * Deletes the temporary logfile.
  */
  async delete () {
    return this.files.delete(this.filename, this.folder)
  }
}
