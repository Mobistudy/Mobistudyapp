import BLEDevice from 'modules/bledevice/BLEDevice'
import CustomDate from './CustomDate'

export default class PulseOxDevice extends BLEDevice {
  SERVICE_UUID = '0000ff12-0000-1000-8000-00805f9b34fb'
  READ_CHAR_UUID = '0000ff02-0000-1000-8000-00805f9b34fb'
  WRITE_CHAR_UUID = '0000ff01-0000-1000-8000-00805f9b34fb'
  buffer = []

  async setDateTime () {
    let currentDate = new Date()
    let customDate = new CustomDate(currentDate)
    let dateByteArray = customDate.getDateByteArrayPO60()

    dateByteArray.splice(5)

    let packetByteArray = []
    packetByteArray = packetByteArray.concat(dateByteArray)

    let randomBytes = [5, 5, 5]
    packetByteArray = packetByteArray.concat(randomBytes)

    const checkSum = dateByteArray[0] + 131 + dateByteArray[1] + dateByteArray[2] + dateByteArray[3] + dateByteArray[4] + 15
    const finalByte = (checkSum & 127)
    packetByteArray.push(finalByte)

    const firstByte = -125
    packetByteArray.unshift(firstByte)

    const finalPacket = new Uint8Array(packetByteArray)
    return super.writeWithoutResponse(finalPacket)
  }
  async getFirstData () {
    const byteArray = new Uint8Array([-103, 0, 25])
    return super.writeWithoutResponse(byteArray)
  }
  async getNextData () {
    const byteArray = new Uint8Array([-103, 1, 26])
    return super.writeWithoutResponse(byteArray)
  }
  async getAllData () {
    return new Promise((resolve, reject) => {
      this.disconnectCallback = reject
      window.ble.startNotification(this.deviceId, this.SERVICE_UUID, this.READ_CHAR_UUID, dataResponse => {
        let responseArray = Buffer.from(dataResponse)
        if (responseArray.length > 0 && responseArray[0] === 243 && responseArray[1] === 0) {
          this.getFirstData()
        } else {
          this.addToRecord(responseArray)
          if (this.isAllDataTransferred()) {
            const record = this.assembleFinalRecord()
            this.buffer = []
            resolve(record)
            this.disconnectCallback = undefined
            this.disconnect()
            return
          }
          if (this.buffer.length % 12 === 0) this.getNextData()
        }
      })
      this.setDateTime()
    })
  }
  async getLatestData () {
    let record = await this.getAllData()
    let latestRecord = record[record.length - 1]
    return latestRecord
  }
  addToRecord (array) {
    this.buffer = this.buffer.concat(Array.from(array))
  }
  isAllDataTransferred () {
    for (let i = 0; i < this.buffer.length; i++) {
      if (this.buffer[i] !== 233) continue
      if ((i + 1) > this.buffer.length) continue // Checks if arrayOutOfBounds

      const nextValueHex = this.paddHex(this.buffer[i + 1].toString(16))
      const remainingValues = (this.buffer.length - 1) - i
      if (nextValueHex.charAt(0) === '4' && remainingValues === 23) return true
    }
    return false
  }
  paddHex (hexValue) {
    let paddedHexValue = ''
    if (hexValue.length % 2 !== 0) {
      paddedHexValue += '0' + hexValue
    } else {
      return hexValue
    }
    return paddedHexValue
  }
  assembleFinalRecord () {
    // Divides up the buffer into arrays with 24 bytes each
    if (this.buffer.length === 0) return // Record is empty
    let assembledRecord = []
    let currentRecord = []
    for (let i = 0; i < this.buffer.length; i++) {
      if ((i !== 0 && this.buffer[i] === 233) || i === this.buffer.length - 1) { // Every 24 data points
        if (i === this.buffer.length - 1) currentRecord.push(this.buffer[i])
        assembledRecord.push(currentRecord)
        currentRecord = []
      }
      currentRecord.push(this.buffer[i])
    }
    // Creates an array of objects with the relevant data inside of each array of 24 bytes.
    let record = []
    for (let measurement of assembledRecord) {
      let measurementObject = {}
      Object.assign(measurementObject, this.getTimestampValues(measurement))
      Object.assign(measurementObject, this.getHRValues(measurement))
      Object.assign(measurementObject, this.getSPO2Values(measurement))
      record.push(measurementObject)
    }
    return record
  }
  getHRValues (measurement) {
    let HRValues = {
      hrMax: measurement[20],
      hrMin: measurement[21],
      hrAvg: measurement[22]
    }
    return HRValues
  }
  getSPO2Values (measurement) {
    let SPO2Values = {
      SPO2Max: measurement[17],
      SPO2Min: measurement[18],
      SPO2Avg: measurement[19]
    }
    return SPO2Values
  }
  getTimestampValues (measurement) {
    const startTimestamp = this.getStartTimestamp(measurement)
    const endTimestamp = this.getEndTimestamp(measurement)
    let timestampValues = {
      startTimestamp: startTimestamp,
      endTimestamp: endTimestamp
    }
    return timestampValues
  }
  getStartTimestamp (measurement) {
    const year = measurement[2] + 2000
    const month = measurement[3] - 1
    const day = measurement[4]
    const hour = measurement[5]
    const minute = measurement[6]
    const second = measurement[7]
    const startTimestamp = new Date(year, month, day, hour, minute, second)
    return startTimestamp
  }
  getEndTimestamp (measurement) {
    const year = measurement[8] + 2000
    const month = measurement[9] - 1
    const day = measurement[10]
    const hour = measurement[11]
    const minute = measurement[12]
    const second = measurement[13]
    const endTimestamp = new Date(year, month, day, hour, minute, second)
    return endTimestamp
  }
}
