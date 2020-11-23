<template>
  <div class="q-pa-md">
    <q-carousel
      v-model="slide"
      ref="carousel"
      transition-prev="slide-right"
      transition-next="slide-left"
      class="carousel-resize"
      animated
      navigation
      swipeable
      control-color="primary"
      @transition="handleSlide()"
    >
      <q-carousel-slide name = "first"
        class="column no-wrap flex-center"
      >
        <div class="q-ma-md">After viewing these slides this app will try to connect to the nearest Miband3 device. Your bluetooth needs to be turned on.</div>
      </q-carousel-slide>

      <q-carousel-slide name = "second"
        class="column no-wrap flex-center"
      >
        <div class="q-ma-md">If its your first time connecting to your miband device, please tap on the device when the bracelet vibrates.</div>
      </q-carousel-slide>

      <q-carousel-slide name = "third"
        class="column no-wrap flex-center"
      >
        <div class="q-ma-md">Once the connection is successful, the relevant data from your miband device will be downloaded automatically.
           When the download is finished you will be presented with some illustrations of the data downloaded. Click send to send the data to the
           researchers or reject to stop entire the task.</div>
      </q-carousel-slide>

    </q-carousel>
    <q-btn
      @click="handleFinish"
      v-if="showFinish"
      flat
      class="fixed-bottom-right"
    >Connect</q-btn>
  </div>
</template>

<!-- use this class to make the carousel height take the whole screen
<style lang="scss" scoped>
.carousel-resize {
  height: calc(100vh - 75px);
}
</style>
-->

<script>
export default {
  name: 'Miband3ConnectPage',
  props: {
    icon: String,
    studyKey: String,
    taskId: Number
  },
  data () {
    return {
      slide: 'first',
      showFinish: false
    }
  },
  methods: {
    handleSlide () {
      console.log(this.slide)
      if (this.slide === 'third') {
        this.showFinish = true
      } else {
        this.showFinish = false
      }
    },
    handleFinish () {
      this.$router.push({ name: 'miband3Connect', params: { icon: this.icon, studyKey: this.studyKey, taskId: this.taskId } })
    }
  }
}
</script>
