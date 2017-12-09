import { MixingStep } from './mixing-step'
import { PouringStep } from './pouring-step'

export class Drink {

  /** The displayed name of the drink. */
  public name: string

  /** The displayed description of the drink. */
  public description: string

  /** The displayed color of the drink. */
  public color: string

  /** The steps required to mix this drink. */
  public steps: MixingStep[]

  constructor(name: string,
              description: string,
              color: string,
              steps: MixingStep[]) {
    this.name = name
    this.description = description
    this.color = color
    this.steps = steps
  }

}
