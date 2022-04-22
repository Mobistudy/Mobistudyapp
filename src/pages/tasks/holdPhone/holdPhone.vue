<template>
  <q-page padding>
    <div class="text-center text-h5 q-mt-lg">
      {{ $t('studies.tasks.holdPhone.title') }}
    </div>
    <div
      class="text-center text-subtitle1 q-mt-xl"
      v-show="testPhase === 0"
    >
      {{ $t('studies.tasks.holdPhone.instructions.preRestingLeft') }}
    </div>
    <div
      class="text-center text-subtitle1 q-mt-xl"
      v-show="testPhase === 2"
    >
      {{ $t('studies.tasks.holdPhone.instructions.preRestingRight') }}
    </div>
    <div
      class="text-center text-subtitle1 q-mt-xl"
      v-show="testPhase === 4"
    >
      {{ $t('studies.tasks.holdPhone.instructions.prePosturalLeft') }}
    </div>
    <div
      class="text-center text-subtitle1 q-mt-xl"
      v-show="testPhase === 6"
    >
      {{ $t('studies.tasks.holdPhone.instructions.prePosturalRight') }}
    </div>
    <div
      class="text-center text-subtitle1 q-mt-lg"
      v-show="testPhase === 8"
    >
      {{ $t('studies.tasks.holdPhone.instructions.preKineticLeft') }}
    </div>
    <div
      class="text-center text-subtitle1 q-mt-xl"
      v-show="testPhase === 10"
    >
      {{ $t('studies.tasks.holdPhone.instructions.preKineticRight') }}
    </div>

    <div
      class="text-center text-subtitle1 q-mt-xl"
      v-show="testPhase % 2 != 0"
    >
      {{ $t('studies.tasks.holdPhone.instructions.afterStart') }}
    </div>

    <div class="row justify-center q-mt-xl">
      <q-btn
        @click="startTest"
        v-show="testPhase % 2 == 0"
        color="primary"
        :label="$t('common.start')"
      />
    </div>
  </q-page>
</template>

<script>
import phone from 'modules/phone/phone'
import userinfo from 'modules/userinfo'

const TEST_DURATION = 10 // 10 sec

// buffers that hold orientation and motion data
let orientations = []
let motions = []

export default {
  name: 'HoldThePhonePage',
  props: {
    studyKey: String,
    taskId: Number
  },
  data: function () {
    return {
      timer: undefined,
      report: {
        userKey: userinfo.user._key,
        participantKey: userinfo.user.participantKey,
        studyKey: this.studyKey,
        taskId: parseInt(this.taskId),
        taskType: 'holdPhone',
        createdTS: new Date(),
        phone: phone.device,
        summary: {
          startedTS: '',
          completedTS: '',
          resting: {
            left: {},
            right: {}
          },
          postural: {
            left: {},
            right: {}
          },
          kinetic: {
            left: {},
            right: {}
          }
        },
        data: {
          resting: {
            left: {},
            right: {}
          },
          postural: {
            left: {},
            right: {}
          },
          kinetic: {
            left: {},
            right: {}
          }
        }
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

  methods: {

    async startTest () {
      this.testPhase++
      phone.screen.forbidSleep()

      if (this.testPhase % 2 !== 0) {
        // clean the buffers
        orientations = []
        motions = []
      }

      let now = new Date()

      if (this.testPhase === 1) {
        // 1 = resting left

        this.report.summary.startedTS = now
        this.report.summary.resting.left.startedTS = now
        this.report.data.resting.left.startedTS = now
      } else if (this.testPhase === 3) {
        // 3 = resting right

        this.report.summary.resting.right.startedTS = now
        this.report.data.resting.right.startedTS = now
      } else if (this.testPhase === 5) {
        // 5 = postural left

        this.report.summary.postural.left.startedTS = now
        this.report.data.postural.left.startedTS = now
      } else if (this.testPhase === 7) {
        // 7 = postural right

        this.report.summary.postural.right.startedTS = now
        this.report.data.postural.right.startedTS = now
      } else if (this.testPhase === 9) {
        // 9 = kinetic left

        this.report.summary.kinetic.left.startedTS = now
        this.report.data.kinetic.left.startedTS = now
      } else if (this.testPhase === 11) {
        // 11 = kinetic right

        this.report.summary.kinetic.right.startedTS = now
        this.report.data.kinetic.right.startedTS = now
      }

      try {
        if (await phone.orientation.isAvailable()) {
          await phone.orientation.requestPermission()
          phone.orientation.startNotifications({}, (event) => {
            orientations.push(event)
          }, (error) => {
            console.error('Error getting orientation event', error)
          })
        }
      } catch (err) {
        console.error('Error getting OrientationEvent', err)
      }

      try {
        if (await phone.motion.isAvailable()) {
          await phone.motion.requestPermission()
          phone.motion.startNotifications({}, (event) => {
            motions.push(event)
          }, (error) => {
            console.error('Error getting MotionEvent', error)
          })
        }
      } catch (err) {
        console.error('Error getting MotionEvent', err)
      }

      this.timer = setTimeout(this.completePhase, TEST_DURATION * 1000)
    },

    stopTimer () {
      clearTimeout(this.timer)
    },

    completePhase () {
      this.stopTimer()
      phone.orientation.stopNotifications()
      phone.motion.stopNotifications()
      phone.screen.allowSleep()

      phone.vibrate(2000)

      let now = new Date()
      if (this.testPhase === 1) {
        // 1 = resting left

        this.report.data.resting.left.completedTS = now
        this.report.summary.resting.left.completedTS = now
        this.report.data.resting.left.motion = motions
        this.report.data.resting.left.orientation = orientations
      } else if (this.testPhase === 3) {
        // 3 = resting right

        this.report.data.resting.right.completedTS = now
        this.report.summary.resting.right.completedTS = now
        this.report.data.resting.right.motion = motions
        this.report.data.resting.right.orientation = orientations
      } else if (this.testPhase === 5) {
        // 5 = postural left

        this.report.data.postural.left.completedTS = now
        this.report.summary.postural.left.completedTS = now
        this.report.data.postural.left.motion = motions
        this.report.data.postural.left.orientation = orientations
      } else if (this.testPhase === 7) {
        // 7 = postural right

        this.report.data.postural.right.completedTS = now
        this.report.summary.postural.right.completedTS = now
        this.report.data.postural.right.motion = motions
        this.report.data.postural.right.orientation = orientations
      } else if (this.testPhase === 9) {
        // 9 = kinetic left

        this.report.data.kinetic.left.completedTS = now
        this.report.summary.kinetic.left.completedTS = now
        this.report.data.kinetic.left.motion = motions
        this.report.data.kinetic.left.orientation = orientations
      } else if (this.testPhase === 11) {
        // 11 = kinetic right

        this.report.data.kinetic.right.completedTS = now
        this.report.summary.kinetic.right.completedTS = now
        this.report.data.kinetic.right.motion = motions
        this.report.data.kinetic.right.orientation = orientations

        // test is finished!
        this.report.summary.completedTS = new Date()
        this.$router.push({ name: 'holdPhoneSummary', params: { report: this.report } })
        return
      }

      this.testPhase++
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
