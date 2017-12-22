import { BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import { promisify } from 'util'
import { IOConfig } from '../config/io-config'
import { IO } from './io'

export class TestIO implements IO {

  /** The "Testing Utility" window. */
  public window

  /** The currently opened valves. */
  private openValves: Set<number> = new Set()

  /** The current scale weight. */
  private scaleWeight: number = 0

  public setup(config) {
    return new Promise<void>(resolve => {
      this.window = new BrowserWindow({
        width: 350,
        height: 500,
        resizable: false,
        show: false,
        backgroundColor: '#fff',
      })

      this.window.once('ready-to-show', () => {
        this.window.show()
        this.registerComponents(config)
        resolve()
      })
      this.window.setMenu(null)
      this.window.loadURL(path.join('file://', __dirname, '../ui/testing.html'))
      this.window.on('closed', () => this.window = null)

      ipcMain.on('update-input-value',  (event, { reference, value }) => {
        if (reference === 'scale') this.scaleWeight = value
      })
    })
  }

  public async getScaleWeight(): Promise<number> {
    return this.scaleWeight
  }

  public async setValveOpen(id: number, open: boolean) {
    open ? this.openValves.add(id) : this.openValves.delete(id)
    this.setOutputValue('valve' + id, open ? 'Open' : 'Closed')
  }

  public async isValveOpen(id: number) {
    return this.openValves.has(id)
  }

  public async setLedColor(red: number, green: number, blue: number) {
    console.log(`Set status LED color to (${red}, ${green}, ${blue}).`)
  }

  private registerComponents(config: IOConfig) {
    this.registerComponent('scale', {
      icon: 'scale',
      name: 'Scale',
      value: 0,
      input: {
        type: 'numeric',
        min: 0,
        suffix: ' g',
      },
    })

    for (const valveId in config.valves) {
      const valve = config.valves[valveId]
      this.registerComponent('valve' + valveId, {
        icon: 'water',
        name: `Valve ${valveId} (${valve.liquid})`,
        value: 'Closed',
      })
    }
  }

  private registerComponent(reference, options) {
    this.sendToWindow('register-component', { reference, options })
  }

  private setOutputValue(reference, value) {
    this.sendToWindow('update-output-value', { reference, value })
  }

  private sendToWindow(channel, parameter) {
    this.window.webContents.send(channel, parameter)
  }

}
