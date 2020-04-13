<template>
  <q-page padding>
    <!-- content -->
    <div v-if="instruction && !isCompleted">
      <div class="text-center text-h6 q-mt-lg">{{ $t('studies.tasks.smwt.title') }}</div>
        <q-item class="q-mt-md">
          <q-item-section>
            <q-item-label class="q-pb-sm">{{ $t('studies.tasks.smwt.introduction') }}</q-item-label>
            <q-item-label caption>{{ $t('studies.tasks.smwt.description') }}</q-item-label>
            <q-item-label class="q-pb-sm">{{ $t('studies.tasks.smwt.instructions') }}</q-item-label>
            <q-item-label caption>
              {{ $t('studies.tasks.smwt.smwtNote') }}
              <p><i>{{ $t('studies.tasks.smwt.noteGPS') }}</i></p>
              <ul id="example-1">
                <li v-for="(instruction, idx) in $t('studies.tasks.smwt.smwtInstructions')" :key="idx">
                  {{ instruction.i }}
                </li>
              </ul>
            </q-item-label>
              <div class="row justify-center q-mt-lg">
            <q-btn color="primary" @click="start()" :label="$t('common.start')" :disable="!this.positions" />
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
                    <q-radio v-model="value" val="0" />
                  </q-item-section>
                  <q-item-section>
                    <q-item><p>0</p> <p>No Exertion</p></q-item>
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio v-model="value" val="0.5" />
                  </q-item-section>
                  <q-item-section>
                    <q-item><p>0.5</p> <p>Very very slight</p></q-item>
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="value" val="1"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item><p>1</p> <p>Very slight</p></q-item>
                  </q-item-section>
                </q-item>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio v-model="value" val="2"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item><p>2</p><p>Slight</p></q-item>
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio v-model="value" val="3"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item><p>3</p><p>Moderate</p></q-item>
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="value" val="4"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item><p>4</p><p>Somewhat strong</p></q-item>
                  </q-item-section>
                </q-item>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio v-model="value" val="5"/>
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
                    <q-radio v-model="value" val="7" />
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
                    <q-radio v-model="value" val="9" />
                  </q-item-section>
                  <q-item-section>
                    <q-item><p>9</p><p>Very very strong</p></q-item>
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-radio v-model="value" val="10"/>
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
    <q-btn color="primary" v-if="isCompleted && isPrematureCompletion" @click="send()" :label="$t('common.send')" />
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
import { exportFile } from 'quasar'
import phone from '../../modules/phone'
import API from '../../modules/API.js'
import DB from '../../modules/db.js'
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
      var marker = new google.maps.Marker({
        position: { lat, lng }
      })
      marker.setMap(map)
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
    },
    saveDataToFile () {
      const secs = parseInt(this.minutes * 60, 10) + parseInt(this.seconds, 10)
      const time = 360 - secs
      const studyKey = 'SMWT' // this.$route.params.studyKey
      const taskId = 1 // Number(this.$route.params.taskID)
      const SMWT = ({
        userKey: 'userKey', // userinfo.user._key,
        studyKey: studyKey,
        taskId: taskId,
        dataType: this.taskDescr.dataType,
        createdTS: new Date(),
        positions: this.selectedPositions,
        distance: this.distance,
        borgScale: this.value,
        time: time
      })
      const filename = 'SMWT_' + SMWT.createdTS.toISOString() + '.json'
      const status = exportFile(filename, JSON.stringify(SMWT), 'application/json')
      if (status === true) {
        console.log('Saved', SMWT)
        // browser allowed it
      } else {
        // browser denied it
        console.log('Error: ' + status)
      }
    },
    async send () {
      this.loading = true

      // Method for saving data object on file.
      // Only for testing purposes! Please remove before deploying app.
      this.saveDataToFile()

      // Save the data to server
      try {
        const secs = parseInt(this.minutes * 60, 10) + parseInt(this.seconds, 10)
        const time = 360 - secs
        let studyKey = 'SMWT' // this.$route.params.studyKey
        let taskId = 1 // Number(this.$route.params.taskID)
        await API.sendSMWTData({
          userKey: 'userKey', // userinfo.user._key,
          studyKey: studyKey,
          taskId: taskId,
          dataType: this.taskDescr.dataType,
          createdTS: new Date(),
          positions: this.selectedPositions,
          distance: this.distance,
          borgScale: this.value,
          time: time
        })
        await DB.setTaskCompletion(studyKey, taskId, new Date())
        // this.$q.notify({
        //   color: 'positive',
        //   message: 'Data sent successfully!',
        //   icon: 'check'
        // })
        // let _this = this
        this.$router.push('/home', function () {
          // _this.$router.go() // I think this refreshes /home so that notifications are rescheduled appropriately
          window.location.reload(true)
        })
      } catch (error) {
        this.loading = false
        console.error(error)
        this.$q.notify({
          color: 'negative',
          message: 'Cannot send data: ' + error.message,
          icon: 'report_problem',
          onDismiss () {
            this.$router.push('/home')
          }
        })
      }
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
