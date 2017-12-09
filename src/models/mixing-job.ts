import { IO } from '../io/io'
import { Drink } from './drink'
import { Job } from './job'
import { MixingStep } from './mixing-step'

/** The job implementation that handles mixing drinks. */
export class MixingJob implements Job {

  /** The drink being mixed by the job. */
  public drink: Drink

  /** The steps the job is handling. */
  public steps: MixingStep[]

  constructor(drink: Drink) {
    this.steps = drink.steps
  }

  /** The step the job is currently working on. */
  public getCurrentStep() {
    return this.steps[0]
  }

  public tick(io: IO) {
    if (this.getCurrentStep().execute(io)) this.steps.shift()
  }

  public getProgress() {
    const totalSteps = this.drink.steps.length
    const doneSteps = totalSteps - this.steps.length
    const currentStepProgress = this.getCurrentStep().getProgress()
    return doneSteps / totalSteps + (currentStepProgress / totalSteps)
  }

  public getTitle() {
    return `Mixing ${this.drink.name} ...`
  }

  public getDescription() {
    return this.getCurrentStep().getDescription()
  }

}
