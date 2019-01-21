import axios from 'axios'

export default ({app, router, Vue}) => {
  Vue.prototype.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios
  //       so you won't necessarily have to import axios in each vue file
}
