import fs = require('fs-extra')
import yaml = require('js-yaml')
import path = require('path')

import { parseFluidVolume } from '../util/volume'

import { Drink } from '../models/drink'
import { Liquid } from '../models/liquid'
import { MixingStep } from '../models/mixing-step'
import { PouringStep } from '../models/pouring-step'

export class ConfigLoader {

  constructor(private directory: string) {
    if (!fs.pathExistsSync(directory)) {
      this.generateExamples()
    }
  }

  /** Generates default config files. */
  public async generateExamples() {
    try {
      fs.mkdirSync(this.directory)

      const liquidsPath = path.join(this.directory, 'liquids')
      fs.mkdirSync(liquidsPath)

      const drinksPath = path.join(this.directory, 'drinks')
      fs.mkdirSync(drinksPath)

      const water = {
        name: 'Water',
        density: 1,
      }
      fs.writeFileSync(path.join(liquidsPath, 'water.yml'), yaml.dump(water))

      const deluxeWater = {
        name: 'Deluxe Water',
        description: 'Deluxe water, for the cool kids.',
        color: '#42A5F5',
        steps: [{
          type: 'pour',
          liquid: 'water',
          amount: '300ml',
        }],
      }
      fs.writeFileSync(path.join(drinksPath, 'deluxe-water.yml'), yaml.dump(deluxeWater))

      const boringWater = {
        name: 'Boring Water',
        description: "I'm so boring, everyone will laugh at you for buying me.",
        color: '#63aae3',
        steps: [{
          type: 'pour',
          liquid: 'water',
          amount: '299ml',
        }],
      }
      fs.writeFileSync(path.join(drinksPath, 'boring-water.yml'), yaml.dump(boringWater))

      console.log('Default configuration files were successfully generated!')
    } catch (error) {
      console.log('There was an error generating the default configuration files.', error)
    }
  }

  /** Asynchronously loads the drinks from the `/drinks` directory. */
  public async loadDrinks(): Promise<Drink[]> {
    const drinks: Drink[] = []

    const drinksPath = path.join(this.directory, 'drinks')
    const fileNames = await fs.readdir(drinksPath)
    for (const fileName of fileNames) {
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
  public async parseMixingStep(object: any): Promise<MixingStep> {
    switch (object.type) {
      case 'pour':
        return new PouringStep(await this.loadLiquid(object.liquid),
                               parseFluidVolume(object.amount))
    }
  }

  /** Asynchronously loads a liquid with a give file name. */
  public async loadLiquid(id: string): Promise<Liquid> {
    const liquidsPath = path.join(this.directory, 'liquids')
    const filePath = path.join(liquidsPath, id + '.yml')
    const fileContents = await fs.readFile(filePath, 'utf-8')

    const object = yaml.load(fileContents)
    return new Liquid(object.name, object.density)
  }

}
