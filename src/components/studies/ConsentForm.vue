<template>
  <div>
    <q-list v-if="studyDescription.consent.extraItems">
      <q-item v-for="(extraItem, extraIndex) in studyDescription.consent.extraItems" :key="extraIndex">
        <q-item-section>
          <q-item-label class="q-my-xs mobitxt1">{{ extraItem.description[$i18n.locale] }}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-checkbox size="lg" v-model="participation.extraItemsConsent[extraIndex].consented" />
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
          <q-checkbox size="lg" v-model="participation.taskItemsConsent[taskIndex].consented" />
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
          <q-checkbox size="lg" :model-value="participation.reminders" @update:model-value="setReminders()" />
        </q-item-section>
      </q-item>
    </q-list>

    <div class="q-my-md row justify-evenly">
      <q-btn class="mobibtn" color="secondary" :label="$t('studies.consent.consentAll')" @click="selectAllToggles" />
    </div>

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
      this.participation.extraItemsConsent.forEach((item) => {
        item.consented = true
      })

      this.participation.taskItemsConsent.forEach((item) => {
        item.consented = true
      })

      if (!this.participation.reminders) {
        await this.setReminders()
      }

      this.$emit('update:modelValue', this.participation)
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
      this.$emit('update:modelValue', this.participation)
    }
  }
}
</script>
