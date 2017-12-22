import { app, BrowserWindow, ipcMain } from 'electron'
import path = require('path')

import { TestIO } from './io/test-io'
import { Machine } from './machine'

let machine: Machine

app.on('ready', () => {
  machine = new Machine(new TestIO())
  machine.start()

  ipcMain.on('open-devtools', () => {
    machine.window.openDevTools({ detach: true })
    if (machine.io instanceof TestIO) machine.io.window.openDevTools({ detach: true })
  })
})
