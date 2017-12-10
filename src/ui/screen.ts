import os = require('os')
import path = require('path')
import * as Vue from 'vue/dist/vue.common'

import { ConfigLoader } from '../config/config-loader'
import { Drink } from '../models/drink'

const app = new Vue({
  el: '#app',
  data: {
    step: 0,
    drinks: [new Drink('Placeholder', 'If you see this drink, something went wrong.', '#FF1744', [])],
    currentDrinkId: 0,
  },
  computed: {
    backButtonHidden() {
      return this.step < 1
    },
    exitButtonHidden() {
      return this.step <= 1
    },
    themeColor() {
      if (this.step > 0) return this.currentDrink.color
      return '#76c455'
    },
    currentDrink() {
      return this.drinks[this.currentDrinkId]
    },
  },
  methods: {
    goBack() {
      this.step = Math.max(this.step - 1, 0)
    },
    exit() {
      this.step = 0
    },
  },
  mounted() {
    const configLoader = new ConfigLoader(path.join(os.homedir(), '.guzzle'))
    configLoader.loadDrinks().then(drinks => this.drinks = drinks)
  },
})
