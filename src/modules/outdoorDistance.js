/**
* Six Minute Walk Test algorithm for the outdoor test.
* Based on https://mhealth.jmir.org/2020/1/e13756/
* @param {number} selectEverySecs - seconds after which coordinates are selected for accumulating the distance
* @param {number} maxspeed - maximum allowable speed for a person (discards what is above that) in m/s
*/
export default {
  // maximum allowable speed
  MAX_SPEED: 2,

  // minimum accuracy to be used to pass the signal check routine
  CHECKSIGNAL_MINACCURACY: 15,

  // period, in seconds, when to select a sample
  SELECTION_PERIOD: 5,

  // holder of all positions
  positions: [],
  // holder of a selected number of positions
  selectedPositions: [],

  // total "official" distance
  distance: 0,
  // last approximate distance used for showing
  showdistance: 0,

  // tells if the actual test has started
  started: false,

  /**
  * Tells the algorithm that the test has officially started
  * @param ts: the timestamp (for testing purposes), not mandatory
  */
  startTest: function (ts) {
    this.distance = 0
    this.started = true
    this.selectedPositions = []
    // select the starting position
    let selected = this.selectPosition(this.positions[0].timestamp, this.SELECTION_PERIOD / 4)
    if (!selected) { // if there is no candidate for selection just use the last one
      selected = this.positions[0]
    }
    this.selectedPositions.unshift(selected)
  },

  /** Tells the algorithm that the test has officially ended
  */
  stopTest: function () {
    this.started = false
    // if there were no steps, then just give zero
    if (this.positions[0].steps !== undefined && this.positions[0].steps === 0) {
      this.distance = 0
      return
    }

    // last update of the distance
    var selected = this.selectPosition(this.positions[0].timestamp, 10) // for the last sample, let's try to focus on the last 10 seconds
    if (!selected) { // if there is no candidate for selection, well, then just use the last one
      selected = this.positions[0]
    }
    if (selected.timestamp !== this.selectedPositions[0].timestamp) { // it may happen that it was already selected
      this.distance += this.crowDist(this.selectedPositions[0], selected)
      this.selectedPositions.unshift(selected)
    }
  },

  /** Resest the internals of the algorithm
  */
  reset: function () {
    this.distance = 0
    this.showdistance = 0
    this.started = false
    this.positions = []
    this.selectedPositions = []
  },

  /**
  * A position is available and has to be computed
  * @param position: the position object, like { timestamp: ttt, coords: {longitude: xx, latitude: yy, accuracy: zz,a ltitude: bbb}, steps: ss}, steps can be undefined or null!
  * @return for debugging purposes, returns true if the sample was selected
  */
  addPosition: function (position) {
    this.positions.unshift(position)

    if (this.started) {
      // selection criterium
      if ((position.timestamp - this.selectedPositions[0].timestamp) >= (this.SELECTION_PERIOD * 1000)) {
        // select the best one within a reasonable time window
        let selected = this.selectPosition(position.timestamp, this.SELECTION_PERIOD / 4)
        if (selected) {
          this.distance += this.crowDist(this.selectedPositions[0], selected)
          this.selectedPositions.unshift(selected)
          return true
        }
      }
    }
    return false
  },

  /**
  * Tells if the signal is of enough quality
  */
  isSignalOK: function () {
    // we define "enough quality" when there is altitude (means that the GPS is on)
    // and the accuracy is less than CHECKSIGNAL_MINACCURACY
    if (this.positions.length === 0) return false
    let lastP = this.positions[0]
    return lastP && (lastP.coords.altitude) && (lastP.coords.accuracy <= this.CHECKSIGNAL_MINACCURACY)
  },

  /**
  * Computes the latest available distance
  * if the test is not stopped it will give the best effort estimation
  */
  getDistance: function () {
    if (this.started) {
      // if there are no new steps, freeze the distance
      if ((this.positions.length > 1) && (this.positions[0].steps || (this.positions[0].steps === 0)) && ((this.positions[0].steps - this.positions[1].steps) === 0)) {
        return this.showdistance
      }
      let d = this.crowDist(this.selectedPositions[0], this.positions[0])
      this.showdistance = this.distance + d
      return this.showdistance
    } else {
      // when not running, give the official one
      return this.distance
    }
  },

  // gives the distance between two points in direct line (crow flight distance)
  // latitude and longitude are in decimal degrees
  // returns the distance in meters
  crowDist: function (point1, point2) {
    let lat1 = point1.coords.latitude
    let lat2 = point2.coords.latitude
    let lon1 = point1.coords.longitude
    let lon2 = point2.coords.longitude
    let R = 6371 // km
    let dLat = this.toRad(lat2 - lat1)
    let dLon = this.toRad(lon2 - lon1)
    lat1 = this.toRad(lat1)
    lat2 = this.toRad(lat2)

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    let d = R * c
    return d * 1000
  },

  // Converts numeric degrees to radians
  toRad: function (Value) {
    return Value * Math.PI / 180
  },

  // selects the best position in this moment
  // time: current time, as Unixtimestamp
  // secs: how big can the time window be
  selectPosition: function (time, secs) {
    // if there are no new steps, don't compute distance
    if ((this.positions.length > 1) && this.positions[0].steps && ((this.positions[0].steps - this.positions[1].steps) === 0)) {
      return null
    }

    // use the best sample within secs
    // "best" is the one with highest accuracy and that does not suppose extreme speeds (>10Km hour)
    let bestAccuracy = 10000
    let bestAccuracyI = -1

    for (let i = 0; i < this.positions.length; i++) {
      let pos = this.positions[i]
      if (time - pos.timestamp > (secs * 1000)) {
        // we don't have to go further
        if (bestAccuracyI >= 0) {
          // there's a candidate
          return this.positions[bestAccuracyI] // returns the one with the best accuracy
        } else { // there are no suitable options in this time window :(
          return null
        }
      }
      if (pos.coords.accuracy < 5) {
        return pos // that's enough accuracy! no need to go further
      }
      // compute speed since last selected point
      let speed = 0
      if (this.selectedPositions.length > 0) { // (only possible when there is at least one selected)
        speed = this.crowDist(pos, this.selectedPositions[0]) / ((time - this.selectedPositions[0].timestamp) / 1000) // m/s
      }
      if (speed < this.MAX_SPEED) {
        if (pos.coords.accuracy < bestAccuracy) {
          bestAccuracy = this.positions[i].coords.accuracy
          bestAccuracyI = i
        }
      } else {
        // just ignore this point
        // console.log('what a jump! speed: '+speed, pos);
      }
    }
    return this.positions[bestAccuracyI]
  }
}
