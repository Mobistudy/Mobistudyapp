<template>
  <q-page padding>
    <div class="text-center text-h6 q-mt-lg">
      {{ $t('studies.tasks.smwt.title') }}
    </div>
    <div id="map"/>
    <div v-show="isSignalCheck" class="text-subtitle1 text-center ">{{ $t('studies.tasks.smwt.signalCheck') }}</div>
    <p v-show="isStarted" id="timer"> {{ minutes }}:{{ seconds }} </p>
      <div class="row justify-center q-mt-lg">
        <q-btn  @click="startTest" v-show="!isStarted" color="secondary" :label="$t('common.start')" :disabled="isSignalCheck" />
        <q-btn  @click="completeTest" v-show="isStarted" color="purple" :label="$t('common.complete')" />
      </div>
  </q-page>
</template>

<script>
import { Loader } from 'google-maps'
import phone from '../../modules/phone'
import distanceAlgo from '../../modules/outdoorDistance.js'
import userinfo from '../../modules/userinfo.js'

const TEST_DURATION = 30

export default {
  name: 'SMWTPage',
  data: function () {
    return {
      borgValue: undefined,
      loading: false,
      isSignalCheck: true,
      map: undefined,
      marker: undefined,
      isStarted: false,
      isCompleted: false,
      timer: undefined,
      totalTime: TEST_DURATION,
      startedTS: undefined,
      completionTS: undefined,
      positions: [],
      steps: [],
      distance: 0
    }
  },
  mounted: async function () {
    distanceAlgo.reset()
    const loader = new Loader(process.env.MAPS_API, {})
    const google = await loader.load()

    // start signal check
    this.isSignalCheck = true
    let signalCheckStartedTS = new Date()
    if (await phone.geolocation.isAvailable()) {
      if (await phone.geolocation.requestPermission()) {
        phone.geolocation.startNotifications({}, async (position) => {
          if (this.positions.length === 0) {
            // we are receiving the first position, we can initialise the map now
            this.map = new google.maps.Map(document.getElementById('map'), {
              center: { lat: position.coords.latitude, lng: position.coords.longitude },
              zoom: 17,
              disableDefaultUI: true,
              gestureHandling: 'none'
            })
          }
          // update the map
          this.map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
          if (this.marker) this.marker.setMap(null)
          this.marker = new google.maps.Marker({
            position: { lat: position.coords.latitude, lng: position.coords.longitude }
          })
          this.marker.setMap(this.map)

          this.positions.push(position)
          if (this.steps.length !== 0) {
            position.steps = this.steps[this.steps.length.length - 1]
          }
          distanceAlgo.addPosition(position)

          if (this.isSignalCheck) {
            // start if the signal is OK or after 2 minutes anyhow
            if (distanceAlgo.isSignalOK() || ((new Date() - signalCheckStartedTS) >= 120000)) {
              // start the next phase
              this.isSignalCheck = false
            }
          }
        })
      }
    }
  },
  methods: {
    async startTest () {
      if (await phone.pedometer.isAvailable()) {
        if (await phone.pedometer.requestPermission()) {
          phone.pedometer.startNotifications({}, (position) => {
            this.steps.push(position)
          })
        }
      }
      phone.screen.forbidSleep()
      distanceAlgo.startTest()
      this.startTimer()
      this.isStarted = true
      this.startedTS = new Date()
    },
    startTimer () {
      this.totalTime = TEST_DURATION
      this.timer = setInterval(() => this.countDown(), 1000)
    },
    stopTimer () {
      clearInterval(this.timer)
    },
    countDown () {
      if (this.totalTime >= 1) {
        this.totalTime--
      } else {
        this.completeTest()
      }
    },
    completeTest () {
      this.isStarted = false
      this.completionTS = new Date()
      this.stopTimer()
      phone.pedometer.stopNotifications()
      phone.geolocation.stopNotifications()
      phone.screen.allowSleep()

      this.isCompleted = true
      distanceAlgo.stopTest()

      this.distance = distanceAlgo.getDistance()

      // package the 6mwt report
      const studyKey = this.$route.params.studyKey
      const taskID = parseInt(this.$route.params.taskID)
      const userKey = userinfo.user._key
      let report = {
        userKey: userKey,
        studyKey: studyKey,
        taskId: taskID,
        createdTS: new Date(),
        startedTS: this.startedTS,
        completionTS: this.completionTS,
        positions: this.positions,
        steps: this.steps,
        distance: this.distance,
        borgScale: undefined
      }

      this.$router.push({ name: 'smwtSummary', params: { report: report } })
    },
    padTime (time) {
      return (time < 10 ? '0' : '') + time
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
    this.stopTimer()
    phone.screen.allowSleep()
    phone.geolocation.stopNotifications()
    phone.pedometer.stopNotifications()
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
</style>
