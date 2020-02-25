<template>
  <q-page padding>
    <!-- content -->
    <p>6MWT</p>
    <div id="map">
    </div>
    <q-btn  @click="toggleTest" v-if="!isStarted && !isPaused" color="secondary" label="Start" :disabled="isCompleted" />
    <q-btn  @click="toggleTest" v-if="isStarted && !isPaused" color="deep-orange" label="Pause" />
    <q-btn  @click="toggleTest" v-if="isStarted && isPaused" color="secondary" label="Resume" />
    <q-btn  @click="preMatureCompleteTest" v-if="isStarted" color="purple" label="Complete" />
    <p> {{ minutes }} : {{ seconds }} </p>
    <section v-if="isCompleted">

    </section>
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
      isPrematureCompletion: false,
      timer: null,
      totalTime: 0
    }
  },
  methods: {
    getLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
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
      } else if (this.isStarted && !this.isPaused) {
        this.isPaused = true
      } else if (this.isStarted && this.isPaused) {
        this.isPaused = false
      }
    },
    preMatureCompleteTest () {
      this.isStarted = false
      this.isPaused = false
      this.isCompleted = true
      this.isPrematureCompletion = true
    },
    completeTest () {
      this.isStarted = false
      this.isPaused = false
      this.isCompleted = true
      this.isPrematureCompletion = false
    },
    startTimer () {
      this.timer = setInterval(() => this.countup(), 1000)
    },
    pauseTimer () {
      clearInterval(this.timer)
      this.timer = null
    },
    countup () {
      if (this.totalTime <= 359) {
        this.totalTime++
      } else {
        this.completeTest()
      }
    }
  },
  watch: {
    isStarted () {
      this.startTimer()
    },
    isPaused () {
      this.isPaused ? this.pauseTimer() : this.startTimer()
    }
  },
  computed: {
    minutes () {
      return Math.floor(this.totalTime / 60)
    },
    seconds () {
      return this.totalTime - (this.minutes * 60)
    }
  },
  async mounted () {
    this.componentLoaded = true
    this.getLocation()
    setTimeout(() => {
      this.createMap(this.coords.latitude, this.coords.longitude)
    }, 500)
  }
}
</script>

<style>
</style>
