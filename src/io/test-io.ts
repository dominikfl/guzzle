import { IO } from './io'

export class TestIO implements IO {

  /** The currently opened valves. */
  openedValves: Set<number>

  getScaleWeight() {
    return Math.random()
  }

  setValveOpened(id: number, opened: boolean) {
    opened ? this.openedValves.add(id) : this.openedValves.delete(id)
  }

  isValveOpened(id: number) {
    return this.openedValves.has(id)
  }

  setLedColor(red: number, green: number, blue: number) {
    console.log(`Set status LED color to (${red}, ${green}, ${blue}).`)
  }

}
