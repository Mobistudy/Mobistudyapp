<template>
  <q-page padding>
    <!-- content -->
    <div v-if="instruction">
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
              <li>It is important that you try to walk as straight as possible. Try to avoid stairs and/or steap hills</li>
              <li>If possible, try to avoid areas with many tall buildings and / or trees as these can affect the GPS function of your phone.</li>
              <li>When you are ready to start the test, press the "Start"-button.</li>
              <li>You may slow down if necessary. If you stand still during the test, please press the "Pause"-button and then continue to walk again as soon as possible.</li>
              <li>The test will automaticly stop after 6 minutes, and you will be asked to send the collected data. If you need to complete the test earlier, press the "Complete"-button.</li>
              <li>Try not to talk during the test, as this may affect your performance.</li>
              <li>Stop emediatly if you have any chest pain or dizziness. </li>
            </ul>
          </q-item-label>
             <div class="row justify-center q-mt-lg">
          <q-btn color="primary" @click="start()" :label="$t('common.start')" />
        </div>
        </q-item-section>
    </q-item>
    </div>

    <div v-if="!instruction">
    <p>6MWT</p>
    <div id="map">
    </div>
    <q-btn  @click="toggleTest" v-if="!isStarted && !isPaused" color="secondary" label="Start" :disabled="isCompleted" />
    <q-btn  @click="toggleTest" v-if="isStarted && !isPaused" color="deep-orange" label="Pause" />
    <q-btn  @click="toggleTest" v-if="isStarted && isPaused" color="secondary" label="Resume" />
    <q-btn  @click="preMatureCompleteTest" v-if="isStarted" color="purple" label="Complete" />
    <p> {{ minutes }} : {{ seconds }} </p>
    </div>
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
      instruction: true,
      isPrematureCompletion: false,
      timer: null,
      totalTime: 0
    }
  },
  methods: {
    start () {
      this.instruction = false
    },
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
    this.getLocation()
    setTimeout(() => {
      this.createMap(this.coords.latitude, this.coords.longitude)
    }, 500)
  }
}
</script>

<style>
</style>
