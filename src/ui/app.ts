import Vue = require('vue/dist/vue.common')

const app = new Vue({
  el: '#app',
  data: {
    view: 'drink',
  },
  computed: {
    themeColor() {
      if(this.view === 'drink') return '#F9C22C'
      return '#76c455'
    }
  },
})
