'use strict'

// this module emulates a Mibadn3 fitness tracker

export default {
    liveHRTimer: undefined,
    /**
     * Finds the first Miband3 around and returns an object containing the ID (MAC address)
     * If a timeout ocurrs, the promise is rejected
     * @param {Number} timeout max number of milliseconds to search for a Miband3
     */
    async search (timeout) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res({
                    id: 'AAAAAAA'
                })
            }, timeout)
        })
    },
    /**
     * Connects to a MiBand3
     * @param {Object} device a device object as returned by search() + can contain an authentication key
     * @param {Function} disconnectCallback called if the device is disconnected
     * @param {Function} authRequiredCallback called when connected but auth has nto been completed yet
     */
    async connect (device, disconnectCallback, authRequiredCallback) {
        return Promise.resolve(true)
    },
    /**
     * Disconnects from the tracker
     */
    async disconnect () {
        return Promise.resolve(true)
    },
    /**
     * Returns true if connected to a Miband3
     */
    async isConnected () {
        return Promise.resolve(true)
    },
    /**
     * Configures a Miband3
     * @param {Object} user a user configuration like { height: 180, weight: 80, dobYear: 1978, dobMonth: 12, dob: 3, sex: 'male' }
     * @param {number} hrFreq how often HR is measured in minutes
     */
    async configure (user, hrFreq) {
        // configures:
        // user, language = EN, dateFormat = 'DD/MM/YYYY, hrFreq, wearLocation=LEFT
        // displayOnlift = not [22:00 - 8:00], nightMode = [22:00 - 8:00],
        // screens = [home, HR, status], HRsleep support = YES, timeFormat = 24G
        // after this notifications are unregistered from the config channels
        return Promise.resolve(true)
    },
    /**
     * Retrieves information about the device
     */
    async getDeviceInfo () {
        return Promise.resolve({
            id: 'AAAA',
            battery: 80,
            charging: false,
            swVersion: '11',
            hw: '3'
        })
    },
    /**
     * Retrieves the data stored on the tracker
     * @param {Date} startDate a JS Date object from which we want to retrieve the data
     * @param {Function} callback called at every sample of data retrieved 
     */
    async getStoredData (startDate, callback) {
        setInterval(() => {
            for (let i = 0; i < 10; i++) {
                callback({
                    date: new Date(startDate.getTime() + i * 60000),
                    activityType: 2,
                    intensity: 10,
                    steps: 10,
                    hr: 72,
                    buffer: new ArrayBuffer(8)
                })
            }
        }, 100)
        return Promise.resolve(true)
    },
    /**
     * Starts live streaming of heart rate
     * @param {function} callback retrieves the heart rate, as a single number
     */
    async startLiveHR (callback) {
        this.liveHRTimer = setInterval(() => {
            for (let i = 0; i < 10; i++) {
                callback(60 + Math.floor(Math.random() * 15))
            }
        }, 1000)
        return Promise.resolve(true)
    },
    /**
     * Stops streaming heart rate
     */
    async stopLiveHR () {
        clearInterval(this.liveHRTimer)
        return Promise.resolve(true)
    }
}