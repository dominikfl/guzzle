import { IOConfig } from '../config/io-config'

export interface IO {

  /** Prepares some stuff for the IO to work. */
  setup(config: IOConfig): Promise<void>

  /** The current weight on the scale. */
  getScaleWeight(): Promise<number>

  /** Open or close a valve. */
  setValveOpen(id: number, opened: boolean): Promise<void>

  /** Whether a valve is open. */
  isValveOpen(id: number): Promise<boolean>

  /** Sets the color of the status LED. */
  setLedColor(red: number, green: number, blue: number): Promise<void>

}
