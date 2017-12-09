import { IO } from '../io/io'

export interface MixingStep {

  /** The description of the mixing step. */
  getDescription(): string

  /** The current progress of this mixing step, a number between 0 and 1. */
  getProgress(): number

  /** Executes the mixing step and returns whether it's done. */
  execute(io: IO): Promise<boolean>

}
