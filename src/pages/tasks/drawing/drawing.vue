<template>
  <q-page padding>
    <div class="text-center text-h5 q-mt-lg">
      {{ $t('studies.tasks.drawing.title') }}
    </div>

    <p class="text-center text-subtitle1 q-mt-lg">{{ $t('studies.tasks.drawing.instructions.start') }}</p>

    <!-- <q-inner-loading :showing="showConnecting">
      <div
        class="text-overline"
        color="dark-grey"
      >{{$t('studies.tasks.position.connecting')}}</div>
      <q-spinner-dots
        size="40px"
        color="primary"
      />
    </q-inner-loading> -->
    <canvas id="myCanvas" width="350" height="350" style="border:3px solid #386C81" onload="drawSpiral" v-touch-pan.prevent="handlePan">
      <!-- <img src="imgs/spiral.svg" style="width: 100px height: 100px"> -->
    </canvas>
  </q-page>
</template>

<script>
// import phone from 'modules/phone'
import userinfo from 'modules/userinfo'
// import API from 'modules/API/API'
// import DB from 'modules/db'
// import { ref } from 'vue'
export default {
  name: 'PositionPage',
  props: {
    studyKey: String,
    taskId: Number
  },
  data: function () {
    return {
      startedTS: undefined,
      coords0: [],
      coords1: [],
      testNumber: 0,
      totalVariability: 0
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.decideTest()
    })
  },
  methods: {
    executeTest0 () {
      this.startedTS = new Date()
      var canvas = document.getElementById('myCanvas')
      var ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.moveTo(300, 200)
      ctx.lineTo(300, 50)
      ctx.lineTo(50, 50)
      ctx.lineTo(50, 300)
      ctx.lineTo(300, 300)
      ctx.lineTo(300, 200)
      ctx.lineWidth = 1
      ctx.stroke()
    },
    executeTest1 () {
      var canvas = document.getElementById('myCanvas')
      var ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.moveTo(300, 200)
      ctx.lineTo(300, 50)
      ctx.lineTo(50, 50)
      ctx.lineTo(50, 300)
      ctx.lineTo(250, 300)
      ctx.lineTo(250, 100)
      ctx.lineTo(100, 100)
      ctx.lineTo(100, 250)
      ctx.lineTo(200, 250)
      ctx.lineTo(200, 150)
      ctx.lineTo(150, 150)
      ctx.lineTo(150, 200)
      ctx.lineWidth = 1
      ctx.stroke()
    },
    decideTest () {
      if (this.testNumber === 0) {
        this.executeTest0()
      } else if (this.testNumber === 1) {
        this.executeTest1()
      } else if (this.testNumber === 2) {
        this.completeTest()
      }
    },
    handlePan ({ evt, ...newInfo }) {
      var top = newInfo.position.top - 60
      var left = newInfo.position.left - 10
      let point = {
        x: left,
        y: top
      }
      if (this.testNumber === 0) {
        this.coords0.push(point)
      } else if (this.testNumber === 1) {
        this.coords1.push(point)
      }
      // console.log(this.coords0)
      // console.log(this.coords1)
      var canvas = document.getElementById('myCanvas')
      var ctx = canvas.getContext('2d')
      ctx.fillStyle = '#459399'
      ctx.fillRect(left, top, 5, 5)
      // console.log('distance to box: ' + Math.min(
      //   this.distanceToLine(1, 0, -300, left, -top),
      //   this.distanceToLine(1, 0, -50, left, -top),
      //   this.distanceToLine(0, 1, 50, left, -top),
      //   this.distanceToLine(0, 1, 300, left, -top))
      // )
      //
      // Just an idea for score calculation, can be ommited if needed
      // var distToBox = Math.min(
      //   this.distanceToLine(1, 0, -300, left, -top),
      //   this.distanceToLine(1, 0, -50, left, -top),
      //   this.distanceToLine(0, 1, 50, left, -top),
      //   this.distanceToLine(0, 1, 300, left, -top))
      // distToBox = Math.pow(distToBox, 2)
      // //
      // // score calculation cont.
      // this.totalVariability += distToBox
      //
      //
      if (newInfo.isFinal === true) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // Uncomment this if you want to include the next test
        this.testNumber = this.testNumber + 1
        //
        // score calculation cont.
        // this.totalVariability = this.totalVariability / this.coords0.length
        // console.log(this.totalVariability)
        this.decideTest()
      }
    },
    // distanceToLine (a, b, c, x, y) {
    //   return Math.abs(a * x + b * y + c) / (Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)))
    // },

    completeTest () {
      this.isCompleted = true
      let completionTS = new Date()
      const studyKey = this.studyKey

      const taskId = parseInt(this.taskId)
      const userKey = userinfo.user._key
      let report = {
        userKey: userKey,
        studyKey: studyKey,
        taskId: taskId,
        createdTS: new Date(),
        startedTS: this.startedTS,
        completionTS: completionTS,
        // phone: phone.device,
        coords0: this.coords0,
        coords1: this.coords1
      }

      this.$router.push({ name: 'drawingSummary', params: { report: report } })
    }
  },
  computed: {
    aqiLevel () {
      if (this.environment.pollution && this.environment.pollution.aqi) return this.$t('studies.tasks.position.aqiscale.l' + this.environment.pollution.aqi)
      else return undefined
    }
  }
}
</script>
