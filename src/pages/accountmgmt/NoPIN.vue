<template>
    <q-layout>
        <q-page-container>
            <q-page padding class="flex flex-center">
                <p class="q-title q-mt-lg" style="text-align: center">
                    <img src="~/assets/mobistudy_logo.svg" style="width:30vw; max-width:150px;" ><br />
                 </p>
                <div class="q-pa-lg">
                    <p>You are not using any PIN code on your phone. Set one to keep your information safe.</p>
                </div>
                <div class="q-pa-md">
                    <q-btn size="sm" class="q-ma-sm" align="left" @click="proceed">Proceed anyway</q-btn>
                    <q-checkbox size="sm" class="q-ma-sm" align="right" v-model="checked" label="Don't warn me again"></q-checkbox>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
import API from 'modules/API'
import DB from 'modules/db'
export default {
  name: 'NoPin',
  props: {
    userinfo: Object
  },
  data () {
    return {
      checked: false
    }
  },
  methods: {
    proceed () {
      this.userinfo.user.wantsPINWarning = !this.checked // Negates the checkbox value because checked:true --> wantsWarning:false
      DB.setUserSession(this.userinfo.user) // Saves the user preference

      if ((!this.userinfo.user.loggedin || !this.userinfo.user.name)) {
        console.log('loggedin', this.userinfo.user.loggedin, 'name', this.userinfo.name)
        this.$router.replace('/login')
      } else {
        console.log('Else')
        API.setToken(this.userinfo.user.token)
        this.$router.replace('/login') // TODO: Is this correct?
        this.$router.push({
          name: 'tasker',
          params: { rescheduleTasks: true, checkNewStudies: true }
        })
      }
    },
    checkbox () {
      console.log(this.wantsPINWarning)
    }
  }
}
</script>
