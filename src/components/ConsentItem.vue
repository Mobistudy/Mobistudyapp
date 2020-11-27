<template>
<q-item>
    <q-item-section >
    <q-item-label class="q-my-md">{{taskItem.description[$i18n.locale]}}</q-item-label>
        <q-item-label v-if="taskType[taskIndex] !== 'form' && !consentedTaskItems[taskIndex]">
        <div class="q-mt-sm text-secondary">
            {{ $t('studies.consent.OSpermission') }}
            {{ $t('studies.consent.giveOSPermission') }}
        </div>
        </q-item-label>
    </q-item-section>
    <q-item-section avatar>
        <q-checkbox :value="consentedTaskItems[taskIndex]"
        @click.native="!consentedTaskItems[taskIndex] ? requestPermission(taskIndex) : rejectPermission(taskIndex)"/>
    </q-item-section>
</q-item>
</template>

<script>
import healthStore from 'modules/healthstore'
import phone from 'modules/phone'

export default {
  props: [
    'taskItem',
    'taskType',
    'taskIndex',
    'consentedTaskItems',
    'studyDescription'
  ],
  methods: {
    async requestPermission (taskIndex) {
      try {
        if (this.taskType[taskIndex] === 'dataQuery') {
          let taskId = this.studyDescription.consent.taskItems[taskIndex].taskId
          let taskdescr = this.studyDescription.tasks.find(t => t.id === taskId)
          await healthStore.requestAuthorization([
            { read: [taskdescr.dataType] }
          ])
        } else if (this.taskType[taskIndex] === 'smwt') {
          if (await phone.geolocation.isAvailable()) {
            await phone.geolocation.requestPermission()
          }
          if (await phone.pedometer.isAvailable()) {
            await phone.pedometer.requestPermission()
          }
        } else if (this.taskType[taskIndex] === 'qcst') {
          if (await phone.pedometer.isAvailable()) {
            await phone.pedometer.requestPermission()
          }
        }
        // if we get to this point we have permission
        this.$set(this.consentedTaskItems, taskIndex, true)

        this.$q.notify({
          color: 'positive',
          message: this.$i18n.t('studies.consent.OSPermissionGiven'),
          icon: 'check'
        })
      } catch (error) {
        // we didn't get permission
        console.error('Cannot get OS authorisation for task', error)
        this.$q.notify({
          color: 'negative',
          message: this.$i18n.t('studies.consent.OSPermissionNotGiven') + ': ' + error.message,
          icon: 'report_problem'
        })
      }
    },
    async rejectPermission (taskIndex) {
      this.$set(this.consentedTaskItems, taskIndex, false)
    }
  }
}
</script>
