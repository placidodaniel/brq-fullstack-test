import { Request, Response } from 'express'
import { Types } from 'mongoose'
import Vehicle from '../models/VehicleModel/model'

/**
 * Returns the number of passengers for the vehicle type
 * @param type The vehicle type
 */
const getNumberOfPassengers = (type: string): number => {
  switch (type) {
    case 'BUS': return 42
    case 'CAR': return 4
    case 'TRUCK': return 1
  }
}

class VehiclesController {
  // List all vehicles inserted on database
  public async index (req: Request, res: Response): Promise<Response> {
    const users = await Vehicle.find()
    return res.status(200).json(users)
  }

  // Insert a vehicle into database
  public async store (req: Request, res: Response): Promise<void> {
    let { chassisId, type, color } = req.body

    type = type.toUpperCase()
    const passengers = getNumberOfPassengers(type)
    const vehicle = { chassisId, type, passengers, color }

    await Vehicle.create(vehicle, (err, user) => {
      if (err) {
        const error = err.errors.type || err.errors.chassisId || err.errors.color
        return res.status(422).json(error.message)
      }

      return res.status(200).json(user)
    })
  }

  // Find a vehicle by ChassisId
  public async findByChassisId (req: Request, res: Response): Promise<void> {
    const { chassisId } = req.body
    await Vehicle.findOne({ chassisId }, (err, vehicle) => {
      if (err) {
        return res.status(500)
      }

      if (!vehicle) {
        return res.status(204)
      }

      return res.status(200).json(vehicle)
    })
  }

  // Update just the vehicle color
  public async update (req: Request, res: Response): Promise<void> {
    const { _id, color } = req.body

    // First and second parameter are the query and the updates
    // Third parameter set 'new' to true. This will return the new Object
    await Vehicle.findByIdAndUpdate(
      { _id: Types.ObjectId(_id) },
      { color },
      { new: true }, (err, vehicle) => {
        if (err) {
          return res.status(500)
        }

        return res.status(200).json(vehicle)
      })
  }

  // Deletes a vehicle from database
  public async remove (req: Request, res: Response): Promise<void> {
    const { _id } = req.body
    await Vehicle.deleteOne({ _id: Types.ObjectId(_id) })
      .catch(err => res.status(500).send(err))
      .then(result => res.status(200).json(result))
  }
}

export default new VehiclesController()
