'use strict'

const BaseModel = use('MongooseModel')
const mongoose = use('Mongoose')
const {Schema} = mongoose

const MeasurementSchema = new Schema(
  {
    IDSensor: Number,
    measurements: JSON,
  },
  {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
  }
)

/**
 * @class Measurements
 */
class Measurements extends BaseModel {
  /**
   * Measurements's schema
   */
  static get schema() {
    return {}
  }
}

MeasurementSchema.loadClass(Measurements)

module.exports = mongoose.model('Measurements', MeasurementSchema)
