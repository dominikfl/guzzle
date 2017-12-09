import { ipcRenderer } from 'electron'
import * as Vue from 'vue/dist/vue.common'

const app = new Vue({
  el: '#app',
  data: {
    inputs: {
      scaleValue: 0
    },
    outputs: {
      valves: [
        {
          open: true
        },
        {
          open: false
        }
      ]
    }
  },
  methods: {
    openDevTools() {
      ipcRenderer.send('open-devtools')
    }
  },
  mounted() {
    ipcRenderer.on('update-valve',
      (event, { id, open }) => this.outputs.valves[id].open = open)
    ipcRenderer.on('request-scale-value',
      (event, arg) => event.sender.send('respond-with-scale-value', this.inputs.scaleValue))
  }
})
