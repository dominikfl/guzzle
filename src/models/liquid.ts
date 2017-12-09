export class Liquid {

  /** The name of the liquid. */
  public name: string

  /** The physical density of the liquid. */
  public density: number

  constructor(name: string, density: number) {
    this.name = name
    this.density = density
  }

}
