import { Schema, model } from 'mongoose'
import VehicleInterface from './interface'
import uniqueValidator from 'mongoose-unique-validator'

const VehicleSchema = new Schema({
  chassisId: {
    type: {
      series: String,
      number: Number
    },
    unique: true,
    required: 'You should inform a chassis series and number!',
    index: true
  },
  type: {
    type: String,
    enum: ['BUS', 'CAR', 'TRUCK'],
    required: 'You should inform the vehicle type!'
  },
  passengers: {
    type: Number
  },
  color: {
    type: String,
    required: 'You should inform the vehicle color!'
  }
}, {
  timestamps: true
})

VehicleSchema.plugin(uniqueValidator, {
  message: 'The given ChassisID already exists on database'
})

export default model<VehicleInterface>('Vehicle', VehicleSchema)
