import { Job } from './job'
import { MixingStep } from './mixing-step'
import { Drink } from './drink'

/** The job implementation that handles mixing drinks. */
export class MixingJob implements Job {

  /** The drink being mixed by the job. */
  drink: Drink

  /** The steps the job is handling. */
  steps: Array<MixingStep>

  constructor(drink: Drink) {
    this.steps = drink.steps
  }

  /** The step the job is currently working on. **/
  getCurrentStep() {
    return this.steps[0]
  }

  tick(io) {
    if(this.getCurrentStep().execute(io)) this.steps.shift()
  }

  getProgress() {
    const totalSteps = this.drink.steps.length
    const doneSteps = totalSteps - this.steps.length
    const currentStepProgress = this.getCurrentStep().getProgress()
    return doneSteps / totalSteps + (currentStepProgress / totalSteps)
  }

  getTitle() {
    return `Mixing ${this.drink.name} ...`
  }

  getDescription() {
    return this.getCurrentStep().getDescription()
  }

}
