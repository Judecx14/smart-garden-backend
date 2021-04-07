'use strict'

const Flowerpot = use('App/Models/Flowerpot')
const Measurement = use('App/Models/Measurements')
const Database = use('Database')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with flowerpots
 */
class FlowerpotController {
  /**
   * Show a list of all flowerpots.
   * GET flowerpots
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({request, response, view}) {
    try {
      const data = await Flowerpot.all();
      return response.status(200).json(data);
    } catch (e) {
      return response.status(400).send({'Error': e});
    }
  }

  /**
   * Render a form to be used for creating a new flowerpot.
   * GET flowerpots/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({request, response, view}) {
    const rules =
      {
        name: 'required|string',
        spice: 'required|string',
        garden: 'required|integer',
        category: 'required|string'
      }
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      return validation.messages()
    } else {
      try {
        const {name, spice, garden, category} = request.only([
          'name',
          'spice',
          'garden',
          'category'
        ])
        const flowerpot = await Flowerpot.create({
          name,
          spice,
          garden,
          category
        })
        return response.status(201).json(flowerpot)
      } catch (e) {
        return response.status(400).send({'Error': e});
      }
    }
  }

  /**
   * Create/save a new flowerpot.
   * POST flowerpots
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({request, response}) {
  }

  /**
   * Display a single flowerpot.
   * GET flowerpots/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({request, response, view}) {
    try {
      const {id} = request.only(['id'])
      const flowerpot = await Flowerpot.findBy('id', id)
      const res = {
        name: flowerpot.name,
        spice: flowerpot.spice,
        garden: flowerpot.garden,
        category: flowerpot.category,
      }
      return response.status(200).json(res)
    } catch (e) {
      return response.status(404).send({'Error': e.toString()});
    }
  }

  async showFlowerpotSensor({request, response, view}) {
    try {
      const {id} = request.only(['id'])
      const flowerpot = await Database.select('*').from('flowerpots').where({id: id})
      const fl = await Database.select('*').from('flowerpot_sensors').where({IDFlowerpot: id})
      const sensors = []
      for (const i of fl) {
        const sensor = await Database.select('*').from('sensors').where({id: i.IDSensor})
        console.log(i.IDSensor)
        const measure = await Measurement.find({IDSensor: i.IDSensor}).exec()
        const res = {sensor, measure}
        sensors.push(res)
      }
      const data = {flowerpot, sensors}
      return response.status(200).json(data);
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }

  /**
   * Display flowerpot by name.
   * GET flowerpots
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async showByName({request, response}) {
    try {
      const name = request.input('name')
      const data = await Database.select('*').from('flowerpots').where({name: name})
      return response.status(200).json(data)
    } catch (e) {
      return response.status(404).send({message: e.toString})
    }
  }

  /**
   * Display flowerpot by category.
   * GET flowerpots
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async showByType({request, response}) {
    try {
      const category = request.input('category')
      const data = await Database.select('*').from('flowerpots').where({category: category})
      return response.status(200).json(data)
    } catch (e) {
      return response.status(404).send({message: e.toString})
    }
  }

  /**
   * Display flowerpot by category.
   * GET flowerpots
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async showByGarden({request, response}) {
    try {
      const garden = request.input('garden')
      const data = await Database.select('*').from('flowerpots').where({garden: garden})
      return response.status(200).json(data)
    } catch (e) {
      return response.status(404).send({message: e.toString})
    }
  }

  /**
   * Render a form to update an existing flowerpot.
   * GET flowerpots/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({params, request, response, view}) {
  }

  /**
   * Update flowerpot details.
   * PUT or PATCH flowerpots/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({request, response}) {
    try {
      const {id} = request.only(['id'])
      const data = request.only(['name', 'spice', 'garden', 'category']);
      const flowerpot = await Flowerpot.findBy('id', id)
      flowerpot.name = data.name;
      flowerpot.spice = data.spice;
      flowerpot.garden = data.garden;
      flowerpot.category = data.category;
      await flowerpot.save();
      return response.status(200).json(flowerpot);
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }

  /**
   * Delete a flowerpot with id.
   * DELETE flowerpots/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({request, response}) {
    try {
      const {id} = request.only(['id'])
      const flowerpot = await Flowerpot.findBy('id', id)
      await flowerpot.delete();
      return response.status(204).send({message: 'Flowerpot has been deleted'});
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }
}

module.exports = FlowerpotController
