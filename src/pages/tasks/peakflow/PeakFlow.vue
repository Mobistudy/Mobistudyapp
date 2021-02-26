<template>
  <q-page padding>
    <div class="text-center text-h5 q-mt-lg">
      {{ $t('studies.tasks.peakflow.title') }}
    </div>
    <div class="text-center text-h6 q-mt-lg" v-if="isStarted">
      {{ pef }} L/min
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn
        @click="startMeasurement"
        v-if="!isStarted"
        color="secondary"
        :label="$t('common.start')"
        padding="lg"
      />
      <q-btn
        @click="completeTest"
        v-if="isStarted"
        color="purple"
        :label="$t('common.complete')"
        padding="lg"
      />
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
      pef: 0
    }
  },
  methods: {
    async startMeasurement () {
      if (!this.isStarted) {
        this.isStarted = true
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
