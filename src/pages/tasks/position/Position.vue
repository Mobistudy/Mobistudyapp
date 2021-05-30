<template>
  <q-page padding>
    <!-- <div
      ref="map"
      style="width: 100%; height: 50vh;"
      class="row justify-center items-center"
    >
    </div> -->
    <div
      v-show="!position"
      class="text-subtitle1 text-center "
    >{{ $t('studies.tasks.position.signalCheck') }}</div>
    <div
      v-show="position && (!weather || !pollution || !pollen)"
      class="text-subtitle1 text-center "
    >{{ $t('studies.tasks.position.apiCalling') }}</div>
    <div
      v-show="weather"
      class="text-subtitle1 text-center "
    >{{ $t('studies.tasks.position.approxLocation') }}{{ weather.location }}
    </div>
    <div
      v-show="weather"
      class="text-subtitle2 text-center ">
      <img :src="weather.icon"> <br/>
      {{ $t('studies.tasks.position.weather') }}{{ weather.description }} <br/>
      {{ $t('studies.tasks.position.temperature') }}{{ weather.temperature }} °C <br/>
      {{ $t('studies.tasks.position.humidity') }}{{ weather.humidity }}% <br/>
      {{ $t('studies.tasks.position.clouds') }}{{ weather.clouds }}% <br/>
      {{ $t('studies.tasks.position.wind') }}{{ weather.wind }}m/s <br/>
    </div>
    <div
      v-show="pollution"
      class="text-subtitle2 text-center ">
      <br/>
      {{ $t('studies.tasks.position.airQuality') }}
      {{ pollution.aqi==1 ? $t('studies.tasks.position.aqiscale.l1') : '' }}
      {{ pollution.aqi==2 ? $t('studies.tasks.position.aqiscale.l2') : '' }}
      {{ pollution.aqi==3 ? $t('studies.tasks.position.aqiscale.l3') : '' }}
      {{ pollution.aqi==4 ? $t('studies.tasks.position.aqiscale.l4') : '' }}
      {{ pollution.aqi==5 ? $t('studies.tasks.position.aqiscale.l5') : '' }}
    </div>
    <div
      v-show="pollen"
      class="text-subtitle2 text-center ">
      Grass: {{ pollen.risk.grass_pollen }} <br/>
      Tree: {{ pollen.risk.tree_pollen }} <br/>
      Weed: {{ pollen.risk.weed_pollen }} <br/>
    </div>

    <div class="row justify-around">
        <q-btn
          color="secondary"
          :loading="loading"
          :label="$t('common.discard')"
          @click="discard()"
        />
        <q-btn
          color="primary"
          :loading="loading"
          :label="$t('common.send')"
          @click="send()"
        />
      </div>
  </q-page>
</template>

<style scoped>
.text-subtitle1 {
  line-height: 4.25;
}
</style>

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
      environment: undefined
    }
  },
  mounted: async function () {
    if (!await phone.geolocation.isAvailable()) {
      this.$q.notify({
        color: 'negative',
        message: 'No positioning available',
        icon: 'report_problem',
        onDismiss () {
          this.$router.push('/home')
        }
      })
    } else {
      this.$q.loading.show()
      this.position = await phone.geolocation.getCurrentPosition()
      try {
        this.environment = API.getEnvironmentFromPosition(this.position.coords.latitude, this.position.coords.longitude)
      } catch (err) {

      }
      this.$q.loading.hide()
    }
  },
  methods: {
    async send () {
      this.$q.loading.show()

      // send report
      const studyKey = this.studyKey
      const taskId = parseInt(this.taskId)
      const userKey = userinfo.user._key
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
          icon: 'report_problem',
          onDismiss () {
            this.$router.push('/home')
          }
        })
      }
    },
    async discard () {
      let studyKey = this.studyKey
      let taskId = Number(this.taskId)
      await DB.setTaskCompletion(studyKey, taskId, new Date())
      this.$router.push('/home')
    }
  }
}
</script>
