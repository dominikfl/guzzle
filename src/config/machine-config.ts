class LedConfig {

  /** The number of the red pin. */
  public redPin: number

  /** The number of the green pin. */
  public greenPin: number

  /** The number of the blue pin. */
  public bluePin: number

}

class ScaleConfig {

  /** The number of the clock (SCK) pin. */
  public clockPin: number

  /** The number of the data (DT) pin. */
  public dataPin: number

}

export class MachineConfig {

  /** The configuration of the status LED. */
  public led: LedConfig

  /** The configuration of the status LED. */
  public scale: ScaleConfig

}
