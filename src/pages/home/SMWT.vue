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
      <q-item-section id="completedText" v-if="isCompleted && !isPrematureCompletion">
          <p>You completed the test!</p>
      </q-item-section>

      <q-item-section id="completedText" v-if="isPrematureCompletion">
          <p>You completed the test in {{ minutes }}:{{ seconds }}!</p>
      </q-item-section>
    </q-item >

    <q-item class="q-mt-md">
    <q-item-section v-if="!instruction && !isCompleted">
    <div class="text-center text-h6 q-mt-lg">
      6MWT
    </div>
    <div id="map">
    </div>
       <p id="timer"> {{ minutes }}:{{ seconds }} </p>
    <q-btn  @click="toggleTest" v-if="!isStarted && !isPaused" color="secondary" label="Start" :disabled="isCompleted" />
    <q-btn  @click="toggleTest" v-if="isStarted && !isPaused" color="deep-orange" label="Pause" />
    <q-btn  @click="toggleTest" v-if="isStarted && isPaused" color="secondary" label="Resume" />
    <q-btn  @click="preMatureCompleteTest" v-if="isStarted" color="purple" label="Complete" />
    </q-item-section>
    </q-item>
  </q-page>
</template>

<script>
import { Loader } from 'google-maps'
const options = {/* todo */}

export default {
  name: 'SMWTPage',
  components: {},
  data: function () {
    return {
      task: {},
      taskDescr: {},
      loading: false,
      map: null,
      coords: null,
      isStarted: false,
      isPaused: false,
      isCompleted: false,
      instruction: true,
      isPrematureCompletion: false,
      timer: null,
      totalTime: 360,
      distance: 0,
      showDistance: 0,
      maxspeed: 2,
      signal_minaccuracy: 15,
      selection_period: 5,
      positions: [
        {
          timestamp: new Date().getTime(),
          coords: {
            latitude: 51.751985,
            longitude: 1.257609,
            altitude: 69.82,
            accuracy: 9
          },
          steps: 2
        },
        {
          timestamp: new Date().getTime(),
          coords: {
            latitude: 51.751985 + 2.1055e-6,
            longitude: 1.257609 + 1.83055e-5,
            altitude: 69.82,
            accuracy: 9
          },
          steps: null
        }
      ],
      selectedPositions: [],
      started: false
    }
  },

  methods: {
    start () {
      this.instruction = false
    },

    getLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          // this.positions = pos
          this.coords = pos.coords
        })
      } else {
        console.log('Geolocation is not supported by this browser.')
      }
    },
    async createMap (lat, lng) {
      const loader = new Loader('AIzaSyDOYV2ngQg69SmJQukqtnaZPKeSIX70CKg', options)

      const google = await loader.load()
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat, lng },
        zoom: 16
      })
      this.map = map
    },
    toggleTest () {
      if (!this.isStarted) {
        this.isStarted = true
        this.startTest()
      } else if (this.isStarted && !this.isPaused) {
        this.isPaused = true
      } else if (this.isStarted && this.isPaused) {
        this.isPaused = false
      }
    },
    preMatureCompleteTest () {
      this.completeTest()
      this.isPrematureCompletion = true
      this.countDown = null
    },
    completeTest () {
      this.isStarted = false
      this.isPaused = false
      this.isCompleted = true
      this.isPrematureCompletion = false
      this.stopTest()
    },
    startTimer () {
      this.timer = setInterval(() => this.countDown(), 1000)
    },
    pauseTimer () {
      // stop algorithm
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
      this.distance = 0
      this.started = true
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
    selectPosition (time, secs) {
      // if there are no new steps, don't compute distance
      if ((this.positions.length > 1) && this.positions[0].steps && ((this.positions[0].steps - this.positions[0].steps) === 0)) {
        return null
      }

      // use the best sample within secs
      // "best" is the one with highest accuracy and that does not suppose extreme speeds (>10Km hour)
      var bestAccuracy = 10000
      var bestAccuracyI = -1

      for (var i = 0; i < this.positions.length; i++) {
        var pos = this.positions[i]
        console.log(pos)
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

      if (this.started) {
        // selection criterium
        if ((this.position.timestamp - this.selectedPositions[0].timestamp) >= (this.selection_period * 1000)) {
          // select the best one within a reasonable time window
          var selected = this.selectPosition(this.position.timestamp, this.selection_period / 4)
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
      if (this.started) {
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
    }
  },

  watch: {
    isStarted () {
      this.startTimer()
    },
    isPaused () {
      this.isPaused ? this.pauseTimer() : this.startTimer()
    },
    instruction () {
      // setTimeout(() => {
      this.createMap(this.coords.latitude, this.coords.longitude)
      // }, 500)
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
  async mounted () {
    this.getLocation()
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
</style>
