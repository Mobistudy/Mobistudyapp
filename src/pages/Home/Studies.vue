<template>
  <q-page padding>
    <!-- content -->
    <q-list highlight>
      <q-list-header>Active studies</q-list-header>
      <study-active v-for="study in activeStudies" v-bind:study="study" v-bind:key="study.id"></study-active>
      <q-item v-if="activeStudies.length === 0">
        <q-item-main>No active studies found.  Press the green plus sign in the bottom right to add a study.</q-item-main>
      </q-item>
      <!--<q-item>
        <q-item-main label="John Radcliffe Study I" />
        <q-item-side right>
          <q-btn flat round dense icon="more_vert">
            <q-popover>
              <q-list link>
                <q-item v-close-overlay>
                  <q-item-main label="Withdraw from Study" />
                </q-item>
              </q-list>
            </q-popover>
          </q-btn>
        </q-item-side>
      </q-item>-->
      <q-item-separator v-if="previousStudies.length !== 0" />
      <q-list-header v-if="previousStudies.length !== 0">Previous studies</q-list-header>
      <study-previous v-for="study in previousStudies" v-bind:study="study" v-bind:key="study.id"></study-previous>
    </q-list>
    <q-btn
      round
      color="positive"
      @click="promptNewStudy()"
      class="fixed"
      icon="add"
      style="right: 18px; bottom: 18px"
      size="lg"
    />
  </q-page>
</template>

<script>
import StudyPrevious from 'components/Main/Studies/Previous'
import StudyActive from 'components/Main/Studies/Active'
import DB from '../../modules/db'

export default {
  // name: 'PageName',
  components: {StudyActive, StudyPrevious},
  created () {
    let _this = this
    DB.getStudiesParticipation().then(function (studies) {
      console.log(studies)
      for (let i = 0; i < studies.length; i++) {
        DB.getStudyDescription(studies[i].studyKey).then(function (description) {
          if (studies[i].currentStatus === 'accepted') {
            _this.activeStudies.push(description)
          } else { // I think this needs to be an if else for another status, but I'm not sure what the other status is
            _this.previousStudies.push(description)
          }
        })
      }
    })
  },
  data () {
    return {
      activeStudies: [
        // {
        //   id: 0,
        //   name: 'IBME Study II',
        //   endDate: '28/11/2018'
        // },
        // {
        //   id: 1,
        //   name: 'John Radcliffe Orthopedic Study I',
        //   endDate: '03/02/2019'
        // }
      ],
      previousStudies: [
        // {
        //   id: 0,
        //   name: 'IBME Study I',
        //   endDate: '01/09/2018'
        // }
      ]
    }
  },
  methods: {
    promptNewStudy () {
      let _this = this
      this.$q.dialog({
        title: 'Add Study',
        message: 'Please enter your study code below.',
        prompt: {
          model: '',
          type: 'text' // optional
        },
        cancel: true,
        color: 'secondary'
      }).then(data => {
        _this.$q.loading.show()
        _this.$router.push({ path: `addStudy/${data}` })
      }).catch(() => {
        // this.$q.notify('Ok, no mood for talking, right?')
      })
    }
  }
}
</script>

<style>
</style>
