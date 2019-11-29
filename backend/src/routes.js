import { Router } from 'express'
import VehiclesController from './controllers/VehiclesController'
const routes = Router()

routes.get('/vehicles', VehiclesController.index)
routes.post('/vehicles', VehiclesController.store)
routes.post('/vehicles/find', VehiclesController.findByChassisId)
routes.put('/vehicles/update', VehiclesController.update)
routes.delete('/vehicles/delete', VehiclesController.remove)

export default routes
