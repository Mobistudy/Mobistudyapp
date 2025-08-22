/**
 * JStyle mocked
 */
export default class JStyle2025 {
  // eslint-disable-next-line space-before-function-paren
  constructor(id, rssi) {
    this.id = id || 'mocked-jstyle2025-id'
    this.name = 'Mocked JStyle 2025'
    this.rssi = rssi || 0
  }

  static async findAllJStylesByNamePrefix (name, timeout = 10000) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          new JStyle2025('00:11:22:33:FF:EE', 200),
          new JStyle2025('01:22:32:43:1D:09', 100)
        ])
      }, 3000) // simulate delay for finding devices
    })
  }

  static async findJStyleById (id, timeout) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const device = new JStyle2025(id, 200)
        resolve(device)
      }, 2000) // simulate delay for finding devices
    })
  }

  async connect (disconnectCallback) {
    return Promise.resolve()
  }

  async disconnect (disconnectCallback) {
    return Promise.resolve()
  }

  async getDeviceVersion () {
    return '0.0.mocked'
  }

  async getBatteryLevel () {
    return 100
  }

  async getName () {
    return 'Mocked JStyle 2025'
  }

  async getMACAddress () {
    return this.id
  }

  async getTime () {
    return {
      year: 2023,
      month: 3,
      day: 15,
      hour: 12,
      minutes: 30,
      seconds: 45
    }
  }

  async setTime (dateTime) {
    console.log('Mocked JStyle2025 setTime called with', dateTime)
    return Promise.resolve()
  }

  async getUserProfile () {
    return {
      gender: 1,
      age: 25,
      height: 175,
      weight: 70,
      strideLength: 78,
      userDeviceId: 'mocked-user-device-id'
    }
  }

  /**
   * Sets the user profile
   * @param {UserProfile} profile - user profile
   */
  async setUserProfile (profile) {
    console.log('Mocked JStyle2025 setUserProfile called with', profile)
    return Promise.resolve()
  }

  /**
   * Sets automatic data collection mode
   * @param {number} startHour - hour to start automatic data collection (0-23)
   * @param {number} startMinute - minute to start automatic data collection (0-59)
   * @param {number} stopMinute - minute to stop automatic data collection (0-59)
   * @param {number} stopHour - hour to stop automatic data collection (0-23)
   * @param {number} intervalMinutes - interval in minutes for automatic data collection, default is 15 minutes
   * @param {number} type - type of automatic data collection, 1=AutoHeartRate, 2=AutoSpo2, 3=AutoTemp, 4=AutoHrv
   * @returns {Promise<void>} - resolves when the command is sent and reply is received
  */
  async setAutoMode (startHour, startMinute, stopHour, stopMinute, intervalMinutes = 15, type = 1) {
    console.log(`Mocked JStyle2025 setAutoMode called with startHour=${startHour}, startMinute=${startMinute}, stopHour=${stopHour}, stopMinute=${stopMinute}, intervalMinutes=${intervalMinutes}, type=${type}`)
    return Promise.resolve()
  }

  /**
   * Gets the automatic data collection mode
   * @param {mode} type - type of automatic data collection, 1=AutoHeartRate, 2=AutoSpo2, 3=AutoTemp, 4=AutoHrv
   * @returns {Promise<void>} - resolves when the command is sent and reply is received
   */
  async getAutoMode (type) {
    return { enabled: true, startHour: 0, startMinutes: 0, stopHour: 0, stopMinutes: 0, weekDays: { monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true }, intervalMinutes: 15 }
  }

  /**
   * Clears data from watch
   */
  async clearData () {
    console.log('Mocked JStyle2025 clearData called')
    return Promise.resolve()
  }

  /**
   * Queries activity summary data, one summary record per day
   * @param {Date} fromDate - date from which to start querying, if not provided, queries all data
   * @returns {Promise<Array<DailyActivitySummary>>} - array of activity records, each record is an object with year, month, day, steps, time, distance and calories
   */
  async getDailyActivitySummaryHistory (fromDate) {
    const retdata = []
    for (let day = fromDate; day < new Date(); day = new Date(day.getTime() + 24 * 60 * 60 * 1000)) {
      retdata.push({
        year: day.getFullYear(),
        month: day.getMonth() + 1, // months are 0-indexed in JS
        day: day.getDate(),
        steps: Math.floor(Math.random() * 10000), // random steps for testing
        exerciseMinutes: Math.floor(Math.random() * 120), // random exercise minutes for testing
        distance: Math.floor(Math.random() * 10000), // random distance in meters for testing
        calories: Math.floor(Math.random() * 5000), // random calories for testing
        goal: 10000, // fixed goal for testing
        activeMinutes: Math.floor(Math.random() * 120) // random active minutes for testing
      })
    }
    return retdata
  }

  /**
     * Deletes daily activity summary history from the watch
     * @param {Date} fromDate - date from which to start deleting, if not provided, deletes all data
     * @returns {Promise<void>} - resolves when the command is sent and reply is received
     */
  async deleteDailyActivitySummaryHistory (fromDate) {
    console.log('Mocked JStyle2025 deleteDailyActivitySummaryHistory called with fromDate', fromDate)
    return Promise.resolve()
  }

  //  {"year":2025,"month":8,"day":22,"hour":5,"minutes":16,"seconds":59,"sleepQualityDurationMins":1,"sleepQuality":[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,2,3,3,3,3,2]}

  async getSleepHistory (fromDate) {
    const retdata = []
    // produce data every 60 minutes
    for (let day = fromDate; day < new Date(); day = new Date(day.getTime() + 60 * 60 * 1000)) {
      if (day.getHours() < 22 && day.getHours() > 6) {
        // skip day hours
        continue
      }
      const qualityIndexs = []
      for (let i = 0; i < 60; i++) {
        qualityIndexs.push(Math.floor(Math.random() * 5)) // random sleep quality index from 0 to 4
      }
      retdata.push({
        year: day.getFullYear(),
        month: day.getMonth() + 1, // months are 0-indexed in JS
        day: day.getDate(),
        hour: day.getHours(),
        minutes: day.getMinutes(),
        seconds: day.getSeconds(),
        sleepQualityDurationMins: 10,
        sleepQuality: qualityIndexs
      })
    }
    return retdata
  }

  /**
     * Deletes sleep history from the watch
     * @param {Date} fromDate - date from which to start deleting, if not provided, deletes all data
     * @returns {Promise<void>} - resolves when the command is sent and reply is received
     */
  async deleteSleepHistory (fromDate) {
    console.log('Mocked JStyle2025 deleteSleepHistory called with fromDate', fromDate)
    return Promise.resolve()
  }

  /**
   * Queries detailed activity data
   * @param {Date} fromDate - date from which to start querying, if not provided, queries all data
   * @returns {Promise<Array<DetailedActivity>} - array of activity records
  */
  async getDetailedActivityHistory (fromDate) {
    const retdata = []
    // produce data every 10 minutes
    let counter = 1
    for (let day = fromDate; day < new Date(); day = new Date(day.getTime() + 10 * 60 * 1000)) {
      let steps = 0
      let calories = 0.02
      let distance = 0
      if (day.getHours() < 22 && day.getHours() > 8) {
        steps = Math.floor(Math.random() * 100) // random steps for testing
        distance = Math.round(steps * 0.7)
        calories = Math.round(steps * 0.04) // random calories for testing
      }
      retdata.push({
        recordCount: counter++,
        year: day.getFullYear(),
        month: day.getMonth() + 1, // months are 0-indexed in JS
        day: day.getDate(),
        hour: day.getHours(),
        minutes: day.getMinutes(),
        seconds: day.getSeconds(),
        steps,
        calories,
        distance
      })
    }
    return retdata
  }

  /**
   * Deletes detailed activity history from the watch
   * @param {Date} fromDate - date from which to start deleting, if not provided, deletes all data
   * @returns {Promise<void>} - resolves when the command is sent and reply is received
   */
  async deleteDetailedActivityHistory (fromDate) {
    console.log('Mocked JStyle2025 deleteDetailedActivityHistory called with fromDate', fromDate)
    return Promise.resolve()
  }

  /**
   * Queries detailed heart rate history.
   * WARNING: this methods does not seem to work properly with the latest firmware version.
   * @param {Date} fromDate - date from which to start querying, if not provided, queries all data
   * @returns {Promise<Array<DetailedHR>>} - array of heart rate records
   */
  async getDetailedHRHistory (fromDate) {
    return []
  }

  /**
   * Deletes detailed HR history from the watch
   * @param {Date} fromDate - date from which to start deleting, if not provided, deletes all data
   * @returns {Promise<void>} - resolves when the command is sent and reply is received
  */
  async deleteDetailedHRHistory (fromDate) {
    console.log('Mocked JStyle2025 deleteDetailedHRHistory called with fromDate', fromDate)
    return Promise.resolve()
  }

  /**
   * Gets the heart rate history
   * This is a simplified version of getDetailedHRHistory, which returns only the heart rate per sample
   * @param {Date} fromDate - date from which to start querying, if not provided, queries all data
   * @returns {Promise<Array<HR>>} - array of heart rate records
  */
  async getHRHistory (fromDate) {
    const retdata = []
    // produce data every 10 minutes
    let counter = 1
    for (let day = fromDate; day < new Date(); day = new Date(day.getTime() + 10 * 60 * 1000)) {
      retdata.push({
        recordCount: counter++,
        year: day.getFullYear(),
        month: day.getMonth() + 1, // months are 0-indexed in JS
        day: day.getDate(),
        hour: day.getHours(),
        minutes: day.getMinutes(),
        seconds: day.getSeconds(),
        hr: Math.round(80 + (Math.sin(counter * 6.28 / 20) * 20) + (Math.random() * 4)) // random HR for testing
      })
    }
    return retdata
  }

  async deleteHRHistory (fromDate) {
    console.log('Mocked JStyle2025 deleteHRHistory called with fromDate', fromDate)
    return Promise.resolve()
  }

  async getHRVHistory (fromDate) {
    const retdata = []
    // produce data every 10 minutes
    let counter = 1
    for (let day = fromDate; day < new Date(); day = new Date(day.getTime() + 10 * 60 * 1000)) {
      retdata.push({
        recordCount: counter++,
        year: day.getFullYear(),
        month: day.getMonth() + 1, // months are 0-indexed in JS
        day: day.getDate(),
        hour: day.getHours(),
        minutes: day.getMinutes(),
        seconds: day.getSeconds(),
        hr: Math.floor(Math.random() * 100) + 60, // random HR for testing
        hrv: Math.floor(Math.random() * 100) + 50, // random HRV in ms for testing
        vascularAge: Math.floor(Math.random() * 50) + 20, // random vascular age in years for testing
        stressLevel: Math.floor(Math.random() * 100), // random stress level for testing
        highBP: Math.floor(Math.random() * 20) + 100, // random high blood pressure for testing
        lowBP: Math.floor(Math.random() * 20) + 60 // random low blood pressure for testing
      })
    }
    return retdata
  }

  async deleteHRVHistory (fromDate) {
    console.log('Mocked JStyle2025 deleteHRVHistory called with fromDate', fromDate)
    return Promise.resolve()
  }

  async getTemperatureHistory (fromDate) {
    const retdata = []
    // produce data every 10 minutes
    let counter = 1
    for (let day = fromDate; day < new Date(); day = new Date(day.getTime() + 10 * 60 * 1000)) {
      retdata.push({
        recordCount: counter++,
        year: day.getFullYear(),
        month: day.getMonth() + 1, // months are 0-indexed in JS
        day: day.getDate(),
        hour: day.getHours(),
        minutes: day.getMinutes(),
        seconds: day.getSeconds(),
        temperature: Math.floor(Math.random() * 5) + 36 // random temperature in Celsius for testing
      })
    }
    return retdata
  }

  async deleteTemperatureHistory (fromDate) {
    console.log('Mocked JStyle2025 deleteTemperatureHistory called with fromDate', fromDate)
    return Promise.resolve()
  }

  async getSPO2History (fromDate) {
    const retdata = []
    // produce data every 10 minutes
    let counter = 1
    for (let day = fromDate; day < new Date(); day = new Date(day.getTime() + 10 * 60 * 1000)) {
      retdata.push({
        recordCount: counter++,
        year: day.getFullYear(),
        month: day.getMonth() + 1, // months are 0-indexed in JS
        day: day.getDate(),
        hour: day.getHours(),
        minutes: day.getMinutes(),
        seconds: day.getSeconds(),
        spo2: Math.floor(Math.random() * 5) + 94 // random SPO2 in percentage for testing
      })
    }
    return retdata
  }

  async deleteSPO2History (fromDate) {
    console.log('Mocked JStyle2025 deleteSPO2History called with fromDate', fromDate)
    return Promise.resolve()
  }
}
