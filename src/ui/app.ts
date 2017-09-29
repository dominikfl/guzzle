import * as Vue from 'vue/dist/vue.common'
import os = require('os')
import path = require('path')

import { ConfigLoader } from '../config/config-loader'
import { Drink } from '../models/drink'

const app = new Vue({
  el: '#app',
  data: {
    view: 'drink',
    drinks: [new Drink('Placeholder', 'If you see this drink, something went wrong.', '#FF1744', [])],
    currentDrinkId: 0
  },
  computed: {
    backButtonHidden() {
      return this.view !== 'drink'
    },
    exitButtonHidden() {
      return this.view === 'home'
    },
    themeColor() {
      if(this.view === 'drink') return this.currentDrink.color
      return '#76c455'
    },
    currentDrink() {
      return this.drinks[this.currentDrinkId]
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
    configLoader.loadDrinks().then(drinks => this.drinks = drinks)
  }
})
