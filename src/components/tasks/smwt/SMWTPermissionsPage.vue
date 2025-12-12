<template>
  <q-page padding>
    <p class="mobitxt2 q-ma-lg">{{ $t('studies.tasks.OSpermission') }}</p>
    <div style="text-align:center">
      <object style="text-align: center;" data="tasks/permission.svg" type="image/svg+xml" ref="permsvg" width="70%"
        height="70%"></object>
    </div>

    <div class="mobitxt1 q-pa-md">{{ $q.platform.is.ios ? $t('tasks.smwt.OSpermissioniOS') :
      $t('tasks.smwt.OSpermissionAndroid') }}</div>

    <div class="row fit justify-around q-mt-lg">
      <q-btn class="mobibtn" :label="$t('common.cancel')" color="secondary" @click="$router.go(-1)" />

      <q-btn class="mobibtn" :label="$t('studies.tasks.giveOSPermission')" color="primary" type="submit"
        @click="requestPermission" />
    </div>

    <q-inner-loading :showing="permissionSpinner">
      <div class="mobitxt2">{{ $t('studies.tasks.OSPermissionGivenSeeking') }}</div>
      <q-spinner-dots size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import i18nCommon from '@i18n/common'
import i18nStudies from '@i18n/studies'
import i18nSMWT from '@i18n/tasks/smwt'
import { mergeDeep } from '@shared/tools'
import phone from '@shared/phone'

export default {
  name: 'SmwtPermissionsPage',
  props: ['studyKey', 'taskId'],
  i18n: {
    messages: mergeDeep(i18nCommon, i18nStudies, i18nSMWT)
  },
  data () {
    return {
      permissionSpinner: false
    }
  },
  mounted () {
    const svgimg = this.$refs.permsvg

    svgimg.addEventListener('load', () => {
      // get the inner DOM of alpha.svg
      const svgDoc = svgimg.contentDocument
      // get the inner element by id
      const permtxt = svgDoc.getElementById('permissionDevice')
      permtxt.textContent = 'Geolocation'
    }, false)
  },
  methods: {
    async cancelTask () {
      this.$router.go(-1)
    },
    async requestPermission () {
      this.permissionSpinner = true

      try {
        if (await phone.geolocation.isAvailable()) {
          await phone.geolocation.requestPermission()
        }
        if (await phone.motion.isAvailable()) {
          await phone.motion.requestPermission()
        }
        if (await phone.orientation.isAvailable()) {
          await phone.orientation.requestPermission()
        }
        if (await phone.pedometer.isAvailable()) {
          if (phone.device.manufacturer === 'Apple' && phone.device.model === 'iPhone18,1') {
            // iPhone 17 pro has a bug with pedometer permission request that causes a crash
            console.warn('Skipping pedometer permission request on iPhone 17 Pro due to OS bug')
          } else {
            await phone.pedometer.requestPermission()
          }
        }

        this.permissionSpinner = false

        this.$router.replace({ name: 'smwt', params: { studyKey: this.studyKey, taskId: this.taskId } })
      } catch (error) {
        // we didn't get permission
        this.permissionSpinner = false

        console.error('Cannot get OS authorisation for task', error)
        this.$q.notify({
          color: 'negative',
          message: this.$i18n.t('studies.tasks.OSPermissionNotGiven') + ': ' + error,
          icon: 'report_problem'
        })
      }
    }
  }
}
</script>
