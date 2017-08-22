export class Liquid {

  constructor(name: string, density: number) {
    this.name = name
    this.density = density
  }

  /** The name of the liquid. */
  name: string

  /** The physical density of the liquid. */
  density: number

}
