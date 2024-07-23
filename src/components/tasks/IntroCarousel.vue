<template>
  <div style="height: 90vh;">
    <q-carousel v-model="slide" ref="carousel" transition-prev="slide-right" transition-next="slide-left" animated
      swipeable control-color="primary" class="full-height">
      <q-carousel-slide v-for="(slide, idx) in introductionSlides" :name="'slide-' + idx" :key="idx">
        <q-scroll-area class="fit">
          <slot :name="'slide-' + idx">
            <div class="text-h5 text-center q-pb-sm q-pt-sm" v-if="slide.title">
              {{ slide.title }}
            </div>
            <div v-if="slide.img" class="q-pb-lg q-pl-xl q-pr-xl q-pt-lg">
              <q-img :src="slide.img"></q-img>
            </div>
            <div v-if="slide.description" :slide="slide" class="q-pb-lg q-pl-lg q-pr-lg q-pt-sm">
              <div class="mobitxt2 text-center" v-html="slide.description">
              </div>
            </div>
          </slot>
        </q-scroll-area>
      </q-carousel-slide>
    </q-carousel>

    <div class="fixed-bottom q-mb-md row justify-around">
      <q-btn v-show="!isFirstSlide()" class="mobibtn" icon="chevron_left" color="primary" :label="$t('common.back')"
        @click="prev()" />
      <div v-show="isFirstSlide()" style="width: 100px;" />
      <q-btn class="mobibtn" icon-right="chevron_right" color="primary" :label="$t('common.next')" @click="next()" />
    </div>

    <!-- <slot name="finishButton">
      <div style="height: 10vh;" class="fixed-bottom text-center q-pa-md">
        <q-btn color="primary" class="full-width mobibtn" @click="$emit('start')" replace :label="$t('common.start')" />
      </div>
    </slot> -->
  </div>
</template>

<script>
import i18nCommon from '@i18n/common'

export default {
  name: 'IntroCarousel',
  i18n: {
    messages: i18nCommon
  },
  props: {
    introductionSlides: Array
  },
  data () {
    return {
      slide: 'slide-0'
    }
  },
  methods: {
    slideName2Index (name) {
      return parseInt(name.split('-')[1])
    },
    isFirstSlide () {
      return this.slide === 'slide-0'
    },
    isLastSlide () {
      const crtIdx = this.slideName2Index(this.slide)
      if (crtIdx >= this.introductionSlides.length) return true
      return false
    },
    next () {
      let crtIdx = this.slideName2Index(this.slide)
      if (crtIdx >= this.introductionSlides.length) {
        this.$emit('start')
      } else {
        crtIdx++
        this.slide = 'slide-' + crtIdx
      }
    },
    prev () {
      let crtIdx = this.slideName2Index(this.slide)
      if (!this.isFirstSlide()) {
        crtIdx--
        this.slide = 'slide-' + crtIdx
      }
    }
  }
}
</script>
