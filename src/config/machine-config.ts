class LedConfig {

  /** The number of the red pin. */
  redPin: number

  /** The number of the green pin. */
  greenPin: number

  /** The number of the blue pin. */
  bluePin: number

}

class ScaleConfig {

  /** The number of the clock (SCK) pin. */
  clockPin: number

  /** The number of the data (DT) pin. */
  dataPin: number

}

export class MachineConfig {

  /** The configuration of the status LED. */
  led: LedConfig

  /** The configuration of the status LED. */
  scale: ScaleConfig

}
