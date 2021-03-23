'use strict'

const Sensor = use('App/Models/Sensor')
const Measurement = use('App/Models/Measurements')
const Database = use('Database')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with sensors
 */
class SensorController {
  /**
   * Show a list of all sensors.
   * GET sensors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({request, response, view}) {
    try {
      const data = await Sensor.all();
      return response.status(200).json(data);
    } catch (e) {
      return response.status(400).send({'Error': e});
    }
  }

  /**
   * Render a form to be used for creating a new sensor.
   * GET sensors/create
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
        pins: 'required',
        type: 'required|string'
      }
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      return validation.messages()
    } else {
      try {
        const {name, pins, type} = request.only([
          'name',
          'pins',
          'type'
        ])
        const sensor = await Sensor.create({
          name,
          pins,
          type
        })
        return response.status(201).json(sensor)
      } catch (e) {
        return response.status(400).send({'Error': e});
      }
    }
  }

  /**
   * Create/save a new sensor.
   * POST sensors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({request, response}) {
  }

  /**
   * Display a single sensor.
   * GET sensors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({request, response, view}) {
    try {
      const {id} = request.only(['id'])
      const sensor = await Sensor.findBy('id', id)
      const res = {
        name: sensor.name,
        pins: sensor.pins,
        type: sensor.type,
      }
      return response.status(200).json(res)
    } catch (e) {
      return response.status(404).send({'Error': e.toString()});
    }
  }

  async showSensorMeasurements({request, response, view}) {
    try {
      const {id} = request.only(['id'])
      const data = await Sensor.findBy('id', id);
      const measure = await Measurement.find({IDSensor: id}).exec()
      const res = {data, measure}
      return response.status(200).json(res);
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }

  /**
   * Display sensors by name.
   * GET sensors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async showByName({request, response}) {
    try {
      const name = request.input('name')
      const data = await Database.select('*').from('sensors').where({name: name})
      return response.status(200).json(data)
    } catch (e) {
      return response.status(404).send({message: e.toString})
    }
  }

  /**
   * Display sensors by type.
   * GET sensors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async showByType({request, response}) {
    try {
      const type = request.input('type')
      const data = await Database.select('*').from('sensors').where({type: type})
      return response.status(200).json(data)
    } catch (e) {
      return response.status(404).send({message: e.toString})
    }
  }

  /**
   * Render a form to update an existing sensor.
   * GET sensors/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({params, request, response, view}) {
  }

  /**
   * Update sensor details.
   * PUT or PATCH sensors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({request, response}) {
    try {
      const {id} = request.only(['id'])
      const data = request.only(['name', 'pins', 'tyoe']);
      const sensor = await Sensor.findBy('id', id)
      sensor.name = data.name;
      sensor.pins = data.pins;
      sensor.type = data.type;
      await sensor.save();
      return response.status(200).json(sensor);
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }

  /**
   * Delete a sensor with id.
   * DELETE sensors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({request, response}) {
    try {
      const {id} = request.only(['id'])
      const sensor = await Sensor.findBy('id', id)
      await sensor.delete();
      return response.status(204).send({message: 'Sensor has been deleted'});
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }
}

module.exports = SensorController
