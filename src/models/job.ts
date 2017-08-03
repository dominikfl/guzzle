import { IO } from '../io/io'

export interface Job {

  /** Do one job tick, should be called every half second. */
  tick(io: IO): void

  /** The current progress of the job, a number between 0 and 1. */
  getProgress(): number

  /** The title of the job. **/
  getTitle(): string

  /** A description of what the job is currently doing. */
  getDescription(): string

}
