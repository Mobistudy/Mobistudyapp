<template>
  <q-page padding>
    <p class="mobitxt2 q-ma-lg">{{ $t('studies.tasks.OSpermission') }}</p>
    <div style="text-align:center">
      <object style="text-align: center;" data="tasks/permission.svg" type="image/svg+xml" ref="permsvg" width="70%"
        height="70%"></object>
    </div>

    <div class="mobitxt1 q-pa-md">{{ $q.platform.is.ios ? $t('tasks.dataQuery.OSpermissioniOS') :
      $t('tasks.dataQuery.OSpermissionAndroid') }}</div>

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
import i18nDateQuery from '@i18n/tasks/dataQuery'
import { mergeDeep } from '@shared/tools'

import db from '@shared/db'
import healthstore from '@shared/healthstore'

export default {
  name: 'DataQueryPermissionsPage',
  props: ['studyKey', 'taskId'],
  i18n: {
    messages: mergeDeep(i18nCommon, i18nStudies, i18nDateQuery)
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
      permtxt.textContent = this.$q.platform.is.ios ? 'HealthKit' : 'HealthConnect'
    }, false)
  },
  methods: {
    async cancelTask () {
      this.$router.go(-1)
    },
    async requestPermission () {
      this.permissionSpinner = true

      try {
        const studyDescr = await db.getStudyDescription(this.studyKey)
        const taskdescr = studyDescr.tasks.find(t => t.id === parseInt(this.taskId))
        await healthstore.requestAuthorization([
          { read: [taskdescr.dataType] }
        ])
        this.permissionSpinner = false

        this.$router.replace({ name: 'dataQuery', params: { studyKey: this.studyKey, taskId: this.taskId } })
      } catch (error) {
        // we didn't get permission
        this.permissionSpinner = false

        console.error('Cannot get OS authorisation', error)
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
