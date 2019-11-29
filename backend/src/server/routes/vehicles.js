const routes = require('express').Router()

const {
   index,
   store,
   findByChassisId,
   update,
   remove
} = require('../../controllers/VehicleController')

module.exports = app => {
   routes.get('/', index)
   routes.post('/', store)
   routes.post('/find', findByChassisId)
   routes.put('/update', update)
   routes.delete('/delete', remove)

   app.use('/vehicles', routes)
}
