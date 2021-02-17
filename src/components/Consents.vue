<template>
  <div>
    <q-list v-if="studyDescription.consent.extraItems">
        <q-item v-for="(extraItem, extraIndex) in studyDescription.consent.extraItems" :key="extraIndex" >
          <q-item-section>
            <q-item-label>{{extraItem.description[$i18n.locale]}}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-checkbox v-model="consentedExtraItems[extraIndex]" :disable="!extraItem.optional"/>
          </q-item-section>
        </q-item>
    </q-list>
    <q-separator inset />
      <q-list>
        <q-item v-for="(taskItem, taskIndex) in studyDescription.consent.taskItems" :key="taskIndex">
          <q-item-section >
            <q-item-label class="q-my-xs" >{{taskItem.description[$i18n.locale]}}
              <q-item-label caption class=" q-mt-xs text-secondary" v-if="taskType[taskIndex] !== 'form'">
                {{ $t('studies.consent.OSpermission') }}
              </q-item-label>
            </q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-checkbox :value="consentedTaskItems[taskIndex]"
              @click.native="!consentedTaskItems[taskIndex] ? requestPermission(taskIndex) : rejectPermission(taskIndex)"/>
          </q-item-section>
        </q-item>
      </q-list>
      <q-separator v-if="remindersPermissionNeeded" />
      <q-list v-if="remindersPermissionNeeded">
      <q-item>
        <q-item-section>
          <q-item-label class="q-my-xs">
            {{$t('studies.consent.remindersConsent')}}
            <q-item-label caption class="q-mt-xs text-secondary">
              {{$t('studies.consent.remindersOSPermission')}}
            </q-item-label>
          </q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-checkbox :value="remindersPermissionGiven"
          @click.native="requestNotificationsPermission(remindersPermissionGiven)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import healthStore from 'modules/healthstore'
import phone from 'modules/phone'
import PO60 from 'modules/po60/IPulseOxDevice'

export default {
  props: [
    'studyDescription',
    'consentedExtraItems',
    'consentedTaskItems',
    'taskType',
    'remindersPermissionNeeded',
    'remindersPermissionGiven'
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
        } else if (this.taskType[taskIndex] === 'miband3') {
          await PO60.requestPermission()
        } else if (this.taskType[taskIndex] === 'po60') {
          await PO60.requestPermission()
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
          message: this.$i18n.t('studies.consent.OSPermissionNotGiven') + ': ' + error,
          icon: 'report_problem'
        })
      }
    },
    async rejectPermission (taskIndex) {
      this.$set(this.consentedTaskItems, taskIndex, false)
    },
    async requestNotificationsPermission () {
      this.$emit('checkboxReminders', this.remindersPermissionGiven)
    }
  }
}
</script>
