<template>
  <div class="q-pa-md">
    <div class="text-h5 text-center">{{ $t('studies.tasks.miband3.title') }}</div>

    <q-carousel
      v-model="slide"
      ref="carousel"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      arrows
      swipeable
      control-color="primary"
      @transition="handleSlide()"
    >
      <q-carousel-slide
        name="first"
        class="flex flex-center"
      >
        <div class="q-ma-md">{{ $t('studies.tasks.miband3.intro1') }}</div>
      </q-carousel-slide>

      <q-carousel-slide
        name="second"
        class="flex flex-center"
      >
        <div class="q-ma-md">{{ $t('studies.tasks.miband3.intro2') }}</div>
      </q-carousel-slide>

      <q-carousel-slide
        name="third"
        class="flex flex-center"
      >
        <div class="q-ma-md">{{ $t('studies.tasks.miband3.intro2') }}</div>
      </q-carousel-slide>

    </q-carousel>
    <q-btn
      @click="handleFinish"
      v-if="showFinish"
      flat
      class="fixed-bottom-right"
    >{{ $t('studies.tasks.miband3.connect') }}</q-btn>
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
  name: 'Miband3IntroPage',
  props: {
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
      if (this.slide === 'third') {
        this.showFinish = true
      } else {
        this.showFinish = false
      }
    },
    handleFinish () {
      this.$router.push({ name: 'miband3Connect', params: { studyKey: this.studyKey, taskId: this.taskId } })
    }
  }
}
</script>
