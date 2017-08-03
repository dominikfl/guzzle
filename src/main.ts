import { app, BrowserWindow } from 'electron'
import path = require('path')

import { TestIO } from './io/test-io'
let win

global.io = new TestIO()

app.on('ready', () => {
  win = new BrowserWindow({
    width: 800,
    height: 480
  })

  win.loadURL(path.join('file://', __dirname, 'ui/index.html'))

  win.on('closed', () => {
    win = null
  })
})
