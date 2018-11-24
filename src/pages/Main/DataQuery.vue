<template>
  <q-page padding>
    <!-- content -->
    <div v-if="finished">
      {{ healthData }}
    </div>
  </q-page>
</template>

<script>
let db = require('src/modules/db')
let moment = require('moment')
let scheduler = require('src/modules/scheduler')

export default {
  // name: 'PageName',
  data: function () {
    return {
      task: {},
      finished: false,
      healthData: null
    }
  },
  created () {
    this.$q.loading.show()
    let _this = this
    db.getStudies().then(function (res) {
      let study = res.find(x => x.key === _this.$route.params.studyKey)
      if (typeof study !== 'undefined') {
        let studyStart = moment(study.start)
        let task = study.config.tasks.find(x => x.id === Number(_this.$route.params.taskID))
        if (typeof task !== 'undefined') {
          return Promise.resolve({task: task, studyStart: studyStart})
        } else {
          return Promise.reject(new Error('Task not found'))
        }
      } else {
        return Promise.reject(new Error('Study not found'))
      }
    }).then(function (res) {
      return getHealthData(_this, res.task, res.studyStart)
    }).then(function (data) {
      _this.healthData = data
      _this.finished = true
      _this.$q.loading.hide()
    }).catch(function (err) {
      alert(err)
      _this.$q.loading.hide()
      _this.$router.go(-1)
    })
  }
}

function getHealthData (_this, task, studyStart) {
  let checkHealthAvailibility = new Promise(function (resolve, reject) {
    navigator.health.isAvailable(function (available) {
      if (available) {
        resolve()
      } else {
        if (_this.$q.platform.is.android) {
          navigator.health.promptInstallFit(function () {
            reject(new Error('Please install Google Fit and relaunch'))
          }, function (err) {
            reject(err)
          })
        } else {
          reject(new Error('Apple HealthKit or Google Fit is unavailable'))
        }
      }
    })
  })

  function getHealthAuthorisation () {
    return new Promise(function (resolve, reject) {
      navigator.health.requestAuthorization([{read: [task.dataType]}], function () {
        resolve()
      }, function (err) {
        reject(err)
      })
    })
  }

  function checkHealthAuthroisation () {
    return new Promise(function (resolve, reject) {
      navigator.health.isAuthorized([{read: [task.dataType]}], function (authorised) {
        if (authorised) {
          resolve()
        } else {
          reject(new Error('App is not authorised'))
        }
      }, function (err) {
        reject(err)
      })
    })
  }

  function queryHealth () {
    return new Promise(function (resolve, reject) {
      // Generate Start Date
      let startDate
      if (task.lastCompleted) {
        startDate = moment(task.lastCompleted).startOf('day').utc().toDate()
      } else {
        // Calculate when the task should've last been completed
        let rrule = scheduler.generateRRule(studyStart, task.scheduling)
        let prev = rrule.before(moment().startOf('day').utc().toDate())
        let next = rrule.after(moment().startOf('day').utc().toDate())
        let diff
        try {
          diff = moment(next).diff(moment(prev))
        } catch (e) {
          reject(e)
        }
        startDate = moment().subtract(diff, 'milliseconds').utc().toDate()
      }
      if (task.aggregated) {
        navigator.health.queryAggregated({
          startDate: startDate,
          endDate: new Date(),
          dataType: task.dataType,
          bucket: task.bucket // Optional
        }, (data) => resolve(data), (err) => reject(err))
      } else {
        navigator.health.query({
          startDate: startDate,
          endDate: new Date(),
          dataType: task.dataType
        }, (data) => resolve(data), (err) => reject(err))
      }
    })
  }

  return checkHealthAvailibility
    .then(getHealthAuthorisation)
    .then(checkHealthAuthroisation)
    .then(queryHealth)
}

</script>

<style>
</style>
