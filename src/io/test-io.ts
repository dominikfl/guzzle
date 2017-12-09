import { BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import { promisify } from 'util'
import { IO } from './io'

export class TestIO implements IO {

  /** The "Testing Utility" window. */
  public window

  /** The currently opened valves. */
  private openValves: Set<number> = new Set()

  constructor() {
    this.window = new BrowserWindow({
      width: 350,
      height: 500,
      resizable: false,
      show: false,
      backgroundColor: '#fff',
    })

    this.window.once('ready-to-show', () => this.window.show())
    this.window.setMenu(null)
    this.window.loadURL(path.join('file://', __dirname, '../ui/testing.html'))

    this.window.on('closed', () => {
      this.window = null
    })
  }

  public getScaleWeight(): Promise<number> {
    this.window.webContents.send('request-scale-value')
    return new Promise(resolve => {
      ipcMain.once('respond-with-scale-value', (event, arg) => resolve(arg))
    })
  }

  public async setValveOpen(id: number, open: boolean) {
    open ? this.openValves.add(id) : this.openValves.delete(id)
    this.window.webContents.send('update-valve', { id, open })
  }

  public async isValveOpen(id: number) {
    return this.openValves.has(id)
  }

  public async setLedColor(red: number, green: number, blue: number) {
    console.log(`Set status LED color to (${red}, ${green}, ${blue}).`)
  }

}
