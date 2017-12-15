import { ipcRenderer } from 'electron'
import * as Vue from 'vue/dist/vue.common'

const app = new Vue({
  el: '#app',
  data: {
    components: {
      scale: {
        icon: 'scale',
        name: 'Scale',
        value: 0,
        input: {
          type: 'numeric',
          min: 0,
          suffix: ' g',
        },
      },
      valve0: {
        icon: 'water',
        name: 'Valve 1',
        value: 'Closed',
      },
      valve1: {
        icon: 'water',
        name: 'Valve 2',
        value: 'Closed',
      },
    },
  },
  methods: {
    openDevTools() {
      ipcRenderer.send('open-devtools')
    },
    update(reference) {
      ipcRenderer.send('update-input-value', { reference, value: this.components[reference].value })
    },
  },
  mounted() {
    ipcRenderer.on('update-output-value', (event, { reference, value }) => this.components[reference].value = value)
  },
})
