<template>
  <q-page padding>
    <!-- content -->
    <div v-if="instruction && !isCompleted">
      <div class="text-center text-h6 q-mt-lg">
      Instructions for the Queen's College Step Test
      </div>
      <q-item class="q-mt-md">
        <q-item-section>
          <q-item-label class="q-pb-sm">Introduction</q-item-label>
          <q-item-label caption>
            <p>This task is to perform the Queen's College Step Test. This app is able to send the results of your tests to a server hosted by the University of Malmö. The data is made available to the personnel of the Skånes Universitetssjukhus so that doctors and nurses are able to review them.<br /><br />
            To conduct this test, you will require:</p>
            <ul>
              <li>A step 16.25 inches/41.3 cm high</li>
              <li>Heart rate monitor (optional) <br />
              <i>Note: To measure your heart rate manually, please count the number of heart beats for 15 seconds. Multiply the count by four.</i>
              </li>
            </ul>
          </q-item-label>
          <q-item-label class="q-pb-sm">Instructions</q-item-label>
          <q-item-label caption>
            <p>Please read the instructions carefully. The accuracy of the test depends on the instructions being followed as closely as possible.</p>
            <ul>
              <li>This is a paced test, meaning that you should aim to step using a four-step cadence, 'up-up-down-down' for 3 minutes.</li>
              <li>When you are ready to start the test, press the "Start"-button.</li>
              <li>Step up and down according to the metronome/pacer. Make sure to turn on the sound on your device and turn up the volume.</li>
              <li>The test will automaticly stop after 3 minutes, and you will be asked to measure your heart rate and send the collected data. If you need to complete the test earlier, press the "Complete"-button.</li>
              <li>Please measure your heart rate within 5-20 seconds after completing the test</li>
              <li>Try not to talk during the test, as this may affect your performance.</li>
              <li>Stop immediately if you have any chest pain or dizziness. Your result will not be registrered.</li>
            </ul>
          </q-item-label>
          <div class="row justify-center q-mt-lg">
            <q-btn color="primary" @click="start()" :label="$t('common.start')" />
          </div>
        </q-item-section>
    </q-item>
    </div>
    <q-item-section id="heartRate" v-if="enterHR">
    <h6>Enter your heart rate</h6>
        <p><i>Note: To measure your heart rate manually, please count the number of heart beats for 15 seconds. Multiply the count by four and enter the value below</i></p>
        <q-input outlined v-model="heartRate" label="Heart rate" />
        <q-btn color="primary" @click="completeTest()" :label="$t('common.next')" :disable="!heartRate" />
    </q-item-section>

    <q-item class="q-mt-md">
      <q-item-section id="completedText" v-if="isCompleted && !enterHR">
        <h5>Congratulations!</h5>
        <img alt="Finish flag" src="~assets/flag.svg">
        <h6>You completed the test!</h6>
        <q-item-section id="stats">
          <table>
            <tr>
              <td>Time:</td>
              <td> {{ minutes }}:{{ seconds }}</td>
            </tr>
            <tr>
              <td>Steps:</td>
              <td>{{ this.steps / 4 }}</td>
            </tr>
          </table>
        </q-item-section>
        <div class="q-pa-md">
          <p class="sub-heading">Please rate your level of exertion:</p>
            <q-list class="borg">

              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="value" val="0" />
                </q-item-section>
                <q-item-section>
                  <q-item><p>0</p> <p>No Exertion</p></q-item>
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="value" val="0.5" />
                </q-item-section>
                <q-item-section>
                  <q-item><p>0.5</p> <p>Very very slight</p></q-item>
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section avatar top>
                  <q-radio v-model="value" val="1"/>
                </q-item-section>
                <q-item-section>
                  <q-item><p>1</p> <p>Very slight</p></q-item>
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="value" val="2"/>
                </q-item-section>
                <q-item-section>
                  <q-item><p>2</p><p>Slight</p></q-item>
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="value" val="3"/>
                </q-item-section>
                <q-item-section>
                  <q-item><p>3</p><p>Moderate</p></q-item>
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section avatar top>
                  <q-radio v-model="value" val="4"/>
                </q-item-section>
                <q-item-section>
                  <q-item><p>4</p><p>Somewhat strong</p></q-item>
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="value" val="5"/>
                </q-item-section>
                <q-item-section>
                  <q-item><p>5</p><p>Strong</p></q-item>
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="value" val="6" />
                </q-item-section>
                <q-item-section>
                  <q-item><p>6</p></q-item>
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section avatar top>
                  <q-radio v-model="value" val="7" />
                </q-item-section>
                <q-item-section>
                  <q-item><p>7</p><p>Very strong</p></q-item>
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="value" val="8" />
                </q-item-section>
                <q-item-section>
                  <q-item><p>8</p></q-item>
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="value" val="9" />
                </q-item-section>
                <q-item-section>
                  <q-item><p>9</p><p>Very very strong</p></q-item>
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section avatar top>
                  <q-radio v-model="value" val="10"/>
                </q-item-section>
                <q-item-section>
                  <q-item><p>10</p><p>Maximal</p></q-item>
                </q-item-section>
              </q-item>
            </q-list>

            <div class="q-px-sm q-mt-sm">
              <p class="sub-heading">Your selection is: <strong>{{ value }}</strong></p>
            </div>

            <div id="submit">
              <q-btn color="primary" v-if="isCompleted" @click="send()" :label="$t('common.send')" :disable="!value" />
            </div>
          </div>
      </q-item-section>
    </q-item >

    <q-item-section v-if="!instruction && !isCompleted && !enterHR">
    <div class="text-center text-h6 q-mt-lg">
      Queens College Step Test
    </div>

    <p id="timer"> {{ minutes }}:{{ seconds }} </p>
    <q-btn  @click="toggleTest" v-if="!isStarted" color="secondary" label="Start" :disabled="isCompleted" />
    <q-btn  @click="stopTest" v-if="isStarted" color="purple" label="Complete" />
    </q-item-section>
  </q-page>
</template>

<script>
import phone from '../../modules/phone'
import DB from '../../modules/db.js'
import API from '../../modules/API.js'
// const options = {/* todo */}

export default {
  name: 'QCSTPage',
  components: {},
  data: function () {
    return {
      task: {},
      taskDescr: {},
      loading: false,
      isStarted: false,
      isCompleted: false,
      instruction: true,
      enterHR: false,
      timer: null,
      totalTime: 180,
      steps: 0,
      gender: 'female',
      heartRate: '',
      value: '',
      metronome: null,
      cadence: 0
    }
  },
  methods: {
    start () {
      this.instruction = false
    },
    toggleTest () {
      if (!this.isStarted) {
        this.isStarted = true
        this.startTest()
      }
    },
    preMatureCompleteTest () {
      this.completeTest()
      this.countDown = null
    },
    completeTest () {
      this.enterHR = false
      this.isStarted = false
      this.isCompleted = true
    },
    startTimer () {
      if (this.totalTime === 180) {
        phone.media.playSound('/statics/sounds/begin.wav')
      }
      this.isStarted ? this.timer = setInterval(() => this.countDown(), 1000) : clearInterval(this.timer)
    },
    countDown () {
      if (this.totalTime === 120) {
        phone.media.playSound('/statics/sounds/1-minute.wav')
      } else if (this.totalTime === 60) {
        phone.media.playSound('statics/sounds/2-minutes.wav')
      }
      if (this.totalTime >= 1) {
        this.totalTime--
      } else {
        phone.media.playSound('statics/sounds/time.wav')
        this.measureHR()
      }
    },
    padTime (time) {
      return (time < 10 ? '0' : '') + time
    },
    startTest () {
      if (phone.pedometer.isAvailable()) {
        if (phone.pedometer.requestPermission()) {
          phone.pedometer.startNotifications({}, async (step) => {
            this.steps++
          })
        }
      }
    },
    stopTest () {
      phone.pedometer.stopNotifications()
      this.measureHR()
    },
    measureHR () {
      this.enterHR = true
      this.isStarted = false
    },
    async send () {
      this.loading = true
      try {
        let studyKey = 'QCST'// this.$route.params.studyKey
        let taskId = 1 // Number(this.$route.params.taskID)
        await API.sendQCSTData({
          userKey: 'userKey', // userinfo.user._key,
          studyKey: studyKey,
          taskId: taskId,
          dataType: this.taskDescr.dataType,
          createdTS: new Date(),
          steps: this.steps,
          heartRate: this.heartRate,
          totalTime: this.totalTime
        })
        await DB.setTaskCompletion(studyKey, taskId, new Date())
        // this.$q.notify({
        //   color: 'positive',
        //   message: 'Data sent successfully!',
        //   icon: 'check'
        // })
        // let _this = this
        this.$router.push('/home', function () {
          // _this.$router.go() // I think this refreshes /home so that notifications are rescheduled appropriately
          window.location.reload(true)
        })
      } catch (error) {
        this.loading = false
        console.error(error)
        this.$q.notify({
          color: 'negative',
          message: 'Cannot send data: ' + error.message,
          icon: 'report_problem',
          onDismiss () {
            this.$router.push('/home')
          }
        })
      }
    }
  },
  watch: {
    isStarted () {
      this.startTimer()
      this.isStarted ? this.metronome = setInterval(() => phone.media.playSound('/statics/sounds/clack.ogg'), this.cadence) : clearInterval(this.metronome)
    }
  },
  computed: {
    minutes () {
      return this.padTime(Math.floor(this.totalTime / 60))
    },
    seconds () {
      return this.padTime(this.totalTime - (this.minutes * 60))
    }
  },
  beforeDestroy: function () {
    clearInterval(this.metronome)
    clearInterval(this.timer)
    this.stopTest()
  },

  async mounted () {
    if (this.gender === 'female') {
      this.cadence = 681
    } else if (this.gender === 'male') {
      this.cadence = 625
    } else {
      console.log('No gender specified')
    }
  }
}
</script>

<style>

h5 {
  margin-top: 0px;
}
#timer {
  font-size: 5rem;
  text-align: center;
  padding: 20px;
}

#completedText {
  text-align: center;
  font-size: 36px;
}

.q-mt-md {
    margin-top: 0px;
}

img {
  width: 40%;
  margin: 0px auto;
}
table {
  background: #f8f8f8;
  padding: 4px;
  width: 70%;
  margin: 0px auto;
  font-size: 0.75rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
}
table td:nth-child(2) {
  text-align: right;
}
tr {
  text-align: left
}

.q-pa-md {
  padding-top: 20px;
}
.sub-heading {
  font-size: 14px;
  text-align: left
}
div.q-list {
  border: 1px solid #ccc;
}
div.q-list label {
  font-size: 14px;
}

div.q-list p {
    margin: 0px;
    padding: 12px 5px;
}
div.q-item {
  display: flex;
  justify-content: space-between;
  padding: 0px;
}
.text-caption {
  padding-bottom: 10px;
}
#submit {
  text-align: center;
}
</style>
