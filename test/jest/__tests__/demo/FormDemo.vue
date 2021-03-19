<template>
  <div>
    <q-input
      label="Name"
      v-model="value.name"
      @input="update()"
    >
      <template v-slot:before>
        <q-icon name="face" />
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: 'Form',
  props: ['value'],
  methods: {
    update () {
      this.$emit('input', this.value)
    }
  }
}
</script>
