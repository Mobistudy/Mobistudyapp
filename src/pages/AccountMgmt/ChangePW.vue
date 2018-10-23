<template>
  <q-page padding class="flex flex-center">
    <!-- content -->
    <div style="width: 80vw">
      <q-field>
        <q-input float-label="Old Password" type="password" />
      </q-field>
      <q-field>
        <q-input float-label="New Password" type="password" />
        <q-input float-label="Confirm Password" type="password" />
      </q-field>
      <br />
      <q-btn class="float-right" label="Change Password" color="positive" type="submit" />
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>

<style>
</style>
