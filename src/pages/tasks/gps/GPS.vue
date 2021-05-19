<template>
  <q-page padding>
    <div class="text-center text-h5 q-mt-lg">
      {{ $t('studies.tasks.gps.title') }}
    </div>
    <!-- <div
      ref="map"
      style="width: 100%; height: 50vh;"
      class="row justify-center items-center"
    >
    </div> -->
    <div
      v-show="!position"
      class="text-subtitle1 text-center "
    >{{ $t('studies.tasks.gps.signalCheck') }}</div>
    <div
      v-show="position"
      class="text-subtitle1 text-center "
    >{{ $t('studies.tasks.gps.approxPostcode') }}{{postcode}}</div>
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
// import distanceAlgo from 'modules/outdoorDistance'
import userinfo from 'modules/userinfo'
import { format as Qformat } from 'quasar'
// import axios from 'axios'

// const SIGNAL_CHECK_TIMEOUT = 60000

export default {
  name: 'GPSPage',
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
      postcode: undefined
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
          timeout: 5000,
          enableHighAccuracy: true
        }, async (position) => {
          console.log('Got position: ', position)

          this.positionTS = new Date()
          this.position = position
          this.getPostcode(position)
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
        postcode: this.postcode
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
