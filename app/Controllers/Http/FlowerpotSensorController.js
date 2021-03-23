'use strict'

const FlowerpotSensor = use('App/Models/FlowerpotSensor')
const Database = use('Database')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with flowerpotsensors
 */
class FlowerpotSensorController {
  /**
   * Show a list of all flowerpotsensors.
   * GET flowerpotsensors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({request, response, view}) {
    try {
      const data = await FlowerpotSensor.all();
      return response.status(200).json(data);
    } catch (e) {
      return response.status(400).send({'Error': e});
    }
  }

  /**
   * Render a form to be used for creating a new flowerpotsensor.
   * GET flowerpotsensors/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({request, response, view}) {
    const rules =
      {
        IDFlowerpot: 'required|integer',
        IDSensor: 'required|integer'
      }
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      return validation.messages()
    } else {
      try {
        const {IDFlowerpot, IDSensor} = request.only([
          'IDFlowerpot',
          'IDSensor'
        ])
        const flowerpot = await FlowerpotSensor.create({
          IDFlowerpot,
          IDSensor
        })
        return response.status(201).json(flowerpot)
      } catch (e) {
        return response.status(400).send({'Error': e});
      }
    }
  }

  /**
   * Create/save a new flowerpotsensor.
   * POST flowerpotsensors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({request, response}) {
  }

  /**
   * Display a single flowerpotsensor.
   * GET flowerpotsensors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({request, response, view}) {
    try {
      const {id} = request.only(['id'])
      const flowerpot = await Database.select('*').from('flowerpot_sensors').where({IDFlowerpot: id})
      const data = []
      for (const i of flowerpot.toJSON()) {
        const flowerpots = await Database.select('*').from('flowerpots').where({id: i.IDFlowerpot})
        const sensors = await Database.select('*').from('sensors').where({id: i.IDSensor})
        const object = {flowerpots,sensors}
        data.push(object)
      }
      return response.status(200).json(data)
    } catch (e) {
      return response.status(404).send({'Error': e.toString()});
    }
  }

  /**
   * Render a form to update an existing flowerpotsensor.
   * GET flowerpotsensors/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({params, request, response, view}) {
  }

  /**
   * Update flowerpotsensor details.
   * PUT or PATCH flowerpotsensors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({params, request, response}) {
  }

  /**
   * Delete a flowerpotsensor with id.
   * DELETE flowerpotsensors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({request, response}) {
    try {
      const {id} = request.only(['id'])
      const flowerpotsensor = await FlowerpotSensor.findBy('id', id)
      await flowerpotsensor.delete();
      return response.status(204).send({message: 'flowerpots has been deleted'});
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }
}

module.exports = FlowerpotSensorController
