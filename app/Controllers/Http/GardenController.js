'use strict'
const Garden = use('App/Models/Garden')
const Database = use('Database')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with gardens
 */
class GardenController {
  /**
   * Show a list of all gardens.
   * GET gardens
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({request, response, view}) {
    try {
      const data = await Garden.all();
      return response.status(200).json(data);
    } catch (e) {
      return response.status(400).send({'Error': e});
    }
  }

  /**
   * Render a form to be used for creating a new garden.
   * GET gardens/create
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
        location: 'required|string'
      }
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      return validation.messages()
    } else {
      try {
        const {name, location} = request.only([
          'name',
          'location'
        ])
        const garden = await Garden.create({
          name,
          location
        })
        return response.status(201).json(garden)
      } catch (e) {
        return response.status(400).send({'Error': e});
      }
    }
  }

  /**
   * Create/save a new garden.
   * POST gardens
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({request, response}) {
  }

  /**
   * Display a single garden.
   * GET gardens/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({params, request, response, view}) {
    try {
      const {id} = request.only(['id'])
      const garden = await Garden.findBy('id', id)
      const res = {
        name: garden.name,
        location: garden.location
      }
      return response.status(200).json(res)
    } catch (e) {
      return response.status(404).send({'Error': e.toString()});
    }
  }

  /**
   * Render a form to update an existing garden.
   * GET gardens/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({params, request, response, view}) {
  }

  /**
   * Update garden details.
   * PUT or PATCH gardens/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({params, request, response}) {
    try {
      const {id} = request.only(['id'])
      const data = request.only(['name', 'location']);
      const garden = await Garden.findBy('id', id)
      garden.name = data.name;
      garden.location = data.location;
      await garden.save();
      return response.status(200).json(garden);
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }

  /**
   * Delete a garden with id.
   * DELETE gardens/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({params, request, response}) {
    try {
      const {id} = request.only(['id'])
      const garden = await Garden.findBy('id', id)
      await garden.delete();
      return response.status(204).send({message: 'Flowerpot has been deleted'});
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }
}

module.exports = GardenController
