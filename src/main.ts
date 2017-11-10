import { app, BrowserWindow } from 'electron'
import path = require('path')

import Machine from './machine'
import { TestIO } from './io/test-io'

let mainWin: any
let testWin: any

const machine = new Machine(new TestIO())

app.on('ready', () => {
  openMainWindow()
  openTestingWindow()
})

function openMainWindow() {
  mainWin = new BrowserWindow({
    width: 480,
    height: 800,
    resizable: false,
    show: false,
    backgroundColor: '#fff'
  })

  mainWin.once('ready-to-show', () => mainWin.show())
  mainWin.setMenu(null)
  mainWin.loadURL(path.join('file://', __dirname, 'ui/index.html'))
  mainWin.openDevTools({ detach: true })

  mainWin.on('closed', () => {
    app.quit()
  })
}

function openTestingWindow() {
  testWin = new BrowserWindow({
    width: 300,
    height: 500,
    resizable: false,
    show: false,
    backgroundColor: '#fff'
  })

  testWin.once('ready-to-show', () => testWin.show())
  testWin.setMenu(null)
  testWin.loadURL(path.join('file://', __dirname, 'ui/testing.html'))
  testWin.openDevTools({ detach: true })

  testWin.on('closed', () => {
    testWin = null
  })
}
