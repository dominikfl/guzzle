export interface IO {

  /** The current weight on the scale. */
  getScaleWeight(): Promise<number>

  /** Open or close a valve. */
  setValveOpened(id: number, opened: boolean): Promise<void>

  /** Whether a valve is opened. */
  isValveOpened(id: number): Promise<boolean>

  /** Sets the color of the status LED. */
  setLedColor(red: number, green: number, blue: number): Promise<void>

}
