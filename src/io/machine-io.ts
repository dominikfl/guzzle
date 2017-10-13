import * as rpiGpio from 'rpi-gpio'
import { promisify } from 'util'

import { IO } from './io'
import { MachineConfig } from '../config/machine-config'

 /** Promisified version of rpi-gpio. */
const gpio = {
  destroy: promisify(rpiGpio.destroy),
  setup: promisify(rpiGpio.setup),
  read: promisify(rpiGpio.read),
  write: promisify(rpiGpio.write)
}

export class MachineIO implements IO {

  constructor(private config: MachineConfig) {}

  async setup() {
    // Remove all GPIO bindings
    await gpio.destroy()

    // Set the LED pins up
    const led = this.config.led
    await gpio.setup(led.redPin, null)
    await gpio.setup(led.greenPin, null)
    await gpio.setup(led.bluePin, null)

    // TODO: Set the HX711 sensor up
  }

  async getScaleWeight() {
    // TODO: Read weight from HX711 sensor
    return 0
  }

  async setValveOpened(id: number, opened: boolean) {
    // TODO: Write to the valve's pin
    return
  }

  async isValveOpened(id: number) {
    // TODO: Read from the valve's pin
    return false
  }

  async setLedColor(red: number, green: number, blue: number) {
    const led = this.config.led
    await gpio.write(led.redPin, red)
    await gpio.write(led.greenPin, green)
    await gpio.write(led.bluePin, blue)
  }

}
