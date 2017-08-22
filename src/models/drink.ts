import { MixingStep } from './mixing-step'
import { PouringStep } from './pouring-step'

export class Drink {

  /** The displayed name of the drink. */
  name: string

  /** The displayed description of the drink. */
  description: string

  /** The displayed color of the drink. */
  color: string

  /** The steps required to mix this drink. */
  steps: Array<MixingStep>

}
