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
    await gpio.setup(led.redPin)
    await gpio.setup(led.greenPin)
    await gpio.setup(led.bluePin)

    // Set the HX711 sensor up
    const scale = this.config.scale
    await gpio.setup(scale.clockPin)
    await gpio.setup(scale.dataPin, rpiGpio.DIR_IN)
  }

  async getScaleWeight() {
    // TODO: Read weight from HX711 sensor
    return 0
  }

  /** Shifts in a byte of data one bit at a time. */
  async shiftIn(dataPin: number, clockPin: number, order: number) {
    let value = 0

    if(order == 0) {
      for(let i = 7; i >= 0; --i) {
        gpio.write(clockPin, rpiGpio.DIR_HIGH)
        value |= await gpio.read(dataPin) << i
        gpio.write(clockPin, rpiGpio.DIR_LOW)
      }
    } else {
      for (let i = 0; i < 8; ++i) {
        gpio.write(clockPin, rpiGpio.DIR_HIGH)
        value |= await gpio.read(dataPin) << i
        gpio.write(clockPin, rpiGpio.DIR_LOW)
      }
    }

    return value
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
