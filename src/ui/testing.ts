import { ipcRenderer } from 'electron'
import * as Vue from 'vue/dist/vue.common'

const app = new Vue({
  el: '#app',
  data: {
    components: {},
  },
  methods: {
    openDevTools() {
      ipcRenderer.send('open-devtools')
    },
    update(reference) {
      this.$forceUpdate()
      ipcRenderer.send('update-input-value', { reference, value: this.components[reference].value })
    },
  },
  mounted() {
    ipcRenderer.on('register-component', (event, { reference, options }) => {
      this.$set(this.components, reference, options)
    })
    ipcRenderer.on('update-output-value', (event, { reference, value }) => {
      this.$set(this.components[reference], 'value', value)
    })
  },
})
