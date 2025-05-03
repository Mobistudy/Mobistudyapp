<template>
  <div>
    <q-input type="text" required label="Name" v-model="profile.name">
      <template v-slot:before>
        <q-icon name="face" />
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: 'FormDemo',
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue'],
  computed: {
    profile: {
      get () {
        return this.modelValue
      },
      set (newVal) {
        this.$emit('update:modelValue', newVal)
      }
    }
  }
}
</script>
