import { app, BrowserWindow, ipcRenderer } from 'electron'
import os = require('os')
import * as path from 'path'
import { ConfigLoader } from './config/config-loader'
import { IOConfig } from './config/io-config'
import { IO } from './io/io'

import { Drink } from './models/drink'
import { Job } from './models/job'
import { Liquid } from './models/liquid'
import { MixingJob } from './models/mixing-job'

export class Machine {

  /** The IO implementation the machine is using. */
  public io: IO

  /** The job the machine is currently working on. */
  public currentJob: Job

  /** The currently loaded drinks. */
  public drinks: { [id: string]: Drink }

  /** The currently loaded liquids. */
  public liquids: { [id: string]: Liquid }

  /** The valves associated with certain liquids. */
  public valves: { [key: string]: number }

  /** Guzzle's main window. */
  public window

  constructor(io: IO) {
    this.io = io
  }

  public async start() {
    this.window = new BrowserWindow({
      backgroundColor: '#fff',
      height: 800,
      resizable: false,
      show: false,
      width: 480,
    })
    this.window.on('closed', () => app.quit())
    this.window.setMenu(null)

    const configLoader = new ConfigLoader(path.join(os.homedir(), '.guzzle'))

    this.drinks = await configLoader.loadDrinks()
    const uiDrinks = Object.keys(this.drinks).map(id => {
      const drink = this.drinks[id] as any
      delete drink.steps
      drink.id = id
      return drink
    })
    this.window.loadURL(path.join('file://', __dirname, 'ui/screen.html'))
    this.window.once('ready-to-show', () => {
      this.window.show()
      this.window.webContents.send('register-drinks', uiDrinks)
    })

    const ioConfig = await configLoader.loadIOConfig()
    await this.io.setup(ioConfig)
    setInterval(this.tick.bind(this), 250)
  }

  public async tick() {
    if (this.isWorking()) this.currentJob.tick(this.io)
  }

  /** Start a new DrinkJob with the given drink. */
  public mix(drink: Drink) {
    this.currentJob = new MixingJob(drink)
  }

  /** Whether this machine is currently working on a job. */
  public isWorking(): boolean {
    return this.currentJob != null
  }

}
