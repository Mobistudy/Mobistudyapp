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
      v-on:transition="handleSlide($event)"
      >
        <q-carousel-slide
          v-for="slide in slides"
          :key="slide.id"
          :name="slide.id"
          class="column no-wrap flex-center"
        >
          <q-icon v-if="showIcon" :name="slide.icon" color="primary"/>
          <q-img v-if="showImage" :src="slide.img" draggable="false"/>
          <div class="q-ma-md">{{ slide.text }}</div>
        </q-carousel-slide>
      </q-carousel>
      <q-btn @click="handleFinish" v-if="showFinish" flat class="fixed-bottom-right">Finish</q-btn>
  </div>
</template>

<style lang="scss" scoped>
  .carousel-resize {
    height: calc(100vh - 75px);
  }
</style>
<script>
export default {
  name: 'Miband3ConnectPage',
  data () {
    return {
      slide: 0,
      slides: [
        {
          id: 0,
          text: 'Enable the bluetooth on your device and click the checkmark to continue.',
          img: 'https://cdn.quasar.dev/img/mountains.jpg',
          icon: 'watch'
        },
        {
          id: 1,
          text: 'Hello1',
          img: 'https://cdn.quasar.dev/img/mountains.jpg',
          icon: 'style'
        },
        {
          id: 2,
          text: 'Hello <3 <3 <3',
          img: 'https://cdn.quasar.dev/img/mountains.jpg',
          icon: 'style'
        }
      ],
      showImage: true,
      showIcon: false,
      showFinish: false
    }
  },
  methods: {
    handleSlide (currentSlideIndex) {
      if (currentSlideIndex === this.slides.length - 1) { // At last index of slides
        // Show finish button
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
