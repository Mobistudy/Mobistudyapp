<template>
  <q-page padding>
      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 600px">
          <q-card>
            <q-tabs
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="info" icon="info" label="Info" />
              <q-tab name="privacy" icon="lock" label="Privacy" />
              <q-tab v-if="studyParticipation.currentStatus == 'accepted'" name="consent" icon="done" label="Consent" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="info">
                <q-list>
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-h6 text-center">
                        {{studyDescription.generalities.title}}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label v-html="studyDescription.generalities.longDescription.replace(new RegExp('\n', 'g'), '<br>')" />
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-subtitle1">Principal investigators:</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-list v-for="(pi, index) in studyDescription.generalities.principalInvestigators" :key="index">
                  <q-item>
                    <q-item-section>
                      <q-item-label>Name:</q-item-label>
                      <q-item-label caption>{{pi.name}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label>Institution:</q-item-label>
                      <q-item-label caption>{{pi.institution}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label>Contact details:</q-item-label>
                      <q-item-label caption>{{pi.contact}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator class="q-mt-sm" v-if="index != studyDescription.generalities.principalInvestigators.length-1" />
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="privacy" v-html="studyDescription.consent.privacyPolicy.replace(new RegExp('\n', 'g'), '<br>')">
                {{studyDescription.consent.privacyPolicy}}
              </q-tab-panel>

              <q-tab-panel name="consent">
                <q-list>
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-subtitle1">You can opt-in or opt-out of these items whenever you want:</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-list v-if="studyDescription.consent.extraItems">
                  <q-item v-for="(extraItem, extraIndex) in studyDescription.consent.extraItems" :key="extraIndex">
                    <q-item-section>
                      <q-item-label>{{extraItem.description}}</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                      <q-checkbox v-model="consentedExtraItems[extraIndex]" :disabled="!extraItem.optional"/>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-list>
                  <q-item v-for="(taskItem, taskIndex) in studyDescription.consent.taskItems" :key="taskIndex">
                    <q-item-section>
                      <q-item-label>{{taskItem.description}}</q-item-label>
                      <div v-if="taskType[taskIndex] === 'dataQuery' && !permissionsGiven[taskIndex]">
                        <div class="q-mt-sm text-secondary">
                          This item requires the app to access some functionalities on the phone.
                        </div>
                        <q-btn label="Give permission to this app" :disabled="!consentedTaskItems[taskIndex]" @click="requestDQPermission(taskIndex)"></q-btn>
                      </div>
                    </q-item-section>
                    <q-item-section avatar>
                      <q-checkbox v-model="consentedTaskItems[taskIndex]"/>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-separator/>
                <q-list>
                  <q-item>
                    <q-item-section>
                      <q-item-label>I want to receive reminders about the tasks of this study</q-item-label>
                      <q-item-label caption>You need to allow the app to send reminders.</q-item-label>
                      <q-btn class="q-mt-lg" label="Allow reminders" :disabled="!reminders || remindersPermissionGiven" @click="requestNotificationsPermission()"></q-btn>
                    </q-item-section>
                    <q-item-section avatar>
                      <q-checkbox v-model="reminders"/>
                    </q-item-section>
                  </q-item>
                </q-list>
                <div class="q-my-md row justify-center">
                  <q-btn label="Update consent" color="primary" :disabled="!canUpdate" @click="updateConsent()"></q-btn>
                </div>
                <div class="q-my-md row justify-center">
                  <q-btn label="Withdraw from the study" color="negative" @click="withdraw()"></q-btn>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>
    <!-- <q-tabs animated inverted color="secondary" align="justify">
      <q-tab default name="info" slot="title" icon="info" label="Info" />
      <q-tab name="privacy" slot="title" icon="lock" label="Privacy" />
      <q-tab v-if="studyParticipation.currentStatus == 'accepted'" name="consent" slot="title" icon="done" label="Consent" />
    </q-tabs> -->
    <!-- <q-option-group
      v-model="panel"
      inline
      :options="[
        { label: 'Info', value: 'info' },
        { label: 'Alarms', value: 'alarms' },
        { label: 'Movies', value: 'movies' }
      ]"
    />
    <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
      <q-tab-panel v-model="info">
        <p class="q-title" style="text-align: center">
          {{studyDescription.generalities.title}}
        </p>
        <p v-html="studyDescription.generalities.longDescription.replace(new RegExp('\n', 'g'), '<br>')">
        </p>
        <p class="q-subheading">
          Principal investigators:
        </p>
        <div class="q-my-lg">
          <div class="q-my-sm" v-for="(pi, index) in studyDescription.generalities.principalInvestigators" :key="index">
            <div class="q-mb-sm row">
              <div class="col-4">
                Name:
              </div>
              <div class="col">
                {{pi.name}}
              </div>
            </div>
            <div class="q-mb-sm row">
              <div class="col-4">
                Institution:
              </div>
              <div class="col">
                {{pi.institution}}
              </div>
            </div>
            <div class="q-mb-sm row">
              <div class="col-4">
                Contact details:
              </div>
              <div class="col">
                {{pi.contact}}
              </div>
            </div>
            <q-card-separator v-if="index != studyDescription.generalities.principalInvestigators.length-1" />
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="privacy" v-html="studyDescription.consent.privacyPolicy.replace(new RegExp('\n', 'g'), '<br>')">{{studyDescription.consent.privacyPolicy}}</q-tab-panel>
      <q-tab-panel v-if="studyParticipation.currentStatus == 'accepted'" name="consent">
        <p class="q-subheading">
          You can opt-in or opt-out of these items whenever you want:
        </p>
        <q-list>
          <div v-if="studyDescription.consent.extraItems">
            <q-item v-for="(extraItem, extraIndex) in studyDescription.consent.extraItems" :key="extraIndex">
              <q-item-main :label="extraItem.description" />
              <q-item-side>
                <q-checkbox v-model="consentedExtraItems[extraIndex]" :disabled="!extraItem.optional"/>
              </q-item-side>
            </q-item>
          </div>
          <q-item v-for="(taskItem, taskIndex) in studyDescription.consent.taskItems" :key="taskIndex">
            <q-item-main :label="taskItem.description">
              <div v-if="taskType[taskIndex] === 'dataQuery' && !permissionsGiven[taskIndex]">
                <div class="q-mt-sm text-secondary">
                  This item requires the app to access some functionalities on the phone.
                </div>
                <q-btn label="Give permission to this app" :disabled="!consentedTaskItems[taskIndex]" @click="requestDQPermission(taskIndex)"></q-btn>
              </div>
            </q-item-main>
            <q-item-side>
              <q-checkbox v-model="consentedTaskItems[taskIndex]"/>
            </q-item-side>
          </q-item>
          <q-item-separator />
          <q-item>
            <q-item-main label="I want to receive reminders about the tasks of this study">
              <div v-if="remindersPermissionNeeded">
                <div class="q-mt-sm text-secondary">
                  You need to allow the app to send reminders.
                </div>
                <q-btn label="Allow reminders" :disabled="!reminders || remindersPermissionGiven" @click="requestNotificationsPermission()"></q-btn>
              </div>
            </q-item-main>
            <q-item-side>
              <q-checkbox v-model="reminders"/>
            </q-item-side>
          </q-item>
        </q-list>
        <div class="q-my-md row justify-center">
          <q-btn label="Update consent" color="primary" :disabled="!canUpdate" @click="updateConsent()"></q-btn>
        </div>
        <div class="q-my-md row justify-center">
          <q-btn label="Withdraw from the study" color="negative" @click="withdraw()"></q-btn>
        </div>
      </q-tab-panel>
    </q-tab-panels>v -->
  </q-page>
</template>

<script>
import userinfo from '../../modules/userinfo'
import DB from '../../modules/db'
import API from '../../modules/API'
import healthStore from '../../modules/healthstore'
import notifications from '../../modules/notifications'

export default {
  name: 'StudyConfigPage',
  props: ['studyDescription'],
  data () {
    return {
      consentedExtraItems: [],
      consentedTaskItems: [],
      permissionsGiven: [],
      studyParticipation: {},
      reminders: false,
      remindersPermissionNeeded: true,
      remindersPermissionGiven: false,
      tab: 'info'
    }
  },
  async created () {
    this.studyParticipation = await DB.getStudyParticipation(this.studyDescription._key)
    this.reminders = this.studyParticipation.reminders
    if (this.reminders) {
      this.remindersPermissionNeeded = false
      this.remindersPermissionGiven = true
    } else {
      let hasPermissionsAlready = await notifications.hasPermission()
      this.remindersPermissionNeeded = !hasPermissionsAlready
      this.remindersPermissionGiven = hasPermissionsAlready
    }
    for (let i = 0; i < this.studyDescription.consent.extraItems.length; i++) {
      this.consentedExtraItems.push(this.studyParticipation.extraItemsConsent[i].consented)
    }
    for (let i = 0; i < this.studyDescription.consent.taskItems.length; i++) {
      this.consentedTaskItems.push(this.studyParticipation.taskItemsConsent[i].consented)
      this.permissionsGiven.push(this.studyParticipation.taskItemsConsent[i].consented)
    }
  },
  computed: {
    taskType () {
      return this.studyDescription.consent.taskItems.map(ti => {
        return this.studyDescription.tasks.find(t => t.id === ti.taskId).type
      })
    },
    canUpdate () {
      if (this.reminders !== this.studyParticipation.reminders) {
        if (this.reminders && !this.remindersPermissionGiven) return false
        return true
      }
      if (!this.studyParticipation || !this.studyParticipation.extraItemsConsent) return false
      for (let i = 0; i < this.studyParticipation.extraItemsConsent.length; i++) {
        if (this.consentedExtraItems[i] !== this.studyParticipation.extraItemsConsent[i].consented) {
          return true
        }
      }
      for (let i = 0; i < this.studyParticipation.taskItemsConsent.length; i++) {
        if (this.consentedTaskItems[i] !== this.studyParticipation.taskItemsConsent[i].consented && this.permissionsGiven[i]) {
          return true
        }
      }
      return false
    }
  },
  methods: {
    async updateConsent () {
      this.studyParticipation.reminders = this.reminders
      for (let i = 0; i < this.studyDescription.consent.extraItems.length; i++) {
        this.studyParticipation.extraItemsConsent[i].consented = this.consentedExtraItems[i]
      }
      for (let i = 0; i < this.studyDescription.consent.taskItems.length; i++) {
        this.studyParticipation.taskItemsConsent[i].consented = this.consentedTaskItems[i]
      }
      // call the API
      await API.updateStudyStatus(userinfo.user._key, this.studyParticipation.studyKey, this.studyParticipation)
      await DB.setStudyParticipation(this.studyParticipation)
      this.$q.notify({
        color: 'positive',
        message: 'Consent updated',
        icon: 'check'
      })
    },
    async requestDQPermission (taskIndex) {
      let taskId = this.studyDescription.consent.taskItems[taskIndex].taskId
      let taskdescr = this.studyDescription.tasks.find(t => t.id === taskId)
      if (taskdescr && taskdescr.dataType) {
        try {
          await healthStore.requestAuthorization([taskdescr.dataType])
          this.$set(this.permissionsGiven, taskIndex, true)
          this.$q.notify({
            color: 'positive',
            message: 'Permission given',
            icon: 'check'
          })
        } catch (error) {
          console.error('Cannot get authorisation for health', error)
          this.$q.notify({
            color: 'negative',
            message: 'Cannot be authorised: ' + error.message,
            icon: 'report_problem'
          })
        }
      }
    },
    async requestNotificationsPermission () {
      try {
        this.remindersPermissionGiven = await notifications.requestPermission()
        this.$q.notify({
          color: 'positive',
          message: 'Permission given',
          icon: 'check'
        })
      } catch (error) {
        console.error('Cannot get authorisation for sending reminders', error)
        this.$q.notify({
          color: 'negative',
          message: 'Cannot be authorised: ' + error.message,
          icon: 'report_problem'
        })
      }
    },
    async withdraw () {
      try {
        let withdrawalReason = await this.$q.dialog({
          title: 'Withdraw',
          message: 'Are you sure you want to withdraw from this study? If yes, please state why',
          color: 'negative',
          prompt: {
            model: '',
            type: 'text'
          },
          ok: 'Withdraw',
          cancel: 'Cancel'
        })
        // set the study as withdrawn
        this.studyParticipation.currentStatus = 'withdrawn'
        this.studyParticipation.withdrawalTS = new Date()
        this.studyParticipation.withdrawalReason = withdrawalReason
        try {
          await API.updateStudyStatus(userinfo.user._key, this.studyParticipation.studyKey, this.studyParticipation)
          delete this.studyParticipation.extraItemsConsent
          delete this.studyParticipation.taskItemsConsent
          await DB.setStudyParticipation(this.studyParticipation)
          this.$router.push({ name: 'studies' })
        } catch (error) {
          console.error('Cannot connect to server', error)
          this.$q.notify({
            color: 'negative',
            message: 'Cannot discard this study: ' + error.message,
            icon: 'report_problem'
          })
        }
      } catch (e) {
        // do nothing
      }
    }
  }
}
</script>

<style>
</style>
