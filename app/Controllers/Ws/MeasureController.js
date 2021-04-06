'use strict'
const Measurement = use('App/Models/Measurements')
const {validate} = use('Validator')

class MeasureController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  async onMessage(data){
    try {
      const {IDSensor, measurements} = data.only([
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
}

module.exports = MeasureController
