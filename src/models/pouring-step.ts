import { IO } from '../io/io'
import { Liquid } from './liquid'
import { MixingStep } from './mixing-step'

/** A mixing step implementation that pours liquids. */
export class PouringStep implements MixingStep {

  /** The liquid being poured by the step. */
  public liquid: Liquid

  /** The amount of liquid being poured by this step in millilitres. */
  public amount: number

  /** The weight of the entire drink at the start. */
  private startWeight: number

  /** The current weight of the entire drink. */
  private currentWeight: number

  constructor(liquid: Liquid, amount: number) {
    this.liquid = liquid
    this.amount = amount
  }

  public async execute(io: IO) {
    if (!('startWeight' in this)) this.startWeight = await io.getScaleWeight()
    this.currentWeight = await io.getScaleWeight()
    return this.currentWeight > this.getNeededWeight()
  }

  public getDescription() {
    return `Pouring ${this.liquid.name} ...`
  }

  public getProgress() {
    return Math.max(this.currentWeight / this.getNeededWeight(), 1)
  }

  /** The needed weight based on the amount and the density of the liquid. */
  private getNeededWeight() {
    return this.amount * this.liquid.density
  }

}
