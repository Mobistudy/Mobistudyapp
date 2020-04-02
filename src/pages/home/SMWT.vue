<template>
  <q-page padding>
    <!-- content -->
    <div v-if="instruction && !isCompleted">
   <div class="text-center text-h6 q-mt-lg">
      Instructions for the Six Minute Walk Test (6MWT)
    </div>
    <q-item class="q-mt-md">
        <q-item-section>
          <q-item-label class="q-pb-sm">Introduction</q-item-label>
          <q-item-label caption>This task is to perform a Six Minute Walk Test. This app is able to send the results of your tests to a server hosted by the University of Malmö. The data is made available to the personnel of the Skånes Universitetssjukhus so that doctors and nurses are able to review them.</q-item-label>
          <q-item-label class="q-pb-sm">Instructions</q-item-label>
          <q-item-label caption>
            <p>Please read the instructions carefully. The accuracy of the test depends on the instructions being followed as closely as possible.</p>

            <p><i>Note: This test uses the GPS of your phone and therefore requires internet connection. If you experience errors during the test, pleae make sure that your phone is connected to the internet.</i></p>
            <ul>
              <li>The object of this test is to walk as far as possible for 6 minutes.</li>
              <li>It is important that you try to walk as straight as possible. Try to avoid stairs and/or steep hills</li>
              <li>If possible, try to avoid areas with many tall buildings and / or trees as these can affect the GPS function of your phone.</li>
              <li>When you are ready to start the test, press the "Start"-button.</li>
              <li>You may slow down if necessary. If you stand still during the test, please press the "Pause"-button and then press continue and walk again as soon as possible.</li>
              <li>The test will automaticly stop after 6 minutes, and you will be asked to send the collected data. If you need to complete the test earlier, press the "Complete"-button.</li>
              <li>Try not to talk during the test, as this may affect your performance.</li>
              <li>Stop immediately if you have any chest pain or dizziness. </li>
            </ul>
          </q-item-label>
             <div class="row justify-center q-mt-lg">
          <q-btn color="primary" @click="start()" :label="$t('common.start')" />
        </div>
        </q-item-section>
    </q-item>
    </div>

    <q-item class="q-mt-md">
      <q-item-section id="completedText" v-if="isCompleted">
        <h5>Congratulations!</h5>
        <img alt="Finish flag" src="~assets/297188.svg">
          <h6>You completed the test!</h6>
          <q-item-section id="stats">
            <table>
              <tr>
                <td>Time:</td>
                <td> {{ minutes }}:{{ seconds }}</td>
              </tr>
              <tr>
                <td>Distance:</td>
                <td>{{ this.distance.toFixed(2) }}</td>
              </tr>
              <tr>
                <td>Average speed:</td>
                <td> {{ this.speed.toFixed(2) }} m/s</td>
              </tr>
            </table>
          </q-item-section>

          <div class="q-pa-md">
          <p class="sub-heading">Please rate your level of exertion:</p>
            <q-list>
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="value" val="No Exertion" />
                </q-item-section>
                <q-item-section>
                  <q-item><p>0</p> <p> No Exertion</p></q-item>
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="value" val="Very very slight" />
                </q-item-section>
                <q-item-section>
                  <q-item><p>0.5</p> <p>Very very slight</p></q-item>
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section avatar top>
                  <q-radio v-model="value" val="Very slight"/>
                </q-item-section>
                <q-item-section>
                  <q-item><p>1</p> <p>Very slight</p></q-item>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="value" val="Slight"/>
                </q-item-section>
                <q-item-section>
                  <q-item><p>2</p><p>Slight</p></q-item>
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="value" val="Moderate"/>
                </q-item-section>
                <q-item-section>
                  <q-item><p>3</p><p>Moderate</p></q-item>
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section avatar top>
                  <q-radio v-model="value" val="Somewhat strong"/>
                </q-item-section>
                <q-item-section>
                  <q-item><p>4</p><p>Somewhat strong</p></q-item>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="value" val="Strong"/>
                </q-item-section>
                <q-item-section>
                  <q-item><p>5</p><p>Strong</p></q-item>
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="value" val="6" />
                </q-item-section>
                <q-item-section>
                  <q-item><p>6</p></q-item>
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section avatar top>
                  <q-radio v-model="value" val="Very strong" />
                </q-item-section>
                <q-item-section>
                  <q-item><p>7</p><p>Very strong</p></q-item>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="value" val="8" />
                </q-item-section>
                <q-item-section>
                  <q-item><p>8</p></q-item>
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="value" val="Very very strong" />
                </q-item-section>
                <q-item-section>
                  <q-item><p>9</p><p>Very very strong</p></q-item>
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section avatar top>
                  <q-radio v-model="value" val="Maximal" />
                </q-item-section>
                <q-item-section>
                  <q-item><p>10</p><p>Maximal</p></q-item>
                </q-item-section>
              </q-item>
            </q-list>

            <div class="q-px-sm q-mt-sm">
              <p class="sub-heading">Your selection is: <strong>{{ value }}</strong></p>
            </div>
          </div>
        </q-item-section>
      </q-item >
    <div id="submit">
    <q-btn color="primary" v-if="isCompleted && isPrematureCompletion" @click="start()" :label="$t('Submit')" />
</div>
    <q-item class="q-mt-md">
    <q-item-section v-if="!instruction && !isCompleted">
    <div class="text-center text-h6 q-mt-lg">
      6MWT
    </div>
    <div id="map">
    </div>
       <p id="timer"> {{ minutes }}:{{ seconds }} </p>
    <q-btn  @click="toggleTest" v-if="!isStarted" color="secondary" label="Start" :disabled="isCompleted" />
    <q-btn  @click="preMatureCompleteTest" v-if="isStarted" color="purple" label="Complete" />
    </q-item-section>
    </q-item>
  </q-page>
</template>

<script>
import { Loader } from 'google-maps'
import phone from '../../modules/phone'
const options = {/* todo */}

export default {
  name: 'SMWTPage',
  components: {},
  data: function () {
    return {
      value: ' ',
      task: {},
      taskDescr: {},
      loading: false,
      map: null,
      isStarted: false,
      isCompleted: false,
      instruction: true,
      isPrematureCompletion: false,
      timer: null,
      totalTime: 360,
      distance: 0,
      showDistance: 0,
      maxspeed: 2,
      speed: 0,
      signal_minaccuracy: 15,
      selection_period: 5,
      positions: [],
      selectedPositions: [],
      steps: [],
      path: []
    }
  },

  methods: {
    start () {
      this.instruction = false
    },
    async createMap (lat, lng) {
      const loader = new Loader('AIzaSyDOYV2ngQg69SmJQukqtnaZPKeSIX70CKg', options)

      const google = await loader.load()
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat, lng },
        zoom: 16
      })

      var walkingPath = new google.maps.Polyline({
        path: this.path,
        geodesic: true,
        strokeColor: '#0000FF',
        strokeOpacity: 1.0,
        strokeWeight: 2
      })

      walkingPath.setMap(map)
      this.map = map
    },
    toggleTest () {
      if (!this.isStarted) {
        this.isStarted = true
        this.startTest()
      }
    },
    preMatureCompleteTest () {
      this.completeTest()
      this.isPrematureCompletion = true
      this.countDown = null
    },
    completeTest () {
      this.isStarted = false
      this.isCompleted = true
      this.isPrematureCompletion = false
      this.stopTest()
    },
    startTimer () {
      this.isStarted ? this.timer = setInterval(() => this.countDown(), 1000) : clearInterval(this.timer)
    },
    countDown () {
      if (this.totalTime >= 1) {
        this.totalTime--
      } else {
        this.completeTest()
      }
    },
    padTime (time) {
      return (time < 10 ? '0' : '') + time
    },

    /**
    * Tells the algorithm that the test has officially started
    * @param ts: the timestamp (for testing purposes), not mandatory
    */
    startTest (ts) {
      if (phone.pedometer.isAvailable()) {
        if (phone.pedometer.requestPermission()) {
          phone.pedometer.startNotifications({}, async (step) => {
            this.steps.unshift(step)
          })
        }
      }
      this.distance = 0
      this.isStarted = true
      this.selectedPositions = []
      // select the starting position
      var selected = this.selectPosition(this.positions[0].timestamp, this.selection_period / 4)
      if (!selected) { // if there is no candidate for selection just use the last one
        selected = this.positions[0]
      }
      this.selectedPositions.unshift(selected)
      this.path.push({ lat: this.selectedPositions[0].coords.latitude, lng: this.selectedPositions[0].coords.longitude })
    },
    /** Tells the algorithm that the test has officially ended
    */
    stopTest () {
      this.isStarted = false
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
    selectPosition (time, secs) {
      // if there are no new steps, don't compute distance
      if ((this.positions.length > 1) && this.positions[0].steps && ((this.positions[0].steps - this.positions[1].steps) === 0)) {
        return null
      }

      // use the best sample within secs
      // "best" is the one with highest accuracy and that does not suppose extreme speeds (>10Km hour)
      var bestAccuracy = 10000
      var bestAccuracyI = -1

      for (var i = 0; i < this.positions.length; i++) {
        var pos = this.positions[i]
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
        var speed = 0
        if (this.selectedPositions.length > 0) { // (only possible when there is at least one selected)
          speed = this.crowDist(pos, this.selectedPositions[0]) / ((time - this.selectedPositions[0].timestamp) / 1000) // m/s
        }
        if (speed < this.maxspeed) {
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
    },
    crowDist (point1, point2) {
      var lat1 = point1.coords.latitude
      var lat2 = point2.coords.latitude
      var lon1 = point1.coords.longitude
      var lon2 = point2.coords.longitude
      var R = 6371 // km
      var dLat = this.toRad(lat2 - lat1)
      var dLon = this.toRad(lon2 - lon1)
      lat1 = this.toRad(lat1)
      lat2 = this.toRad(lat2)

      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      var d = R * c
      return d * 1000
    },

    toRad (Value) {
      return Value * Math.PI / 180
    },
    /**
    * A position is available and has to be computed
    * @param position: the position object, like { timestamp: ttt, coords: {longitude: xx, latitude: yy, accuracy: zz,a ltitude: bbb}, steps: ss}, steps can be undefined or null!
    * @return for debugging purposes, returns true if the sample was selected
    */
    addPosition (position) {
      this.positions.unshift(position)

      if (this.isStarted) {
        // selection criterium
        if ((position.timestamp - this.selectedPositions[0].timestamp) >= (this.selection_period * 1000)) {
          // select the best one within a reasonable time window
          var selected = this.selectPosition(position.timestamp, this.selection_period / 4)
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
    isSignalOK () {
      // we define "enough quality" when there is altitude (means that the GPS is on)
      // and the accuracy is less than CHECKSIGNAL_MINACCURACY
      var lastP = this.positions[0]
      return lastP && (lastP.coords.altitude) && (lastP.coords.accuracy <= this.signal_minaccuracy)
    },
    /**
    * Computes the latest available distance
    * if the test is not stopped it will give the best effort estimation
    */
    getDistance () {
      if (this.isStarted) {
        // if there are no new steps, freeze the distance
        if ((this.positions.length > 1) && (this.positions[0].steps || (this.positions[0].steps === 0)) && ((this.positions[0].steps - this.positions[1].steps) === 0)) {
          return this.showDistance
        }
        var d = this.crowDist(this.selectedPositions[0], this.positions[0])
        this.showDistance = this.distance + d
        return this.showDistance
      } else {
        // when not running, give the official one
        return this.distance
      }
    },
    getSpeed () {
      const secs = parseInt(this.minutes * 60, 10) + parseInt(this.seconds, 10)
      const time = 360 - secs
      this.speed = this.distance / time
    }
  },

  watch: {
    isStarted () {
      this.startTimer()
      phone.screen.forbidSleep()
    },
    instruction () {
      // setTimeout(() => {
      this.createMap(this.positions[0].coords.latitude, this.positions[0].coords.longitude)
      // }, 500)
    },
    isCompleted () {
      this.getDistance()
      this.getSpeed()
      phone.pedometer.stopNotifications()
      phone.geolocation.stopNotifications()
      phone.screen.allowSleep()
    }
  },
  computed: {
    minutes () {
      return this.padTime(Math.floor(this.totalTime / 60))
    },
    seconds () {
      return this.padTime(this.totalTime - (this.minutes * 60))
    }
  },

  beforeDestroy: function () {
    phone.screen.allowSleep()
    phone.geolocation.stopNotifications()
    phone.pedometer.stopNotifications()
    this.stopTest()
  },
  async mounted () {
    if (await phone.geolocation.isAvailable()) {
      if (await phone.geolocation.requestPermission()) {
        phone.geolocation.startNotifications({}, async (position) => {
          if (this.steps !== undefined) {
            position.steps = (this.steps[0])
          }
          this.addPosition(position)
        })
      }
    }
  }
}
</script>

<style>
#map {
  width: 100%;
  height: 50vh;
}

#timer {
  font-size: 36px;
  text-align: center;
}

#completedText {
  text-align: center;
  font-size: 36px;
}

img {
  width: 40%;
  margin: 0px auto;
}

table {
  background: #f8f8f8;
  padding: 4px;
  width: 70%;
  margin: 0px auto;
  font-size: 0.75rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
}

table td:nth-child(2) {
  text-align: right;
}
tr {
  text-align: left
}

.q-pa-md {
  padding-top: 20px;
}

.sub-heading {
  font-size: 14px;
  text-align: left
}

div.q-list {
  border: 1px solid #ccc;
}

div.q-list label {
  font-size: 14px;
}

div.q-item {
  display: flex;
  justify-content: space-between;
  padding: 0px;
}

div.q-item p {
  margin: 0px;
  padding: 12px 5px
}

#submit {
  text-align: center;
}
</style>
