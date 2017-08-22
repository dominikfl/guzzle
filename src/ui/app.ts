import Vue = require('vue/dist/vue.common')

const app = new Vue({
  el: '#app',
  data: {
    view: 'drink',
  },
  computed: {
    backButtonHidden() {
      return this.view !== 'drink'
    },
    exitButtonHidden() {
      return this.view === 'home'
    },
    themeColor() {
      if(this.view === 'drink') return '#F9C22C'
      return '#76c455'
    }
  },
  methods: {
    goBack() {
      this.view = 'home'
    },
    exit() {
      this.view = 'home'
    }
  },
})
