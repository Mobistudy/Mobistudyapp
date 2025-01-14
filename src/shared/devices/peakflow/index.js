// Smart Peak Flow meter implementations

import PF from './peakflow'
import PFMock from './peakflow.mock'

let PFIimpl = {}

if (process.env.PEAKFLOW === 'MOCK') {
  PFIimpl = PFMock
} else {
  PFIimpl = PF
}

export default PFIimpl
