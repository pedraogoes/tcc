import { Router } from 'express';
import ensureAuthenticate from '../../../routes/middleware/ensureAuthenticate';
import { ChargeController } from '../controllers/ChargeController';

const chargeController = new ChargeController();

const chargeRouter = Router();

chargeRouter.post('/', ensureAuthenticate, chargeController.create);
chargeRouter.get('/:id', ensureAuthenticate, chargeController.findByChargeId);
chargeRouter.get('/', ensureAuthenticate, chargeController.findByBusiness);
chargeRouter.get('/items/:charge', ensureAuthenticate, chargeController.findItemsByCharge);
chargeRouter.delete('/:charge', ensureAuthenticate, chargeController.deleteCharge);


export default chargeRouter;