import path = require('path')
import fs = require('fs-extra')
import yaml = require('js-yaml')

import { Drink } from '../models/drink'
import { Liquid } from '../models/liquid'
import { MixingStep } from '../models/mixing-step'
import { PouringStep } from '../models/pouring-step'

export class ConfigLoader {

  constructor(private path: string) {
    if(!fs.pathExistsSync(path)) {
      this.generateExamples()
    }
  }

  /** Generates default config files. */
  async generateExamples() {
    try {
      fs.mkdirSync(this.path)

      const liquidsPath = path.join(this.path, 'liquids')
      fs.mkdirSync(liquidsPath)

      const drinksPath = path.join(this.path, 'drinks')
      fs.mkdirSync(drinksPath)

      const water = {
        name: 'Water',
        density: 1
      }
      fs.writeFileSync(path.join(liquidsPath, 'water.yml'), yaml.dump(water))

      const deluxeWater = {
        name: 'Deluxe Water',
        description: "Deluxe water, for the cool kids.",
        color: '#42A5F5',
        steps: [{
          type: 'pour',
          liquid: 'water',
          amount: 300
        }]
      }
      fs.writeFileSync(path.join(drinksPath, 'deluxe-water.yml'), yaml.dump(deluxeWater))

      const boringWater = {
        name: 'Boring Water',
        description: "I'm so boring, everyone will laugh at you for buying me.",
        color: '#63aae3',
        steps: [{
          type: 'pour',
          liquid: 'water',
          amount: 299
        }]
      }
      fs.writeFileSync(path.join(drinksPath, 'boring-water.yml'), yaml.dump(boringWater))

      console.log('Default configuration files were successfully generated!')
    } catch(error) {
      console.log('There was an error generating the default configuration files.', error)
    }
  }

  /** Asynchronously loads the drinks from the `/drinks` directory. */
  async loadDrinks(): Promise<Array<Drink>> {
    const drinks: Array<Drink> = []

    const drinksPath = path.join(this.path, 'drinks')
    const fileNames = await fs.readdir(drinksPath)
    for(let fileName of fileNames) {
      const filePath = path.join(drinksPath, fileName)
      const fileContents = await fs.readFile(filePath, 'utf-8')

      const object = yaml.load(fileContents)
      const steps: any = await Promise.all(object.steps.map(async (step): Promise<MixingStep> =>
        this.parseMixingStep(step)))
      const drink = new Drink(object.name,
                              object.description,
                              object.color,
                              steps)
      drinks.push(drink)
    }
    return drinks
  }

  /** Asynchronously parses a mixing step from an object. */
  async parseMixingStep(object: any): Promise<MixingStep> {
    switch(object.type) {
      case 'pour':
        return new PouringStep(await this.loadLiquid(object.liquid),
                               object.amount)
    }
  }

  /** Asynchronously loads a liquid with a give file name. */
  async loadLiquid(id: string): Promise<Liquid> {
    const liquidsPath = path.join(this.path, 'liquids')
    const filePath = path.join(liquidsPath, id + '.yml')
    const fileContents = await fs.readFile(filePath, 'utf-8')

    const object = yaml.load(fileContents)
    return new Liquid(object.name, object.density)
  }

}
