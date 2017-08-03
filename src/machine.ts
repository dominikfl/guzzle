import { IO } from './io/io'

import { Job } from './models/job'
import { MixingJob } from './models/mixing-job'
import { Drink } from './models/drink'

export class Machine {

  currentJob: Job

  constructor(io: IO) {
    global.io = io
  }

}

export default Machine
