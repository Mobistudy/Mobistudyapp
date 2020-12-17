<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-center">
      {{ title }}
    </div>

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
      <q-carousel-slide name="initialIntro">
        <slot name="initialIntro">
        </slot>
      </q-carousel-slide>

      <q-carousel-slide name="prerequisitesIntro">
        <slot name="prerequisitesIntro">
        </slot>
      </q-carousel-slide>

      <q-carousel-slide
        v-for="(prerequisite, idx) in prerequisites"
        :name="'prerequisite-' + idx"
        :key="idx"
      >
        <slot
          :name="'prerequisite-' + idx"
          :prerequisite="prerequisite"
        >
          {{prerequisite.p}}
        </slot>
      </q-carousel-slide>

      <q-carousel-slide name="instructionsIntro">
        <slot name="instructionsIntro">

        </slot>
      </q-carousel-slide>

      <q-carousel-slide
        v-for="(instruction, idx) in instructions"
        :name="'instruction-' + idx"
        :key="idx"
      >
        <slot
          :name="'instruction-' + idx"
          :instruction="instruction"
        >
          {{instruction.i}}
        </slot>
      </q-carousel-slide>
    </q-carousel>
    <slot
      v-if="showFinishButton"
      name="finishButton"
    ></slot>
  </q-page>
</template>

<script>
export default {
  props: {
    title: String,
    instructions: Array,
    prerequisites: Array
  },
  data () {
    return {
      slide: 'initialIntro',
      showFinishButton: true
    }
  },
  methods: {
    handleSlide () {
      console.log(this.slide)
    }
  },
  created () {

  }
}
</script>
