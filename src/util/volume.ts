const units = {
  ml: 1,
  dl: 10,
  cl: 100,
  l: 1000,
  tsp: 4.92892159375,
  tbsp: 14.78676478125,
  floz: 29.5735295625,
  cp: 236.5882365,
}

/** Parses a fluid volume with or without unit and returns it in milliliters. */
export function parseFluidVolume(input: string | number) {
  if (typeof input === 'number') return input
  if (input === '') throw new Error('No fluid volume specified!')

  const matches = input.match(/^(\d*\.?\d+)([a-z]+)?$/)
  if (!matches) throw new Error('Invalid format!')
  const parts = matches.slice(1)

  const value = parseFloat(parts[0])
  if (parts[1]) {
    const unit = parts[1]
    if (unit in units) {
      return value * units[unit]
    } else {
      throw new Error(`Invalid unit "${unit}"!`)
    }
  } else {
    return value
  }
}
