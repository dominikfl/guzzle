import path = require('path')
import fs = require('fs')
import yaml = require('js-yaml')

import { Drink } from '../models/drink'
import { Liquid } from '../models/liquid'
import { MixingStep } from '../models/mixing-step'
import { PouringStep } from '../models/pouring-step'

export class ConfigLoader {

  constructor(private path: string) {}

  /** Loads the drinks from the `/drinks` directory. */
  loadDrinks(): Array<Drink> {
    const drinks: Array<Drink> = []

    const drinksPath = path.join(this.path, 'drinks')
    const fileNames = fs.readdirSync(drinksPath)
    for(let fileName of fileNames) {
      const filePath = path.join(drinksPath, fileName)
      const fileContents = fs.readFileSync(filePath, 'utf-8')

      const object = yaml.load(fileContents)
      const drink = new Drink(object.name,
                              object.description,
                              object.color,
                              object.steps.map((step: any) => this.parseMixingStep(step)))
      drinks.push(drink)
    }
    return drinks
  }

  /** Parses a mixing step from an object. */
  parseMixingStep(object: any): MixingStep {
    switch(object.type) {
      case 'pour':
        return new PouringStep(this.loadLiquid(object.liquid),
                               object.amount)
    }
  }

  /** Loads a liquid with a give file name. */
  loadLiquid(id: string): Liquid {
    const liquidsPath = path.join(this.path, 'liquids')
    const filePath = path.join(liquidsPath, id + '.yml')
    const fileContents = fs.readFileSync(filePath, 'utf-8')

    const object = yaml.load(fileContents)
    return new Liquid(object.name, object.density)
  }

}
