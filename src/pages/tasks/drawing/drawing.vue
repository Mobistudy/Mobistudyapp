<template>
  <q-page padding>
    <div class="text-center text-h5 q-mt-lg">
      {{ $t('studies.tasks.drawing.title') }}
    </div>

    <p class="text-center text-subtitle1 q-mt-lg">{{ $t('studies.tasks.drawing.instructions.start') }}</p>
    <div class="row justify-center q-mb-xl fixed-bottom">
      <canvas
        ref="drawingCanvas"
        width="350"
        height="350"
      ></canvas>
    </div>
  </q-page>
</template>

<script>
import phone from 'modules/phone/phone'
import userinfo from 'modules/userinfo'
// import API from 'modules/API/API'
// import DB from 'modules/db'
// import { ref } from 'vue'

let touchTimeout

export default {
  name: 'PositionPage',
  props: {
    studyKey: String,
    taskId: Number
  },
  data: function () {
    return {
      startedTS: undefined,
      startTS: undefined,
      coords0: [],
      coords1: [],
      testNumber: 0,
      totalVariabilitySquare: 0,
      totalVariabilitySpiral: 0,
      coordsSquare: 0,
      coordsSpiral: 0
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.decideTest()
    })
    this.$refs.drawingCanvas.addEventListener('touchmove', this.handleMove)
  },
  methods: {
    executeTest0 () {
      this.startedTS = new Date()
      this.startTS = new Date().getTime()
      let ctx = this.$refs.drawingCanvas.getContext('2d')
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
      this.startTS = new Date().getTime()
      let ctx = this.$refs.drawingCanvas.getContext('2d')
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

    handleMove (evt) {
      evt.preventDefault()
      let canvas = this.$refs.drawingCanvas
      let source = evt.touches ? evt.touches[0] : evt
      const { clientX, clientY } = source
      const { left, top } = canvas.getBoundingClientRect()

      const x = clientX - left
      const y = clientY - top

      let ts = new Date().getTime() - this.startTS
      let point = {
        x: x,
        y: y,
        ts: ts
      }
      if (this.testNumber === 0) {
        this.coords0.push(point)
        let distToBox = Math.min(
          this.distanceToLine(1, 0, -300, x, -y),
          this.distanceToLine(1, 0, -50, x, -y),
          this.distanceToLine(0, 1, 50, x, -y),
          this.distanceToLine(0, 1, 300, x, -y)
        )
        distToBox = Math.pow(distToBox, 2)
        this.totalVariabilitySquare += distToBox
        this.coordsSquare = this.coords0.length

        console.log(this.coords0.length)
      } else if (this.testNumber === 1) {
        this.coords1.push(point)
        let distToBox = Math.min(
          this.distanceToLine(1, 0, -300, x, -y),
          this.distanceToLine(1, 0, -50, x, -y),
          this.distanceToLine(1, 0, -250, x, -y),
          this.distanceToLine(1, 0, -100, x, -y),
          this.distanceToLine(1, 0, -200, x, -y),
          this.distanceToLine(1, 0, -150, x, -y),
          this.distanceToLine(0, 1, 150, x, -y),
          this.distanceToLine(0, 1, 200, x, -y),
          this.distanceToLine(0, 1, 100, x, -y),
          this.distanceToLine(0, 1, 250, x, -y),
          this.distanceToLine(0, 1, 50, x, -y),
          this.distanceToLine(0, 1, 300, x, -y)
        )
        distToBox = Math.pow(distToBox, 2)
        this.totalVariabilitySpiral += distToBox
        this.coordsSpiral = this.coords1.length
      }

      let ctx = canvas.getContext('2d')
      ctx.fillStyle = '#459399'
      ctx.fillRect(x, y, 4, 4)

      if (touchTimeout) clearTimeout(touchTimeout)
      touchTimeout = setTimeout(() => {
        // here test has finished
        // move to the next phase
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // next drawing template
        this.testNumber = this.testNumber + 1
        // score calculation

        this.decideTest()
      }, 2000)
    },

    distanceToLine (a, b, c, x, y) {
      return Math.abs(a * x + b * y + c) / (Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)))
    },

    completeTest () {
      this.isCompleted = true
      let completionTS = new Date()

      let report = {
        userKey: userinfo.user._key,
        participantKey: userinfo.user.participantKey,
        studyKey: this.studyKey,
        taskId: parseInt(this.taskId),
        taskType: 'drawing',
        createdTS: new Date(),
        phone: phone.device,
        summary: {
          startedTS: this.startedTS,
          completedTS: completionTS,
          totalVariabilitySquare: this.totalVariabilitySquare / this.coordsSquare,
          totalVariabilitySpiral: this.totalVariabilitySpiral / this.coordsSpiral
        },
        data: {
          square: {
            shape: 'square',
            touchCoordinates: this.coords0,
            shapeCoordinates: [{ x: 300, y: 200 }, { x: 300, y: 50 }, { x: 50, y: 50 }, { x: 50, y: 300 }, {
              x: 300,
              y: 300
            }, { x: 300, y: 200 }]
          },
          spiral: {
            shape: 'spiral',
            touchCoordinates: this.coords1,
            shapeCoordinates: [{ x: 300, y: 200 }, { x: 300, y: 50 }, { x: 50, y: 50 }, { x: 50, y: 300 }, {
              x: 250,
              y: 300
            }, { x: 250, y: 100 },
            { x: 100, y: 100 }, { x: 100, y: 250 }, { x: 200, y: 250 }, { x: 200, y: 150 }, { x: 150, y: 150 }, {
              x: 150,
              y: 200
            }]
          }
        }
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
