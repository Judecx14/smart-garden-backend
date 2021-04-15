'use strict'
const Measurement = use('App/Models/Measurements')
const Database = use('Database')

class MeasureController {
  constructor({socket, request}) {
    this.socket = socket
    this.request = request
  }

  async onMessage(data) {
    console.log(data)
    try {
      if (data.measurements.humidity < 20) {
        const flowerpot = await Database.select('*').from('flowerpot_sensors').where({IDSensor: data.IDSensor})
        this.socket.broadcast('startWaterPump', flowerpot.IDFlowerpot)
      }
      await Measurement.create({
        IDSensor: data.IDSensor,
        measurements: data.measurements
      })
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = MeasureController
