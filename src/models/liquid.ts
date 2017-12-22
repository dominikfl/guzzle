export class Liquid {

  /** The ID of the liquid, inferred through the filename. */
  public id: string

  /** The name of the liquid. */
  public name: string

  /** The physical density of the liquid. */
  public density: number

  constructor(id: string, name: string, density: number) {
    this.id = id
    this.name = name
    this.density = density
  }

}
