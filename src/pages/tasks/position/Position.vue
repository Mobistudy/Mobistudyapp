<template>
  <q-page padding>
    <!-- <div
      ref="map"
      style="width: 100%; height: 50vh;"
      class="row justify-center items-center"
    >
    </div> -->
    <div
      v-show="!position"
      class="text-subtitle1 text-center "
    >{{ $t('studies.tasks.position.signalCheck') }}</div>
    <div
      v-show="position && (!weather || !pollution || !pollen)"
      class="text-subtitle1 text-center "
    >{{ $t('studies.tasks.position.apiCalling') }}</div>
    <div
      v-show="weather"
      class="text-subtitle1 text-center "
    >{{ $t('studies.tasks.position.approxLocation') }}{{ weather.location }}
    </div>
    <div class="row justify-center q-mt-lg">
      <!-- <q-btn
        @click="getPostcode"
        v-show="!position"
        color="primary"
        :label="$t('common.start')"
        :disabled="isSignalCheck"
      /> -->
      <!-- <q-btn
        @click="getPostcode"
        color="primary"
        :label="$t('common.start')"
      /> -->
      <q-btn
        @click="completeTest"
        v-show="position"
        color="secondary"
        :label="$t('common.complete')"
      />
    </div>
    <div
      v-show="weather"
      class="text-subtitle2 text-center ">
      <img :src="weather.icon"> <br/>
      {{ $t('studies.tasks.position.weather') }}{{ weather.description }} <br/>
      {{ $t('studies.tasks.position.temperature') }}{{ weather.temperature }} °C <br/>
      {{ $t('studies.tasks.position.humidity') }}{{ weather.humidity }}% <br/>
      {{ $t('studies.tasks.position.clouds') }}{{ weather.clouds }}% <br/>
      {{ $t('studies.tasks.position.wind') }}{{ weather.wind }}m/s <br/>
    </div>
    <div
      v-show="pollution"
      class="text-subtitle2 text-center ">
      <br/>
      {{ $t('studies.tasks.position.airQuality') }}
      {{ pollution.aqi==1 ? $t('studies.tasks.position.aqiscale.l1') : '' }}
      {{ pollution.aqi==2 ? $t('studies.tasks.position.aqiscale.l2') : '' }}
      {{ pollution.aqi==3 ? $t('studies.tasks.position.aqiscale.l3') : '' }}
      {{ pollution.aqi==4 ? $t('studies.tasks.position.aqiscale.l4') : '' }}
      {{ pollution.aqi==5 ? $t('studies.tasks.position.aqiscale.l5') : '' }}
    </div>
    <div
      v-show="pollen"
      class="text-subtitle2 text-center ">
      Grass: {{ pollen.risk.grass_pollen }} <br/>
      Tree: {{ pollen.risk.tree_pollen }} <br/>
      Weed: {{ pollen.risk.weed_pollen }} <br/>
    </div>
  </q-page>
</template>

<style scoped>
#timer {
  font-size: 3rem;
  text-align: center;
  padding: 0px;
  margin: 0px;
}

.text-subtitle1 {
  line-height: 4.25;
}
</style>

<script>
import phone from 'modules/phone'
import DB from 'modules/db'
// import distanceAlgo from 'modules/outdoorDistance'
import userinfo from 'modules/userinfo'
import { format as Qformat } from 'quasar'
// import axios from 'axios'

const CLOSE_TS = 600000 // 10 minutes
const CLOSE_LONG_LAT = 0.001 // 111 meters
const MAX_DAILY_API_CALLS = 2

export default {
  name: 'PositionPage',
  props: {
    studyKey: String,
    taskId: Number
  },
  data: function () {
    return {
      // isSignalCheck: true,
      // isStarted: false,
      // isCompleted: false,
      // startedTS: undefined,
      // completionTS: undefined,
      positionTS: undefined,
      position: undefined,
      postcode: undefined,
      weather: undefined,
      pollution: undefined,
      pollen: undefined
    }
  },
  mounted: async function () {
    // start signal check
    // this.isSignalCheck = true
    // let signalCheckStartedTS = new Date()
    try {
      if (await phone.geolocation.isAvailable()) {
        console.log('GPS is available')
        phone.geolocation.startNotifications({
          maximumAge: 5000,
          timeout: 30000,
          enableHighAccuracy: true
        }, async (position) => {
          console.log('Got position: ', position)

          if (!this.position) {
            this.positionTS = new Date()
            this.position = position
          }
          phone.geolocation.stopNotifications()

          // check recent API calls
          let oldWeather = await DB.getOldAPIData('weather')
          if (oldWeather) {
            if (this.closePosition(oldWeather.position, position)) {
              this.weather = oldWeather.weather
              console.log('Use old weather, from ' + oldWeather.position.timestamp)
            }
          }
          let oldPollution = await DB.getOldAPIData('pollution')
          if (oldPollution) {
            if (this.closePosition(oldPollution.position, position)) {
              this.pollution = oldPollution.pollution
              console.log('Use old pollution, from ' + oldWeather.position.timestamp)
            }
          }
          let oldPollen = await DB.getOldAPIData('pollen')
          if (oldPollen) {
            if (this.closePosition(oldPollen.position, position)) {
              this.pollen = oldPollen.pollen
              console.log('Use old pollen, from ' + oldWeather.position.timestamp)
            }
          }

          // make calls to API service
          if (!this.weather) {
            var APICalls = await DB.getAPITimeStamp('weather')
            if (!APICalls || APICalls.length <= MAX_DAILY_API_CALLS) {
              this.weather = await phone.weather.getWeather(position)
              console.log('Fetched weather ')
              console.log(this.weather)
              DB.setOldAPIData('weather', {
                position: position,
                weather: this.weather
              })
              DB.setAPITimeStamp('weather', position.timestamp)
            } else {
              this.weather = {
                location: null,
                description: null,
                icon: null,
                temperature: null,
                humidity: null,
                clouds: null,
                wind: null
              }
              this.$q.notify({
                color: 'negative',
                message: this.$i18n.t('studies.tasks.gps.apiCallError'),
                icon: 'report_problem'
              })
            }
          }
          if (!this.pollution) {
            let APICalls = await DB.getAPITimeStamp('pollution')
            if (!APICalls || APICalls.length <= MAX_DAILY_API_CALLS) {
              this.pollution = await phone.weather.getPollution(position)
              console.log('Fetched pollution ')
              console.log(this.pollution)
              DB.setOldAPIData('pollution', {
                position: position,
                pollution: this.pollution
              })
              DB.setAPITimeStamp('pollution', position.timestamp)
            } else {
              this.pollution = {
                aqi: null
              }
              this.$q.notify({
                color: 'negative',
                message: this.$i18n.t('studies.tasks.gps.apiCallError'),
                icon: 'report_problem'
              })
            }
          }
          if (!this.pollen) {
            let APICalls = await DB.getAPITimeStamp('pollen')
            if (!APICalls || APICalls.length <= MAX_DAILY_API_CALLS) {
              this.pollen = await phone.weather.getPollen(position)
              console.log('Fetched pollen ')
              console.log(this.pollen)
              DB.setOldAPIData('pollen', {
                position: position,
                pollen: this.pollen
              })
              DB.setAPITimeStamp('pollen', position.timestamp)
            } else {
              this.pollen = {
                risk: {
                  grass_pollen: null,
                  tree_pollen: null,
                  weed_pollen: null
                },
                species: {}
              }
              this.$q.notify({
                color: 'negative',
                message: this.$i18n.t('studies.tasks.gps.apiCallError'),
                icon: 'report_problem'
              })
            }
          }
        }, (err) => {
          console.error('Cannot retrieve GPS position', err)
        })
      } else {
        // NO GPS AVAILABLE
        console.error('No GPS available')
      }
    } catch (error) {
      console.error('Issues while starting the GPS', error)
    }
  },
  methods: {
    // async startTest () {
    //   this.isStarted = true
    //   this.startedTS = new Date()
    //   this.positionTS = new Date()
    // },
    async getPostcode (position) {
      try {
        await phone.postcodes.getPostcode(position).then(result => {
          this.postcode = result.postcode
          console.log('Got postcode: ' + this.postcode)
        })
      } catch (error) {
        console.error('Issues while getting postcode', error)
      }
    },
    closePosition (position1, position2) {
      // if close enough (10 minutes and within 0.001 = 111 meters)
      return (Math.abs(position1.timestamp - position2.timestamp) < CLOSE_TS && (
        Math.abs(position1.coords.latitude - position2.coords.latitude) < CLOSE_LONG_LAT) && (
        Math.abs(position1.coords.longitude - position2.coords.longitude) < CLOSE_LONG_LAT
      ))
    },
    completeTest () {
      // send report
      const studyKey = this.studyKey
      const taskId = parseInt(this.taskId)
      const userKey = userinfo.user._key
      let report = {
        userKey: userKey,
        studyKey: studyKey,
        taskId: taskId,
        createdTS: new Date(),
        positionTS: this.positionTS,
        // postcode: this.postcode,
        position: this.position,
        weather: this.weather,
        pollution: this.pollution,
        pollen: this.pollen
      }
      this.$router.push({ name: 'gpsSummary', params: { report: report } })
    }
  },
  computed: {
    minutes () {
      return Qformat.pad(Math.floor(this.totalTime / 60))
    },
    seconds () {
      return Qformat.pad(this.totalTime - (this.minutes * 60))
    }
  },

  beforeDestroy: function () {
    phone.geolocation.stopNotifications()
  }
}
</script>
