<template>
  <q-page padding>
    <div class="text-center text-h5 q-mt-lg">
      {{ $t('studies.tasks.peakflow.title') }}
    </div>
    <div class="text-center text-h6 q-mt-lg" v-if="isStarted">
      {{ pef[pef.length - 1] }} L/min
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn
        @click="startMeasurement"
        v-if="testAttempts <= maxTestAttempts"
        color="secondary"
        :label="$t('studies.tasks.peakflow.measure')"
        padding="lg"
      />
      <q-btn
        @click="completeTest"
        v-if="testAttempts > maxTestAttempts"
        color="purple"
        :label="$t('common.complete')"
        padding="lg"
      />
    </div>
    <div class="text-center text-h5 q-mt-lg" v-if="isStarted">
      {{ $t('studies.tasks.peakflow.todayResults') }}
      <q-item
        v-for="(reading, index) in pef"
        :data="reading"
        :key="'pef' + index"
      >
        <q-item-selection>
          {{index+1}}) {{ reading }} L/min
        </q-item-selection>
      </q-item>
    </div>

  </q-page>
</template>

<script>
import phone from 'modules/phone'
import audio from 'modules/audio'
import userinfo from 'modules/userinfo'
// import { format as Qformat } from 'quasar'

export default {
  name: 'PeakFlowPage',
  props: {
    studyKey: String,
    taskId: Number
  },
  components: {},
  data: function () {
    return {
      isStarted: false,
      isCompleted: false,
      testAttempts: 0,
      maxTestAttempts: 2,
      pef: []
    }
  },
  methods: {
    async startMeasurement () {
      if (this.testAttempts <= this.maxTestAttempts) {
        this.isStarted = true
        this.testAttempts++
        this.pef.push(Math.floor(Math.random() * 100))
      }
    },
    completeTest () {
      audio.textToSpeech.playVoice(this.$i18n.t('studies.tasks.peakflow.pef'))
      phone.pedometer.stopNotifications()
      this.completionTS = new Date()
      const studyKey = this.studyKey
      const taskId = parseInt(this.taskId)
      const userKey = userinfo.user._key
      let report = {
        userKey: userKey,
        studyKey: studyKey,
        taskId: taskId,
        createdTS: new Date(),
        startedTS: this.startedTS,
        completionTS: this.completionTS,
        pef: this.pef
      }

      this.$router.push({ name: 'peakflowSummary', params: { report: report } })
    }
  }
}
</script>
