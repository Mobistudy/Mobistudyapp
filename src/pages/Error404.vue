<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded mobitxt2">Sorry, nothing here...<strong>(404)</strong></p>
    <q-btn
      padding="md lg"
      color="secondary"
      style="width:200px;"
      to="/"
      label="Go back"
    />
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
