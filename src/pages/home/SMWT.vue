<template>
  <q-page padding>
    <!-- content -->
    <p>6MWT</p>
    <div id="map">
      {{ map }}
    </div>
  </q-page>
</template>

<script>
import { Loader } from 'google-maps'
const options = {/* todo */}

export default {
  name: 'DataQueryPage',
  components: { },
  data: function () {
    return {
      task: {},
      taskDescr: {},
      loading: false,
      map: null,
      coords: null
    }
  },
  methods: {
    getLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          this.coords = pos.coords
          console.log(this.coords.latitude)
        })
      } else {
        console.log('Geolocation is not supported by this browser.')
      }
    },
    async createMap (lat, lng) {
      const loader = new Loader('apikeyhere', options)

      const google = await loader.load()
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat, lng },
        zoom: 16
      })
      this.map = map
    }
  },
  async mounted () {
    this.getLocation()
    setTimeout(() => {
      this.createMap(this.coords.latitude, this.coords.longitude)
    }, 500)
  }
}
</script>

<style>
</style>
