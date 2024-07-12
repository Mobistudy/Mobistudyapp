<template>
  <div>
    <q-list v-if="studyDescription.consent.extraItems">
      <q-item v-for="(extraItem, extraIndex) in studyDescription.consent.extraItems" :key="extraIndex">
        <q-item-section>
          <q-item-label class="q-my-xs mobitxt1">{{ extraItem.description[$i18n.locale] }}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-checkbox size="lg" v-model="value.extraItemsConsent[extraIndex].consented" />
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator inset />
    <q-list>
      <q-item v-for="(taskItem, taskIndex) in studyDescription.consent.taskItems" :key="taskIndex">
        <q-item-section>
          <q-item-label class="q-my-xs mobitxt1">{{ taskItem.description[$i18n.locale] }}
          </q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-checkbox size="lg" :value="value.taskItemsConsent[taskIndex].consented"
            @click="!value.taskItemsConsent[taskIndex].consented ? requestPermission(taskIndex) : rejectPermission(taskIndex)" />
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator />
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="q-my-xs mobitxt1">
            {{ $t('studies.consent.remindersConsent') }}
          </q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-checkbox size="lg" :value="value.reminders" @click="setReminders()" />
        </q-item-section>
      </q-item>
    </q-list>

    <div class="q-my-md row justify-evenly">
      <q-btn class="mobibtn" color="secondary" :label="$t('studies.consent.consentAll')" @click="selectAllToggles" />
    </div>

    <q-dialog v-model="permissionDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">{{ permissionMessage }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('common.cancel')" color="negative" v-close-popup />
          <q-btn :label="$t('common.next')" color="primary" v-close-popup @click="acceptOSWarning" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-inner-loading :showing="permissionSpinner">
      <div class="mobitxt2">{{ $t('studies.consent.OSPermissionGivenSeeking') }}</div>
      <q-spinner-dots size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script>
import { mergeDeep } from '@shared/tools'
import i18nCommon from '@i18n/common'
import i18nStudies from '@i18n/studies'

import notifications from '@shared/notifications'

export default {
  name: 'ConsentForm',
  i18n: {
    messages: mergeDeep(i18nCommon, i18nStudies)
  },
  props: [
    'studyDescription',
    'modelValue'
  ],
  data () {
    return {
      permissionMessage: '',
      permissionDialog: false,
      permissionSpinner: false
    }
  },
  computed: {
    participation: {
      get () {
        return this.modelValue
      },
      set (newVal) {
        this.$emit('update:modelValue', newVal)
      }
    }
  },
  methods: {
    async selectAllToggles () {
      // Select all extra items toggles
      this.participation.extraItemsConsent.forEach((item) => {
        item.consented = true
      })

      // Select all task items toggles and request permission
      for (let taskIndex = 0; taskIndex < this.participation.taskItemsConsent.length; taskIndex++) {
        const item = this.participation.taskItemsConsent[taskIndex]
        if (!item.consented) {
          await this.requestPermission(taskIndex)
        }
      }

      // Check reminders toggle if consent is given
      const remindersItem = this.participation.taskItemsConsent.find((item) => item.task === 'reminders')
      if (remindersItem && !remindersItem.consented) {
        await this.requestPermission('reminders')
      }

      // Update the reminders property based on the consent status
      this.participation.reminders = remindersItem ? remindersItem.consented : false
      this.setReminders()
    },

    async setReminders () {
      if (this.participation.reminders) {
        this.participation.reminders = false
      } else {
        const hasPermissionsAlready = await notifications.hasPermission()
        if (hasPermissionsAlready) {
          this.participation.reminders = true
        } else {
          try {
            this.participation.reminders = await notifications.requestPermission()
          } catch (error) {
            console.error('Cannot get authorisation for sending reminders', error)
            this.$q.notify({
              color: 'negative',
              message: this.$i18n.t('studies.consent.OSPermissionNotGiven') + ': ' + error.message,
              icon: 'report_problem'
            })
            this.participation.reminders = false
          }
        }
      }
    },

    async rejectPermission (taskIndex) {
      this.participation.taskItemsConsent[taskIndex].consented = false
    }
  }
}
</script>
