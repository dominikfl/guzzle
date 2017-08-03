import { MixingStep } from './mixing-step'
import { Liquid } from './liquid'

/** A mixing step implementation that pours liquids. */
export class PouringStep implements MixingStep {

  /** The liquid being poured by the step. */
  liquid: Liquid

  /** The amount of liquid being poured by this step in grams. */
  amount: number

  pouredAmount = 0

  constructor(liquid: Liquid, amount: number) {}

  execute() {
    return false
  }

  getDescription() {
    return `Pouring ${this.liquid.name} ...`
  }

}
