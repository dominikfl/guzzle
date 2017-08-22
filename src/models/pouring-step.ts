import { IO } from '../io/io'
import { MixingStep } from './mixing-step'
import { Liquid } from './liquid'

/** A mixing step implementation that pours liquids. */
export class PouringStep implements MixingStep {

  /** The liquid being poured by the step. */
  liquid: Liquid

  /** The amount of liquid being poured by this step in millilitres. */
  amount: number

  /** The weight of the entire drink at the start. */
  startWeight: number

  /** The current weight of the entire drink. */
  currentWeight: number

  constructor(liquid: Liquid, amount: number) {
    this.liquid = liquid
    this.amount = amount
  }

  execute(io: IO) {
    if(!('startWeight' in this)) this.startWeight = io.getScaleWeight()
    this.currentWeight = io.getScaleWeight()
    return this.currentWeight > this.getNeededWeight()
  }

  /** The needed weight based on the amount and the density of the liquid. */
  getNeededWeight() {
    return this.amount * this.liquid.density
  }

  getDescription() {
    return `Pouring ${this.liquid.name} ...`
  }

  getProgress() {
    return Math.max(this.currentWeight / this.getNeededWeight(), 1)
  }

}
