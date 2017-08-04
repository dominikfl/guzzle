import { IO } from './io/io'

import { Job } from './models/job'
import { MixingJob } from './models/mixing-job'
import { Drink } from './models/drink'

export class Machine {

  io: IO
  currentJob: Job

  constructor(io: IO) {
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

export default Machine
