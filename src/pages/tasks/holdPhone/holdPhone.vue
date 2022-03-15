<template>
  <q-page padding>
    <div class="text-center text-h5 q-mt-lg">
      {{ $t('studies.tasks.holdPhone.title') }}
    </div>
    <div
      class="text-center text-h5 q-mt-lg"
      v-show="testPhase === 0"
    >
      {{ $t('studies.tasks.holdPhone.instructions.preRestingLeft') }}
    </div>
    <div
      class="text-center text-h5 q-mt-lg"
      v-show="testPhase === 2"
    >
      {{ $t('studies.tasks.holdPhone.instructions.preRestingRight') }}
    </div>
    <div
      class="text-center text-h5 q-mt-lg"
      v-show="testPhase === 4"
    >
      {{ $t('studies.tasks.holdPhone.instructions.prePosturalLeft') }}
    </div>
    <div
      class="text-center text-h5 q-mt-lg"
      v-show="testPhase === 6"
    >
      {{ $t('studies.tasks.holdPhone.instructions.prePosturalRight') }}
    </div>
    <div
      class="text-center text-h5 q-mt-lg"
      v-show="testPhase === 8"
    >
      {{ $t('studies.tasks.holdPhone.instructions.preKineticLeft') }}
    </div>
    <div
      class="text-center text-h5 q-mt-lg"
      v-show="testPhase === 10"
    >
      {{ $t('studies.tasks.holdPhone.instructions.preKineticRight') }}
    </div>

    <div
      class="text-center text-h5 q-mt-lg"
      v-show="testPhase % 2 != 0"
    >
      {{ $t('studies.tasks.holdPhone.instructions.afterStart') }}
    </div>

    <div class="row justify-center q-mt-lg">
      <q-btn
        @click="startTest"
        v-show="testPhase % 2 == 0"
        color="primary"
        :label="$t('common.start')"
      />
    </div>
  </q-page>
</template>
<!--<template>-->
<!--  <q-page padding>-->
<!--    <div class="text-center text-h5 q-mt-lg">-->
<!--      {{ $t('studies.tasks.holdPhone.title') }}-->
<!--    </div>-->
<!--    <div-->
<!--      ref="map"-->
<!--      style="width: 100%; height: 50vh;"-->
<!--      class="row justify-center items-center"-->
<!--    >-->
<!--      <WalkingMan></WalkingMan>-->
<!--    </div>-->
<!--    <div class="row justify-center q-mt-lg">-->
<!--      <q-btn-->
<!--        @click="startTest"-->
<!--        v-show="!isStarted"-->
<!--        color="primary"-->
<!--        :label="$t('common.start')"-->
<!--      />-->
<!--      <q-btn-->
<!--        @click="completeTest"-->
<!--        v-show="isStarted"-->
<!--        color="secondary"-->
<!--        :label="$t('common.complete')"-->
<!--      />-->
<!--    </div>-->
<!--  </q-page>-->
<!--</template>-->

<script>
import phone from 'modules/phone/phone'
import userinfo from 'modules/userinfo'

const TEST_DURATION = 10 // 10 sec

let orientations = []
let motions = []

export default {
  name: 'TUGTPage',
  props: {
    studyKey: String,
    taskId: Number
  },
  data: function () {
    return {
      timer: undefined,
      totalTime: TEST_DURATION,
      completionTS: undefined,
      report: {
        userKey: this.userKey,
        studyKey: this.studyKey,
        taskId: this.taskId
      },
      // 0 = resting left PRE
      // 1 = resting left
      // 2 = resting right PRE
      // 3 = resting right
      // 4 = postural left PRE
      // 5 = postural left
      // 6 = postural right PRE
      // 7 = postural right
      // 8 = kinetic left PRE
      // 9 = kinetic left
      // 10 = kinetic right PRE
      // 11 = kinetic right
      testPhase: 0
    }
  },

  mounted: async function () {

  },

  methods: {

    async startTest () {
      this.testPhase++
      this.startedTS = new Date()
      phone.screen.forbidSleep()
      if (this.testPhase % 2 !== 0) {
        orientations = []
        motions = []
      }

      console.log(this.testPhase)

      if (this.testPhase === 1) {
        const studyKey = this.studyKey
        const taskId = parseInt(this.taskId)
        const userKey = userinfo.user._key
        this.report.studyKey = studyKey
        this.report.taskId = taskId
        this.report.userKey = userKey

        this.report.createdTS = new Date()
        this.report.startedTS = new Date()
        this.report.resting = {
          left: {
            startedTS: new Date()
          }
        }
      } else if (this.testPhase === 3) {
        this.report.resting.right = {
          startedTS: new Date()
        }
      } else if (this.testPhase === 5) {
        this.report.postural = {
          left: {
            startedTS: new Date()
          }
        }
      } else if (this.testPhase === 7) {
        this.report.postural.right = {
          startedTS: new Date()
        }
      } else if (this.testPhase === 9) {
        this.report.kinetic = {
          left: {
            startedTS: new Date()
          }
        }
      } else if (this.testPhase === 11) {
        this.report.kinetic.right = {
          startedTS: new Date()
        }
      }

      try {
        if (await phone.orientation.isAvailable()) {
          await phone.orientation.requestPermission()
          console.log('OrientationEvent is available')
          phone.orientation.startNotifications({}, (event) => {
            console.log('Got orientation events', event)
            orientations.push(event)
          }, (error) => {
            console.error('Error getting orientation event', error)
          })
        }
      } catch (err) {
        console.error('Issues getting OrientationEvent', err)
      }

      try {
        if (await phone.motion.isAvailable()) {
          await phone.motion.requestPermission()
          console.log('MotionEvent is available')
          phone.motion.startNotifications({}, (event) => {
            console.log('Got motion events', event)
            motions.push(event)
          }, (error) => {
            console.error('Error getting MotionEvent', error)
          })
        }
      } catch (err) {
        console.error('Issues getting MotionEvent', err)
      }

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
        this.completePhase()
      }
    },

    completePhase () {
      this.stopTimer()
      phone.orientation.stopNotifications()
      phone.motion.stopNotifications()
      phone.screen.allowSleep()

      console.log(this.report)

      if (this.testPhase === 1) {
        this.report.resting.left.completionTS = new Date()
        this.report.resting.left.motion = motions
        this.report.resting.left.orientation = orientations
      } else if (this.testPhase === 3) {
        this.report.resting.right.completionTS = new Date()
        this.report.resting.right.motion = motions
        this.report.resting.right.orientation = orientations
      } else if (this.testPhase === 5) {
        this.report.postural.left.completionTS = new Date()
        this.report.postural.left.motion = motions
        this.report.postural.left.orientation = orientations
      } else if (this.testPhase === 7) {
        this.report.postural.right.completionTS = new Date()
        this.report.postural.right.motion = motions
        this.report.postural.right.orientation = orientations
      } else if (this.testPhase === 9) {
        this.report.kinetic.left.completionTS = new Date()
        this.report.kinetic.left.motion = motions
        this.report.kinetic.left.orientation = orientations
      } else if (this.testPhase === 11) {
        this.report.kinetic.right.completionTS = new Date()
        this.report.kinetic.right.motion = motions
        this.report.kinetic.right.orientation = orientations
        this.report.completionTS = new Date()
      }

      console.log(this.report)
      phone.vibrate(2000)

      this.testPhase++

      if (this.testPhase === 12) {
        this.completeTest()
      }
    },

    completeTest () {
      this.$router.push({ name: 'holdPhoneSummary', params: { report: this.report } })
    }
  },

  beforeDestroy: function () {
    motions = []
    orientations = []
    this.stopTimer()
    phone.screen.allowSleep()
    phone.orientation.stopNotifications()
    phone.motion.stopNotifications()
  }
}
</script>
