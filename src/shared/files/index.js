// File system implementations

import Files from './files'
import FilesMock from './API.mock'

let FilesImpl = {}

if (process.env.FILES === 'MOCK') {
  FilesImpl = FilesMock
} else {
  FilesImpl = Files
}

export default FilesImpl
