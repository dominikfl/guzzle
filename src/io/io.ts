export interface IO {

  /** The current weight on the scale. */
  getScaleWeight(): number

  /** Open or close a valve. */
  setValveOpened(id: number, opened: boolean): void

  /** Whether a valve is opened. */
  isValveOpened(id: number): boolean

  /** Sets the color of the status LED. */
  setLedColor(red: number, green: number, blue: number): void

}
