'use strict'

const BaseModel = use('MongooseModel')
const mongoose = use('Mongoose')
const {Schema} = mongoose

const MeasurementSchema = new Schema(
  {
    IDSensor: String,
    measurements: String,
  }
)
/**
 * @class Measurements
 */
class Measurements extends BaseModel {
  /**
   * Measurements's schema
   */
  static get schema () {
    return {

    }
  }
}


MeasurementSchema.loadClass(Measurements)

module.exports = mongoose.model('Measurements', MeasurementSchema)
