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
      totalTime: 360
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
      this.completeTest()
      this.isPrematureCompletion = true
      this.countDown = null
    },
    completeTest () {
      this.isStarted = false
      this.isPaused = false
      this.isCompleted = true
      this.isPrematureCompletion = false
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
