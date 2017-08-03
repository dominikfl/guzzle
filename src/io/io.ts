export interface IO {

  /**
   * Reads and returns the current weight on the scale.
   * @return {number} the current scale weight
   */

  readScale(): number

}
