import { ipcMain, BrowserWindow } from 'electron'
import { promisify } from 'util'
import * as path from 'path'
import { IO } from './io'

export class TestIO implements IO {

  constructor() {
    this.window = new BrowserWindow({
      width: 350,
      height: 500,
      resizable: false,
      show: false,
      backgroundColor: '#fff'
    })

    this.window.once('ready-to-show', () => this.window.show())
    this.window.setMenu(null)
    this.window.loadURL(path.join('file://', __dirname, '../ui/testing.html'))

    this.window.on('closed', () => {
      this.window = null
    })
  }

  /** The "Testing Utility" window. */
  window

  /** The currently opened valves. */
  openValves: Set<number> = new Set()

  getScaleWeight(): Promise<number> {
    this.window.webContents.send('request-scale-value')
    return new Promise(resolve => {
      ipcMain.once('respond-with-scale-value', (event, arg) => resolve(arg))
    })
  }

  async setValveOpen(id: number, open: boolean) {
    open ? this.openValves.add(id) : this.openValves.delete(id)
    this.window.webContents.send('update-valve', { id, open })
  }

  async isValveOpen(id: number) {
    return this.openValves.has(id)
  }

  async setLedColor(red: number, green: number, blue: number) {
    console.log(`Set status LED color to (${red}, ${green}, ${blue}).`)
  }

}
