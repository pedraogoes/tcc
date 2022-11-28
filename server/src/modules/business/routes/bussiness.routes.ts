import { Router } from 'express';
import ensureAuthenticate from '../../../routes/middleware/ensureAuthenticate';
import { BusinessController } from '../controllers/BusinessController';

const businessRouter = Router();

const businessController = new BusinessController();

businessRouter.post('/', ensureAuthenticate, businessController.create);
businessRouter.get('/', ensureAuthenticate, businessController.find);
businessRouter.put('/', ensureAuthenticate, businessController.update);

export default businessRouter;

