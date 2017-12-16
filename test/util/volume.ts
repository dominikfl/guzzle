import { expect } from 'chai'
import * as mocha from 'mocha'
import { parseFluidVolume } from '../../src/util/volume'

describe('The `parseFluidVolume()` function', () => {
  it('should return a number', () =>
  expect(parseFluidVolume('1')).to.be.a('number'))

  it('should return the value unchanged if a number is passed in', () =>
  expect(parseFluidVolume(1)).to.equal(1))

  it('should return the value unchanged if no unit is specified', () =>
  expect(parseFluidVolume('1')).to.equal(1))

  describe('should correctly parse', () => {
    it('milliliters (ml)', () =>
    expect(parseFluidVolume('1ml')).to.equal(1))

    it('deciliters (dl)', () =>
    expect(parseFluidVolume('1dl')).to.equal(10))

    it('centiliters (cl)', () =>
    expect(parseFluidVolume('1cl')).to.equal(100))

    it('liters (l)', () =>
    expect(parseFluidVolume('1l')).to.equal(1000))

    it('teaspoons (tsp)', () =>
    expect(parseFluidVolume('1tsp')).to.equal(4.92892159375))

    it('tablespoons (tbsp)', () =>
    expect(parseFluidVolume('1tbsp')).to.equal(14.78676478125))

    it('fluid ounces (floz)', () =>
    expect(parseFluidVolume('1floz')).to.equal(29.5735295625))

    it('cups (cp)', () =>
    expect(parseFluidVolume('1cp')).to.equal(236.5882365))
  })

  it('should throw an error when the string is empty', () =>
  expect(parseFluidVolume.bind(null, '')).to.throw(Error, 'No fluid volume specified!'))

  it('should throw an error when an invalid unit is specified', () =>
  expect(parseFluidVolume.bind(null, '1lol')).to.throw(Error, 'Invalid unit "lol"!'))

  it('should throw an error when the format is invalid', () =>
  expect(parseFluidVolume.bind(null, '1nv4l1d')).to.throw(Error, 'Invalid format!'))
})
