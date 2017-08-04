import { IO } from '../io/io'

export interface MixingStep {

  /** The description of the mixing step. */
  getDescription(): string

  /** Executes the mixing step and returns whether it's done. */
  execute(io: IO): boolean

}
