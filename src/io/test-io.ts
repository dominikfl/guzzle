import { IO } from './io'

export class TestIO implements IO {

  /** The currently opened valves. */
  openedValves: Set<number>

  async getScaleWeight() {
    return Math.random()
  }

  async setValveOpened(id: number, opened: boolean) {
    opened ? this.openedValves.add(id) : this.openedValves.delete(id)
  }

  async isValveOpened(id: number) {
    return this.openedValves.has(id)
  }

  async setLedColor(red: number, green: number, blue: number) {
    console.log(`Set status LED color to (${red}, ${green}, ${blue}).`)
  }

}
