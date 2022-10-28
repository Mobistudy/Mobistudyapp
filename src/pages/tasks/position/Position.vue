<template>
  <q-page padding>
    <q-inner-loading :showing="showConnecting">
      <div
        class="mobitxt2"
        color="dark-grey"
      >{{$t('studies.tasks.position.connecting')}}</div>
      <q-spinner-dots
        size="40px"
        color="primary"
      />
    </q-inner-loading>
    <div
      v-if="environment"
      class="mobitxt1 text-center q-ma-lg"
    >
      <div
        class="mobitxt1 q-my-lg"
        v-if="environment.weather && environment.weather.location"
      > {{ $t('studies.tasks.position.approxLocation') }}: {{ environment.weather.location }}</div>

      <table class="summaryTable q-my-lg">
        <tr v-if="environment.weather && environment.weather.icon">
          <td>{{ $t('studies.tasks.position.weather') }}</td>
          <td><img :src="environment.weather.icon"></td>
        </tr>
        <tr v-if="environment.weather && environment.weather.temperature">
          <td>{{ $t('studies.tasks.position.temperature') }}</td>
          <td>{{ environment.weather.temperature.toFixed(0) }} °C</td>
        </tr>
        <tr v-if="environment.weather && environment.weather.humidity">
          <td>{{ $t('studies.tasks.position.humidity') }}</td>
          <td>{{ environment.weather.humidity.toFixed(0) }} %</td>
        </tr>
        <tr v-if="environment.weather && environment.weather.clouds">
          <td>{{ $t('studies.tasks.position.clouds') }}</td>
          <td>{{ environment.weather.clouds }}</td>
        </tr>
        <tr v-if="environment.weather && environment.weather.wind && environment.weather.speed">
          <td>{{ $t('studies.tasks.position.wind') }}</td>
          <td>{{ environment.weather.wind.speed }} m/s</td>
        </tr>
        <tr v-if="aqiLevel">
          <td>{{ $t('studies.tasks.position.airQuality') }} </td>
          <td>{{ aqiLevel }}</td>
        </tr>
        <tr v-if="environment.allergens && environment.allergens.pollen && environment.allergens.pollen.Risk && environment.allergens.pollen.Risk.grass_pollen">
          <td>{{ $t('studies.tasks.position.allergens.riskOfGrass') }} </td>
          <td>{{ environment.allergens.pollen.Risk.grass_pollen }}</td>
        </tr>
        <tr v-if="environment.allergens && environment.allergens.pollen && environment.allergens.pollen.Risk && environment.allergens.pollen.Risk.tree_pollen">
          <td>{{ $t('studies.tasks.position.allergens.riskOfTree') }} </td>
          <td>{{ environment.allergens.pollen.Risk.tree_pollen }}</td>
        </tr>
        <tr v-if="environment.allergens && environment.allergens.pollen && environment.allergens.pollen.Risk && environment.allergens.pollen.Risk.weed_pollen">
          <td>{{ $t('studies.tasks.position.allergens.riskOfWeed') }} </td>
          <td>{{ environment.allergens.pollen.Risk.weed_pollen }}</td>
        </tr>
      </table>
    </div>

    <div
      v-if="environment"
      class="row justify-around q-mt-lg"
    >
      <q-btn
        class="mobibtn"
        color="negative"
        :loading="sending"
        :label="$t('common.discard')"
        @click="discard()"
      />
      <q-btn
        class="mobibtn"
        color="primary"
        :loading="sending"
        :label="$t('common.send')"
        @click="send()"
      />
    </div>
  </q-page>
</template>

<script>
import phone from 'modules/phone/phone'
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
      sending: false,
      report: {
        userKey: userinfo.user._key,
        participantKey: userinfo.user.participantKey,
        studyKey: this.studyKey,
        taskId: parseInt(this.taskId),
        taskType: 'position',
        createdTS: new Date(),
        phone: phone.device,
        summary: {
          startedTS: new Date(),
          completedTS: undefined,
          location: undefined
        },
        data: undefined
      }
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

        this.report.summary.completedTS = new Date()
        this.report.summary.location = this.environment.weather.location
        this.report.summary.weather = this.environment.weather.description
        this.report.summary.temperature = this.environment.weather.temperature
        this.report.summary.aqi = this.environment.pollution.aqi

        this.report.data = this.environment
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
    async saveAndLeave () {
      try {
        console.log(this.report)
        await API.sendTasksResults(this.report)
        await DB.setTaskCompletion(
          this.report.studyKey,
          this.report.taskId,
          new Date()
        )
        this.$router.push({ name: 'home' })
      } catch (error) {
        this.sending = false
        console.error(error)
        this.$q.notify({
          color: 'negative',
          message: this.$t('errors.connectionError') + ' ' + error.message,
          icon: 'report_problem'
        })
      }
    },

    async send () {
      this.sending = true

      this.report.discarded = false

      return this.saveAndLeave()
    },

    async discard () {
      this.sending = true

      // delete data and set flag
      this.report.discarded = true
      delete this.report.summary
      delete this.report.data

      return this.saveAndLeave()
    }
  },
  computed: {
    aqiLevel () {
      if (this.environment.pollution && this.environment.pollution.aqi) return this.$t('studies.tasks.position.aqiscale.l' + this.environment.pollution.aqi)
      else return undefined
    }
  }
}
</script>
