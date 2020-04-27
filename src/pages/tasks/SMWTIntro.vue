<template>
  <q-page padding>
    <div class="text-h5 text-center">{{ $t('studies.tasks.smwt.title') }}</div>
    <div class="text-subtitle1 q-mt-md">
      {{ $t('common.introduction') }}
    </div>
    <div>
      {{ $t('studies.tasks.smwt.description') }}
    </div>
    <div class="text-subtitle1 q-mt-md">
      {{ $t('common.instructions') }}
    </div>
    <div>
      <ul>
        <li v-for="(instruction, idx) in $t('studies.tasks.smwt.instructions')" :key="idx">
          {{ instruction.i }}
        </li>
      </ul>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn color="primary" to="/smwt" replace :label="$t('common.start')" />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'SMWTIntroPage'
}
</script>
