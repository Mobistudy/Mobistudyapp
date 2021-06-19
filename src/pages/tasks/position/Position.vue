<template>
  <q-page padding>
    <q-inner-loading :showing="showConnecting">
      <div
        class="text-overline"
        color="dark-grey"
      >{{$t('studies.tasks.position.connecting')}}</div>
      <q-spinner-dots
        size="40px"
        color="primary"
      />
    </q-inner-loading>
    <p
      v-if="environment"
      class="text-subtitle2 text-center "
    >
    {{ $t('studies.tasks.position.approxLocation') }}: {{ environment.weather.location }}<br/>
    <img :src="environment.weather.icon"> <br/>
      {{ $t('studies.tasks.position.weather') }}: {{ environment.weather.description }} <br/>
      {{ $t('studies.tasks.position.temperature') }}: {{ environment.weather.temperature.toFixed(0) }} °C <br/>
      {{ $t('studies.tasks.position.humidity') }}: {{ environment.weather.humidity.toFixed(0) }} % <br/>
      {{ $t('studies.tasks.position.clouds') }}: {{ environment.weather.clouds }} % <br/>
      {{ $t('studies.tasks.position.wind') }}: {{ environment.weather.wind.speed }} m/s <br/>
      {{ $t('studies.tasks.position.airQuality') }} : {{ aqiLevel }}<br/>
      {{ $t('studies.tasks.position.allergens.riskOfGrass') }}: {{ environment.allergens.pollen.Risk.grass_pollen }} <br/>
      {{ $t('studies.tasks.position.allergens.riskOfTree') }}: {{ environment.allergens.pollen.Risk.tree_pollen }} <br/>
      {{ $t('studies.tasks.position.allergens.riskOfWeed') }}: {{ environment.allergens.pollen.Risk.weed_pollen }}
    </p>

    <div v-if="environment" class="row justify-around">
        <q-btn
          color="secondary"
          :loading="sending"
          :label="$t('common.discard')"
          @click="discard()"
        />
        <q-btn
          color="primary"
          :loading="sending"
          :label="$t('common.send')"
          @click="send()"
        />
      </div>
  </q-page>
</template>

<script>
import phone from 'modules/phone'
import userinfo from 'modules/userinfo'
import API from 'modules/API/API'
import DB from 'modules/db'

export default {
  name: 'PositionPage',
  props: {
    studyKey: String,
    taskId: Number
  },
  data: function () {
    return {
      position: undefined,
      environment: undefined,
      showConnecting: true,
      sending: false
    }
  },
  mounted: async function () {
    if (!await phone.geolocation.isAvailable()) {
      this.$q.notify({
        color: 'negative',
        message: 'No positioning available',
        icon: 'report_problem',
        timeout: 0, // will not disapper until dismissed
        actions: [
          { label: 'Dismiss', color: 'white', handler: () => { this.$router.push('/home') } }
        ]
      })
    } else {
      this.showConnecting = true
      this.position = await phone.geolocation.getCurrentPosition()
      try {
        this.environment = await API.getEnvironmentFromPosition(this.position.coords.latitude, this.position.coords.longitude)
        console.log(this.environment)
      } catch (err) {
        console.error(err)
        this.$q.notify({
          color: 'negative',
          message: this.$t('errors.connectionError') + ' ' + err.message,
          icon: 'report_problem',
          timeout: 0, // will not disapper until dismissed
          actions: [
            { label: 'Dismiss', color: 'white', handler: () => { this.$router.push('/home') } }
          ]
        })
      }
      this.showConnecting = false
    }
  },
  methods: {
    async send () {
      this.sending = true

      // send report
      const studyKey = this.studyKey
      const taskId = parseInt(this.taskId)
      const userKey = userinfo.user._key
      console.log(userinfo.user)
      let report = {
        userKey: userKey,
        studyKey: studyKey,
        taskId: taskId,
        createdTS: new Date(),
        position: this.position,
        environment: this.environment
      }

      // Save the data to server
      try {
        await API.sendPosition(report)
        await DB.setTaskCompletion(studyKey, taskId, new Date())
        this.$q.loading.hide()
        this.$router.push('/home')
      } catch (error) {
        this.$q.loading.hide()
        console.error(error)
        this.$q.notify({
          color: 'negative',
          message: this.$t('errors.connectionError') + ' ' + error.message,
          icon: 'report_problem'
        })
        this.sending = false
      }
    },
    async discard () {
      let studyKey = this.studyKey
      let taskId = Number(this.taskId)
      await DB.setTaskCompletion(studyKey, taskId, new Date())
      this.$router.push('/home')
    }
  },
  computed: {
    aqiLevel () {
      return this.$t('studies.tasks.position.aqiscale.l' + this.environment.pollution.aqi)
    }
  }
}
</script>
