import { MixingStep } from './mixing-step'
import { PouringStep } from './pouring-step'

export class Drink {

  constructor(name: string,
              description: string,
              color: string,
              steps: Array<MixingStep>) {
    this.name = name
    this.description = description
    this.color = color
    this.steps = steps
  }

  /** The displayed name of the drink. */
  name: string

  /** The displayed description of the drink. */
  description: string

  /** The displayed color of the drink. */
  color: string

  /** The steps required to mix this drink. */
  steps: Array<MixingStep>

}
