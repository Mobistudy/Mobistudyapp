<template>
  <q-page>
    <div
      style="height: 90vh;"
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
        class="full-height"
      >
        <q-carousel-slide
          v-for="(slide, idx) in slides"
          :name="'slide-' + idx"
          :key="idx"
        >
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
              v-if="slide.i"
              :slide="slide"
              class="q-pb-lg q-pl-lg q-pr-lg q-pt-sm"
            >
              <div>
                <p class="text-body1 text-center">
                  {{slide.i}}
                </p>
              </div>
            </div>
          </slot>
        </q-carousel-slide>
      </q-carousel>
      <slot name="finishButton">
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
    slides: Array
  },
  data () {
    return {
      slide: 'slide-0'
    }
  },
  created () {
    console.log('Received intructios', this.slides)
  }
}
</script>
