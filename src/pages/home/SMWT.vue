<template>
  <q-page padding>
    <!-- content -->
    <p>6MWT</p>
    <div id="map">
      {{ map }}
    </div>
    <q-btn  @click="toggleTest" v-if="!isStarted && !isPaused" color="secondary" label="Start" :disabled="isCompleted" />
    <q-btn  @click="toggleTest" v-if="isStarted && !isPaused" color="deep-orange" label="Pause" />
    <q-btn  @click="toggleTest" v-if="isStarted && isPaused" color="secondary" label="Resume" />
    <q-btn  @click="completeTest" v-if="isStarted" color="purple" label="Complete" />
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
      chartData: null,
      chartOptions: null,
      healthData: null,
      plotLine: false,
      plotBar: false,
      loading: false,
      map: null,
      coords: null,
      isStarted: false,
      isPaused: false,
      isCompleted: false
    }
  },
  methods: {
    getLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          this.coords = pos.coords
          console.log(this.coords.latitude)
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
      } else if (this.isStarted && !this.isPaused) {
        this.isPaused = true
      } else if (this.isStarted && this.isPaused) {
        this.isPaused = false
      }
    },
    completeTest () {
      this.isStarted = false
      this.isPaused = false
      this.isCompleted = true
    }
  },
  async mounted () {
    this.getLocation()
    setTimeout(() => {
      this.createMap(this.coords.latitude, this.coords.longitude)
    }, 500)
  }
}
</script>

<style>
</style>
