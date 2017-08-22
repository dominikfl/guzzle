import Vue = require('vue/dist/vue.common')
import os = require('os')
import path = require('path')
import { ConfigLoader } from '../config/config-loader'

const app = new Vue({
  el: '#app',
  data: {
    view: 'drink',
    drinks: []
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
  mounted() {
    const configLoader = new ConfigLoader(path.join(os.homedir(), '.juicy'))
    this.drinks = configLoader.loadDrinks()
  }
})
