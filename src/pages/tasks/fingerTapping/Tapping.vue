<template>
  <q-page
    padding
    class="text-center"
  >
    <div class="text-center text-h5 q-mt-lg">
      {{ $t('studies.tasks.fingerTapping.title') }}
    </div>

    <p class="text-center text-subtitle1 q-mt-lg">{{ $t('studies.tasks.fingerTapping.instructions') }}</p>

    <p id="timer"> 00:{{ seconds }} </p>
    <div>
      <q-btn
        @click="startTest"
        :disable="isStarted"
        color="primary"
        :label="$t('common.start')"
      />
    </div>

    <div class="row justify-center q-mb-xl fixed-bottom">

      <q-btn
        round
        size="30px"
        color="secondary"
        @click="leftTapped"
        class="q-mr-lg"
      >1</q-btn>
      <q-btn
        round
        size="30px"
        color="secondary"
        @click="rightTapped"
        class="q-ml-lg"
      >2</q-btn>
    </div>

  </q-page>
</template>

<style scoped>
#timer {
  font-size: 3rem;
}
</style>

<script>
import userinfo from 'modules/userinfo'
import phone from 'modules/phone/phone'
import { format as Qformat } from 'quasar'

const TEST_DURATION = 20

export default {
  name: 'FingerTappingPage',
  props: {
    studyKey: String,
    taskId: Number
  },
  components: {},
  data: function () {
    return {
      isStarted: false,
      isCompleted: false,
      timer: null,
      countDown: TEST_DURATION,
      startedTS: undefined,
      tappingData: []
    }
  },
  methods: {
    async startTest () {
      if (!this.isStarted) {
        this.isStarted = true
        this.startedTS = new Date()
        this.timer = setInterval(() => {
          this.countDown--
          if (this.countDown === 0) {
            this.completeTest()
          }
        }, 1000)
      }
    },
    leftTapped () {
      if (this.isStarted && !this.isCompleted) {
        this.tappingData.push({
          msFromStart: new Date().getTime() - this.startedTS.getTime(),
          side: 'left'
        })
      }
    },
    rightTapped () {
      if (this.isStarted && !this.isCompleted) {
        this.tappingData.push({
          msFromStart: new Date().getTime() - this.startedTS.getTime(),
          side: 'right'
        })
      }
    },
    completeTest () {
      this.isCompleted = true
      let completionTS = new Date()
      const studyKey = this.studyKey

      let report = {
        userKey: userinfo.user._key,
        participantKey: userinfo.user.participantKey,
        studyKey: studyKey,
        taskId: parseInt(this.taskId),
        taskType: 'fingerTapping',
        createdTS: new Date(),
        phone: phone.device,
        summary: {
          startedTS: this.startedTS,
          completedTS: completionTS,
          tappingCount: this.tappingData.length
        },
        data: this.tappingData
      }

      this.$router.push({ name: 'fingerTappingSummary', params: { report: report } })
    }
  },
  computed: {
    seconds () {
      return Qformat.pad(this.countDown, 2)
    }
  },
  beforeDestroy: function () {
    this.isStarted = false
    clearInterval(this.timer)
  }
}
</script>
