import { Router } from 'express';
import { TruckController } from '../controllers/TruckController';
import ensureAuthenticate from '../../../routes/middleware/ensureAuthenticate';

const truckRouter = Router();

const truckController = new TruckController();

truckRouter.post('/', ensureAuthenticate, truckController.create);
truckRouter.get('/:plate', ensureAuthenticate, truckController.findByPlate);
truckRouter.get('/', ensureAuthenticate, truckController.findAll);
truckRouter.patch('/', ensureAuthenticate, truckController.alterTruck);
truckRouter.delete('/:plate', ensureAuthenticate, truckController.deleteTruck);

export default truckRouter;