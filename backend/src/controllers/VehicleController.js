const Vehicle = require('../models/VehicleModel')

/**
 * Returns the number of passengers for the vehicle type
 * @param type The vehicle type
 */
const getNumberOfPassengers = type => {
   switch (type) {
      case 'BUS': return 42
      case 'CAR': return 4
      case 'TRUCK': return 1
   }
}

module.exports = {
   // List all vehicles inserted on database
   async index (req, res) {
      const users = await Vehicle.find()
      return res.status(200).json(users)
   },

 // Insert a vehicle into database
   async store (req, res) {
      let { chassisId, type, color } = req.body

      if (!chassisId.series || !chassisId.number) {
         return res.status(422).send({ error: "You should inform a Series or Number!" })
      }

      // Prevents toUpperCase() of undefined
      type = type ? type.toUpperCase() : ""
      chassisId.series = chassisId.series.trim()
      color = color.trim()

      const passengers = getNumberOfPassengers(type)
      const vehicle = { chassisId, type, passengers, color }

      await Vehicle.create(vehicle, (err, user) => {
         if (err) {
            const error = err.errors.type || err.errors.chassisId || err.errors.color
            return res.status(422).json(error.message)
         }

         return res.status(200).json(user)
      })
   },

 // Find a vehicle by ChassisId
   async findByChassisId (req, res) {
      const { chassisId } = req.body

      if (!chassisId || !chassisId.series || !chassisId.number) {
         return res.status(422).json({ error: "You should inform a Series or Number!" })
      }

      chassisId.series = chassisId.series.trim()
      await Vehicle.findOne({ chassisId }, (err, vehicle) => {
      if (err) {
         return res.status(500)
      }

      if (!vehicle) {
         return res.status(200).json({ message: "No vehicle found!" })
      }

      return res.status(200).json(vehicle)
      })
   },

   // Update just the vehicle color
   async update (req, res) {
      const { _id, color } = req.body

      // First and second parameter are the query and the updates
      // Third parameter set 'new' to true. This will return the new Object
      await Vehicle.findByIdAndUpdate(
      { _id },
      { color },
      { new: true }, (err, vehicle) => {
         if (err) {
            return res.status(500)
         }

         return res.status(200).json(vehicle)
      })
   },

   // Deletes a vehicle from database
   async remove (req, res) {
      const { _id } = req.body
      await Vehicle.deleteOne({ _id })
         .catch(err => res.status(500).send(err))
         .then(result => res.status(200).json(result))
    }
}