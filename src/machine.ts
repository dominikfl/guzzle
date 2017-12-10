import { app, BrowserWindow, ipcRenderer } from 'electron'
import * as path from 'path'
import { IO } from './io/io'

import { Drink } from './models/drink'
import { Job } from './models/job'
import { Liquid } from './models/liquid'
import { MixingJob } from './models/mixing-job'

export default class Machine {

  /** The IO implementation the machine is using. */
  public io: IO

  /** The job the machine is currently working on. */
  public currentJob: Job

  /** The valves associated with certain liquids. */
  public valves: { [key: string]: number }

  /** Guzzle's main window. */
  public window

  constructor(io: IO) {
    this.io = io

    this.window = new BrowserWindow({
      backgroundColor: '#fff',
      height: 800,
      resizable: false,
      show: false,
      width: 480,
    })

    this.window.once('ready-to-show', () => this.window.show())
    this.window.setMenu(null)
    this.window.loadURL(path.join('file://', __dirname, 'ui/screen.html'))

    this.window.on('closed', () => app.quit())

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
