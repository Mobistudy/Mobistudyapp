<template>
  <q-page>
    <div
      style="height: 10vh;"
      class="text-h5 flex flex-center"
    >
      {{ title }}
    </div>
    <div
      style="height: 75vh;"
      class="q-pa-sm"
    >
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
        class="full-height"
      >
        <q-carousel-slide name="initialIntro">
          <slot name="initialIntro">
            <div class="text-subtitle1 q-mt-md">
              {{ $t('common.introduction') }}
            </div>
          </slot>
        </q-carousel-slide>

        <q-carousel-slide name="prerequisitesIntro">
          <slot name="prerequisitesIntro">
            <div> {{$t('common.prerequisites')}} </div>
          </slot>
        </q-carousel-slide>

        <q-carousel-slide
          v-for="(prerequisite, idx) in prerequisites"
          :name="'prerequisite-' + idx"
          :key="idx"
        >
          <div class="text-h5 text-center q-pb-sm">
            Prerequisite
          </div>
          <slot
            v-if="prerequisite.img"
            :name="'prerequisite-image-' + idx"
          >
            <div class="q-pa-lg">
              <q-img :src="prerequisite.img"></q-img>
            </div>
          </slot>
          <slot
            :name="'prerequisite-' + idx"
            :prerequisite="prerequisite"
          >
            <div class="q-mt-md">
              {{prerequisite.p}}
            </div>
          </slot>
        </q-carousel-slide>

        <q-carousel-slide name="instructionsIntro">
          <slot name="instructionsIntro">
            <div> {{$t('common.instructions')}} </div>
          </slot>
        </q-carousel-slide>

        <q-carousel-slide
          v-for="(instruction, idx) in instructions"
          :name="'instruction-' + idx"
          :key="idx"
        >
          <div class="text-h5 text-center">
            Instruction
          </div>
          <slot
            v-if="instruction.img"
            :name="'instruction-image-' + idx"
          >
            <q-img :src="instruction.img"></q-img>
          </slot>
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
      >
        <div
          style="height: 10vh;"
          class="fixed-bottom text-center q-pa-md"
        >
          <q-btn
            color="primary"
            @click="$emit('start')"
            replace
            :label="$t('common.start')"
          />
        </div>
      </slot>
    </div>
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
    console.log('Preq received:', this.prerequisites)
  }
}
</script>
