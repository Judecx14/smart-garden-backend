'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GardensSchema extends Schema {
  up () {
    this.create('gardens', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name', 280).notNullable()
      table.string('location', 280).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('gardens')
  }
}

module.exports = GardensSchema
