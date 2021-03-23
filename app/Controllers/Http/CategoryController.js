'use strict'

const Category = use('App/Models/Category')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const data = await Category.all();
      return response.status(200).json(data);
    } catch (e) {
      return response.status(400).send({'Error': e});
    }
  }

  /**
   * Render a form to be used for creating a new category.
   * GET categories/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    const rules =
      {
        name: 'required|string',
        climate: 'required|string'
      }
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      return validation.messages()
    } else {
      try {
        const {name, climate} = request.only([
          'name',
          'climate'
        ])
        const category = await Category.create({
          name,
          climate
        })
        return response.status(201).json(category)
      } catch (e) {
        return response.status(400).send({'Error': e});
      }
    }
  }

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params:{id}, request, response, view }) {
    try {
      const category = await Category.findBy('id', id)
      const res = {
        name: category.name,
        climate: category.climate
      }
      return response.status(200).json(res)
    } catch (e) {
      return response.status(404).send({'Error': e.toString()});
    }
  }

  /**
   * Render a form to update an existing category.
   * GET categories/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params:{id}, request, response }) {
    try {
      const data = request.only(['name','climate']);
      const category = await Category.findBy('id', id)
      category.name = data.name;
      category.climate = data.climate;
      await category.save();
      return response.status(200).json(category);
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params:{id}, request, response }) {
    try {
      const category = await Category.findBy('id', id)
      await category.delete();
      return response.status(204).send({message: 'Category has been deleted'});
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }
}

module.exports = CategoryController
