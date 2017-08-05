import { app, BrowserWindow } from 'electron'
import path = require('path')

import Machine from './machine'
import { TestIO } from './io/test-io'
let win: any

const machine = new Machine(new TestIO())

app.on('ready', () => {
  win = new BrowserWindow({
    width: 480,
    height: 800,
    resizable: false,
    show: false,
    backgroundColor: '#fff'
  })

  win.once('ready-to-show', () => win.show())
  win.setMenu(null)
  win.loadURL(path.join('file://', __dirname, 'ui/index.html'))
  win.openDevTools({ detach: true })

  win.on('closed', () => {
    win = null
  })
})
