'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FlowerpotSensorsSchema extends Schema {
  up () {
    this.create('flowerpot_sensors', (table) => {
      table.increments()
      table.integer('IDFlowerpot').unsigned().references('id').inTable('flowerpots').onDelete('CASCADE')
      table.integer('IDSensor').unsigned().references('id').inTable('sensors').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('flowerpot_sensors')
  }
}

module.exports = FlowerpotSensorsSchema
