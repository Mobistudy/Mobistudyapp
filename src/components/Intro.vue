<template>
  <q-page>
    <div style="height: 90vh;">
      <q-carousel
        v-model="slide"
        ref="carousel"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        arrows
        swipeable
        control-color="primary"
        class="full-height"
      >
        <q-carousel-slide
          v-for="(slide, idx) in introductionSlides"
          :name="'slide-' + idx"
          :key="idx"
        >
          <q-scroll-area class="fit">
            <slot :name="'slide-' + idx">
              <div
                class="text-h5 text-center q-pb-sm q-pt-sm"
                v-if="slide.title"
              >
                {{slide.title}}
              </div>
              <div
                v-if="slide.img"
                class="q-pb-lg q-pl-xl q-pr-xl q-pt-lg"
              >
                <q-img :src="slide.img"></q-img>
              </div>
              <div
                v-if="slide.description"
                :slide="slide"
                class="q-pb-lg q-pl-lg q-pr-lg q-pt-sm"
              >
                <div
                  class="mobitxt2 text-center"
                  v-html="slide.description"
                >
                </div>
              </div>
            </slot>
          </q-scroll-area>
        </q-carousel-slide>
      </q-carousel>
      <slot name="finishButton">
        <div
          style="height: 10vh;"
          class="fixed-bottom text-center q-pa-md"
        >
          <q-btn
            color="primary"
            class="full-width mobibtn"
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
    introductionSlides: Array
  },
  data () {
    return {
      slide: 'slide-0'
    }
  }
}
</script>
