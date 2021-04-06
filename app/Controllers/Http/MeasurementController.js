'use strict'
const Measurement = use('App/Models/Measurements')
const {validate} = use('Validator')

class MeasurementController {
  /**
   * Show a list of all measurements.
   * GET measurements
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({response}) {
    const data = await Measurement.find({});
    try {
      return response.status(200).json(data);
    } catch (e) {
      return response.status(400).send({'Error': e});
    }
  }

  /**
   * Render a form to be used for creating a new measurement.
   * GET measurements/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async create({request, response}) {
    try {
      const {IDSensor, measurements} = request.only([
        'IDSensor',
        'measurements'
      ])
      await Measurement.create({
        IDSensor: IDSensor,
        measurements: measurements
      })
      return response.status(201).send({message: 'measure has been created'})
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }

  /**
   * Create/save a new measurement.
   * POST measurements
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({request, response}) {
  }

  /**
   * Display a single measurement.
   * GET measurements/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({request, response}) {
    try {
      const id = request.only(['id'])
      const res = await Measurement.find({_id: id.id}).exec()
      return response.status(200).json(res)
    } catch (e) {
      return response.status(404).send({'Error': e.toString()});
    }
  }

  /**
   * Display a single measurement.
   * GET measurements/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async showByDate({request, response}) {
    try {
      const {id, date} = request.only(['id', 'date'])
      const res = await Measurement.find({IDSensor: id, created_at: date}).exec()
      return response.status(200).json(res)
    } catch (e) {
      return response.status(404).send({'Error': e.toString()});
    }
  }

  /**
   * Render a form to update an existing measurement.
   * GET measurements/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({params, request, response, view}) {
  }

  /**
   * Update measurement details.
   * PUT or PATCH measurements/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({request, response}) {
  }

  /**
   * Delete a measurement with id.
   * DELETE measurements/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({request, response}) {
    try {
      const {id} = request.only(['id'])
      await Measurement.deleteOne({_id: id.toString()})
      return response.status(204).send({message: 'measure has been destroyed'});
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }
}

module.exports = MeasurementController
