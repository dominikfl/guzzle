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
    setInterval(this.tick.bind(this), 250)
  }

  tick() {
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
