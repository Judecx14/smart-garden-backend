'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FlowerpotSchema extends Schema {
  up () {
    this.create('flowerpots', (table) => {
      table.increments()
      table.string('name', 280).notNullable()
      table.string('spice', 280).notNullable()
      table.integer('category').notNullable().unsigned().references('id').inTable('categories').onDelete('CASCADE')
      table.integer('garden').notNullable().unsigned().references('id').inTable('gardens').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('flowerpots')
  }
}

module.exports = FlowerpotSchema
