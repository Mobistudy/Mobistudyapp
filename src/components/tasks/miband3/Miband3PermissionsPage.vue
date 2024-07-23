<template>
  <q-page padding>
    <p class="mobitxt2 q-ma-lg">{{ $t('studies.tasks.OSpermission') }}</p>
    <div style="text-align:center">
      <object style="text-align: center;" data="tasks/permission.svg" type="image/svg+xml" ref="permsvg" width="70%"
        height="70%"></object>
    </div>

    <div class="mobitxt1 q-pa-md">{{ $q.platform.is.ios ? $t('tasks.miband3.OSpermissioniOS') :
      $t('tasks.miband3.OSpermissionAndroid') }}</div>

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
import i18nMiband3 from '@i18n/tasks/miband3'
import { mergeDeep } from '@shared/tools'
import BLEDevice from '@shared/devices/bledevice'
//

export default {
  name: 'Miband3NohataPage',
  props: ['studyKey', 'taskId'],
  i18n: {
    messages: mergeDeep(i18nCommon, i18nStudies, i18nMiband3)
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
      permtxt.textContent = 'Bluetooth'
    }, false)
  },
  methods: {
    async cancelTask () {
      this.$router.go(-1)
    },
    async requestPermission () {
      this.permissionSpinner = true

      try {
        await BLEDevice.requestPermission()
        this.permissionSpinner = true

        this.$router.replace({ name: 'miband3Connect' })
      } catch (error) {
        // we didn't get permission
        this.permissionSpinner = false

        console.error('Cannot get OS authorisation for task', error)
        this.$q.notify({
          color: 'negative',
          message: this.$i18n.t('studies.consent.OSPermissionNotGiven') + ': ' + error,
          icon: 'report_problem'
        })
      }

      this.permissionDialog = false
    }
  }
}
</script>
