<template>
  <q-page padding>
    <div class="text-center text-h5 q-mt-lg">
      {{ $t('studies.tasks.peakflow.title') }}
    </div>

    <p id="timer"> {{ minutes }}:{{ seconds }} </p>
    <div class="row justify-center q-mt-lg">
      <q-btn
        @click="startTest"
        v-if="!isStarted"
        color="secondary"
        :label="$t('common.start')"
        padding="lg"
      />
      <q-btn
        @click="completeTest"
        v-if="isStarted"
        color="purple"
        :label="$t('common.complete')"
        padding="lg"
      />
    </div>
    <q-btn
      padding="xl" color="black" round
      flat icon="volume_up" class="q-mt-xl"
      ref="metronome_indicator" v-if="isStarted"
    />

  </q-page>
</template>
