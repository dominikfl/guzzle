import { app, BrowserWindow, ipcMain } from 'electron'
import path = require('path')

import Machine from './machine'
import { TestIO } from './io/test-io'

let machine

app.on('ready', () => {
  machine = new Machine(new TestIO())

  ipcMain.on('open-devtools', () => {
    machine.window.openDevTools({ detach: true })
    if(machine.io.window) machine.io.window.openDevTools({ detach: true })
  })
})
