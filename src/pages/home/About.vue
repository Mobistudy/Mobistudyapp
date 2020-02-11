<template>
  <q-page padding class="flex flex-center">
    <div class="text-h6 q-mt-lg">
      {{ $t('home.about.headline') }}
    </div>
    <q-item class="q-mt-md">
        <q-item-section>
          <q-item-label class="q-pb-sm">{{$t('home.about.introHeadline')}}</q-item-label>
          <q-item-label caption>{{$t('home.about.introText')}}</q-item-label>
        </q-item-section>
    </q-item>
    <q-item class="q-mt-md q-mb-lg">
        <q-item-section>
          <q-item-label caption>{{$t('home.about.managedByText')}}</q-item-label>
        </q-item-section>
    </q-item>
    <q-item>
      <div class="text-center">
        <div class="col-12">
          <img src="~/assets/malmo_logo.png" style="max-width:50%"/>
        </div>
      </div>
    </q-item>
    <q-item class="q-mt-md">
        <q-item-section>
          <q-item-label class="q-pb-sm">{{$t('home.about.tAndCHeadline')}}</q-item-label>
          <q-item-label caption>{{$t('home.about.tAndCText')}}</q-item-label>
        </q-item-section>
    </q-item>
    <q-item class="q-mt-md">
        <q-item-section>
          <q-item-label class="q-pb-sm">{{$t('home.about.privacyHeadline')}}</q-item-label>
          <q-item-label caption><main-privacy-policy></main-privacy-policy></q-item-label>
        </q-item-section>
    </q-item>
  </q-page>
</template>

<script>
import MainPrivacyPolicy from '../../components/MainPrivacyPolicy'

export default {
  name: 'AboutPage',
  components: { MainPrivacyPolicy }
}
</script>

<style>
</style>
