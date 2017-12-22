interface LED {

  /** The number of the red pin. */
  redPin: number

  /** The number of the green pin. */
  greenPin: number

  /** The number of the blue pin. */
  bluePin: number

}

interface Scale {

  /** The number of the clock (SCK) pin. */
  clockPin: number

  /** The number of the data (DT) pin. */
  dataPin: number

}

interface Valve {

  /** The liquid that is controlled by the valve. */
  liquid: string

  /** The pin of the valve's transistor. */
  pin: number

}

export class IOConfig {

  /** The configuration of the status LED. */
  public led: LED

  /** The configuration of the status LED. */
  public scale: Scale

  public valves: Valve[]

  constructor({ led, scale, valves }) {
    this.led = led
    this.scale = scale
    this.valves = valves
  }

}
