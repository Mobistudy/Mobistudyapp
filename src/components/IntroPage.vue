<template>
  <div class="fullscreen">
    <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable animated
      control-color="primary" style="height: 100%;">
      <q-carousel-slide name="intro1">
        <img src="imgs/MobistudyIntroScreens_1.svg" style="width: 100%">
        <div class="q-my-md text-center mobitxt2">
          {{ $t('intro1') }}
        </div>
        <div style="height:50px;"></div>

      </q-carousel-slide>

      <q-carousel-slide name="intro2">
        <img src="imgs/MobistudyIntroScreens_2.svg" style="width: 100%">
        <div class="q-my-md text-center mobitxt2">
          {{ $t('intro2') }}
        </div>
        <div style="height: 50px;"></div>
      </q-carousel-slide>
      <q-carousel-slide name="intro3">
        <img src="imgs/MobistudyIntroScreens_3.svg" style="width: 100%">
        <div class="q-my-md text-center mobitxt2">
          {{ $t('intro3') }}
        </div>
        <div style="height: 50px;"></div>
      </q-carousel-slide>
      <q-carousel-slide name="intro4">
        <img src="imgs/MobistudyIntroScreens_4.svg" style="width: 100%">
        <div class="q-my-md text-center mobitxt2">
          {{ $t('intro4') }}
        </div>
        <div style="height: 50px;"></div>
      </q-carousel-slide>
    </q-carousel>
    <div class="fixed-bottom q-mb-md row justify-around">
      <q-btn class="mobibtn" v-show="slide != 'intro1'" icon="chevron_left" color="primary" :label="$t('common.back')"
        @click="prev()" />
      <div v-show="slide == 'intro1'" style="width: 100px;" />
      <q-btn class="mobibtn" :icon-right="slide == 'intro4' ? 'arrow_forward' : 'chevron_right'" color="primary"
        :label="slide == 'intro4' ? $t('common.start') : $t('common.next')" @click="next()" />
    </div>
    <div style="height: 10px;"></div>
  </div>
</template>

<script>
import { mergeDeep } from '@shared/tools'
import commonMessages from '@i18n/common'
import welcomeIntroMessages from '@i18n/welcomeIntro'

export default {
  name: 'IntroPage',
  data () {
    return {
      slide: 'intro1'
    }
  },
  i18n: {
    messages: mergeDeep(commonMessages, welcomeIntroMessages)
  },
  methods: {
    next () {
      if (this.slide === 'intro1') this.slide = 'intro2'
      else if (this.slide === 'intro2') this.slide = 'intro3'
      else if (this.slide === 'intro3') this.slide = 'intro4'
      else this.$router.replace({ name: 'login' })
    },
    prev () {
      if (this.slide === 'intro2') this.slide = 'intro1'
      else if (this.slide === 'intro3') this.slide = 'intro2'
      else if (this.slide === 'intro4') this.slide = 'intro3'
    }
  }
}
</script>
