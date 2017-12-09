import * as path from 'path'
import { ipcRenderer, BrowserWindow, app } from 'electron'
import { IO } from './io/io'

import { Job } from './models/job'
import { MixingJob } from './models/mixing-job'
import { Drink } from './models/drink'
import { Liquid } from './models/liquid'

export default class Machine {

  /** The IO implementation the machine is using. */
  io: IO

  /** The job the machine is currently working on. */
  currentJob: Job

  /** The valves associated with certain liquids. */
  valves: { [key: string]: number }

  constructor(io: IO) {
    this.io = io

    this.window = new BrowserWindow({
      width: 480,
      height: 800,
      resizable: false,
      show: false,
      backgroundColor: '#fff'
    })

    this.window.once('ready-to-show', () => this.window.show())
    this.window.setMenu(null)
    this.window.loadURL(path.join('file://', __dirname, 'ui/main.html'))

    this.window.on('closed', () => app.quit())

    setInterval(this.tick.bind(this), 250)
  }

  /** Guzzle's main window. */
  window

  async tick() {
    if(this.isWorking()) this.currentJob.tick(this.io)
  }

  /** Start a new DrinkJob with the given drink. */
  mix(drink: Drink) {
    this.currentJob = new MixingJob(drink)
  }

  /** Whether this machine is currently working on a job. */
  isWorking(): boolean {
    return this.currentJob != null
  }

}
