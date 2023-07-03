<template>
  <div>
    <button @click="selectAllToggles">Select All</button>
    <q-list v-if="studyDescription.consent.extraItems">
      <q-item
        v-for="(extraItem, extraIndex) in studyDescription.consent.extraItems"
        :key="extraIndex"
      >
        <q-item-section>
          <q-item-label class="q-my-xs mobitxt1">{{extraItem.description[$i18n.locale]}}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-checkbox
            size="lg"
            v-model="value.extraItemsConsent[extraIndex].consented"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator inset />
    <q-list>
      <q-item
        v-for="(taskItem, taskIndex) in studyDescription.consent.taskItems"
        :key="taskIndex"
      >
        <q-item-section>
          <q-item-label class="q-my-xs mobitxt1">{{taskItem.description[$i18n.locale]}}
          </q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-checkbox
            size="lg"
            :value="value.taskItemsConsent[taskIndex].consented"
            @click.native="!value.taskItemsConsent[taskIndex].consented ? requestPermission(taskIndex) : rejectPermission(taskIndex)"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator />
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="q-my-xs mobitxt1">
            {{$t('studies.consent.remindersConsent')}}
          </q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-checkbox
            size="lg"
            :value="value.reminders"
            @click.native="setReminders()"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog
      v-model="permissionDialog"
      persistent
    >
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">{{permissionMessage}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            :label="$t('common.cancel')"
            color="negative"
            v-close-popup
          />
          <q-btn
            :label="$t('common.next')"
            color="primary"
            v-close-popup
            @click.native="acceptOSWarning"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-inner-loading :showing="permissionSpinner">
      <div class="mobitxt2">{{ $t('studies.consent.OSPermissionGivenSeeking') }}</div>
      <q-spinner-dots
        size="50px"
        color="primary"
      />
    </q-inner-loading>
  </div>
</template>

<script>
import notifications from 'modules/notifications/notifications'
import healthStore from 'modules/healthstore'
import phone from 'modules/phone/phone'
import PO60 from 'modules/po60/IPulseOxDevice'
import peakflow from 'modules/peakflow/peakflow'

export default {
  props: [
    'studyDescription',
    'value'
  ],
  data () {
    return {
      permissionMessage: '',
      permissionDialog: false,
      permissionSpinner: false
    }
  },
  methods: {
    selectAllToggles () {
      // Select all extra items toggles
      this.value.extraItemsConsent.forEach(item => {
        item.consented = true
      })
      // Select all task items toggles
      this.value.taskItemsConsent.forEach(item => {
        item.consented = true
      })
      // Select reminders toggle
      this.value.reminders = true
    },
    async showOSPermissionWarning (taskType) {
      if (taskType === 'dataQuery') {
        if (this.$q.platform.is.ios) {
          this.permissionMessage = this.$t('studies.tasks.dataQuery.OSpermissioniOS')
        } else {
          this.permissionMessage = this.$t('studies.tasks.dataQuery.OSpermissionAndroid')
        }
      } else if (taskType === 'smwt') {
        if (this.$q.platform.is.ios) {
          this.permissionMessage = this.$t('studies.tasks.smwt.OSpermissioniOS')
        } else this.permissionMessage = this.$t('studies.tasks.smwt.OSpermissionAndroid')
      } else if (taskType === 'qcst') {
        if (this.$q.platform.is.ios) {
          this.permissionMessage = this.$t('studies.tasks.qcst.OSpermissioniOS')
        } else {
          this.permissionMessage = this.$t('studies.tasks.qcst.OSpermissionAndroid')
        }
      } else if (taskType === 'miband3') {
        if (this.$q.platform.is.ios) {
          this.permissionMessage = this.$t('studies.tasks.miband3.OSpermissioniOS')
        } else {
          this.permissionMessage = this.$t('studies.tasks.miband3.OSpermissionAndroid')
        }
      } else if (taskType === 'po60') {
        if (this.$q.platform.is.ios) {
          this.permissionMessage = this.$t('studies.tasks.po60.OSpermissioniOS')
        } else {
          this.permissionMessage = this.$t('studies.tasks.po60.OSpermissionAndroid')
        }
      } else if (taskType === 'position') {
        if (this.$q.platform.is.ios) {
          this.permissionMessage = this.$t('studies.tasks.position.OSpermissioniOS')
        } else {
          this.permissionMessage = this.$t('studies.tasks.position.OSpermissionAndroid')
        }
      } else if (taskType === 'peakFlow') {
        if (this.$q.platform.is.ios) {
          this.permissionMessage = this.$t('studies.tasks.peakflow.OSpermissioniOS')
        } else {
          this.permissionMessage = this.$t('studies.tasks.peakflow.OSpermissionAndroid')
        }
      } else if (taskType === 'tugt') {
        if (this.$q.platform.is.ios) {
          this.permissionMessage = this.$t('studies.tasks.tugt.OSpermissioniOS')
        } else {
          // permissions for motion and orientation are only really needed on iOS
          // see https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent

          return true
        }
      } else if (taskType === 'holdPhone') {
        if (this.$q.platform.is.ios) {
          this.permissionMessage = this.$t('studies.tasks.holdPhone.OSpermissioniOS')
        } else {
          // permissions for motion and orientation are only really needed on iOS
          // see https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent

          return true
        }
      } else if (taskType === 'vocalization') {
        if (this.$q.platform.is.ios) {
          this.permissionMessage = this.$t('studies.tasks.vocalization.OSpermissioniOS')
        } else {
          this.permissionMessage = this.$t('studies.tasks.vocalization.OSpermissionAndroid')
        }
      } else return true

      this.permissionDialog = true
      return new Promise((resolve, reject) => {
        this.acceptOSWarning = resolve
      })
    },
    acceptOSWarning () {
      // just a placehoder
    },
    async requestPermission (taskIndex) {
      if (this.value.taskItemsConsent[taskIndex].consented) {
        this.value.taskItemsConsent[taskIndex].consented = false
      } else {
        let taskType = this.studyDescription.tasks.find(t => t.id === this.value.taskItemsConsent[taskIndex].taskId).type
        try {
          await this.showOSPermissionWarning(taskType)
          this.permissionDialog = false
          this.permissionSpinner = true

          if (taskType === 'dataQuery') {
            let taskId = this.studyDescription.consent.taskItems[taskIndex].taskId
            let taskdescr = this.studyDescription.tasks.find(t => t.id === taskId)
            await healthStore.requestAuthorization([
              { read: [taskdescr.dataType] }
            ])
          } else if (taskType === 'smwt') {
            if (await phone.geolocation.isAvailable()) {
              await phone.geolocation.requestPermission()
            }
            if (await phone.pedometer.isAvailable()) {
              await phone.pedometer.requestPermission()
            }
          } else if (taskType === 'qcst') {
            if (await phone.pedometer.isAvailable()) {
              await phone.pedometer.requestPermission()
            }
          } else if (taskType === 'miband3') {
            await PO60.requestPermission()
          } else if (taskType === 'po60') {
            await PO60.requestPermission()
          } else if (taskType === 'position') {
            if (await phone.geolocation.isAvailable()) {
              await phone.geolocation.requestPermission()
            }
          } else if (taskType === 'peakFlow') {
            await peakflow.requestPermission()
          } else if (taskType === 'tugt') {
            // permissions for motion and orientation are only really needed on iOS
            // see https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent
            if (await phone.motion.isAvailable()) {
              await phone.motion.requestPermission()
            }
            if (await phone.orientation.isAvailable()) {
              await phone.orientation.requestPermission()
            }
          } else if (taskType === 'holdPhone') {
            // permissions for motion and orientation are only really needed on iOS
            // see https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent
            if (await phone.orientation.isAvailable()) {
              await phone.orientation.requestPermission()
            }
            if (await phone.motion.isAvailable()) {
              await phone.motion.requestPermission()
            }
          } else if (taskType === 'vocalization') {
            if (await phone.audioRecorder.isAvailable()) {
              await phone.audioRecorder.requestPermission()
            }
          }

          this.permissionSpinner = false
          // if we get to this point we have permission
          this.value.taskItemsConsent[taskIndex].consented = true

          // this.$q.notify({
          //   color: 'primary',
          //   message: this.$i18n.t('studies.consent.OSPermissionGiven'),
          //   icon: 'check'
          // })
        } catch (error) {
          // we didn't get permission
          console.error('Cannot get OS authorisation for task', error)
          this.$q.notify({
            color: 'negative',
            message: this.$i18n.t('studies.consent.OSPermissionNotGiven') + ': ' + error,
            icon: 'report_problem'
          })
        }
      }
    },

    async setReminders () {
      if (this.value.reminders) {
        this.value.reminders = false
      } else {
        let hasPermissionsAlready = await notifications.hasPermission()
        if (hasPermissionsAlready) {
          this.value.reminders = true
        } else {
          try {
            this.value.reminders = await notifications.requestPermission()
          } catch (error) {
            console.error('Cannot get authorisation for sending reminders', error)
            this.$q.notify({
              color: 'negative',
              message: this.$i18n.t('studies.consent.OSPermissionNotGiven') + ': ' + error.message,
              icon: 'report_problem'
            })
            this.value.reminders = false
          }
        }
      }
    },

    async rejectPermission (taskIndex) {
      this.value.taskItemsConsent[taskIndex].consented = false
    }
  }
}
</script>
