import { ipcRenderer } from 'electron'
import * as Vue from 'vue/dist/vue.common'

const app = new Vue({
  el: '#app',
  data: {
    inputs: {
      scaleWeight: 0,
    },
    outputs: {
      valves: [
        {
          open: true,
        },
        {
          open: false,
        },
      ],
    },
  },
  watch: {
    'inputs.scaleWeight'(scaleWeight) {
      ipcRenderer.send('update-scale-value', this.scaleWeight)
    },
  },
  methods: {
    openDevTools() {
      ipcRenderer.send('open-devtools')
    },
  },
  mounted() {
    ipcRenderer.on('update-valve',
      (event, { id, open }) => this.outputs.valves[id].open = open)
  },
})
