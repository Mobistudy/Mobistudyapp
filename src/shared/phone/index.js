import phone from './phone'
import phoneMock from './phone.mock'

let phoneImpl = {}

if (process.env.PHONE === 'MOCK') {
  phoneImpl = phoneMock
} else {
  phoneImpl = phone
}

export default phoneImpl
