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
        <div class="q-ma-md">First</div>
      </q-carousel-slide>

      <q-carousel-slide name = "second"
        class="column no-wrap flex-center"
      >
        <div class="q-ma-md">Second</div>
      </q-carousel-slide>

      <q-carousel-slide name = "third"
        class="column no-wrap flex-center"
      >
        <div class="q-ma-md">Third</div>
      </q-carousel-slide>

    </q-carousel>
    <q-btn
      @click="handleFinish"
      v-if="showFinish"
      flat
      class="fixed-bottom-right"
    >Finish</q-btn>
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
      this.$router.push({ name: 'miband3Connect' })
    }
  }
}
</script>
