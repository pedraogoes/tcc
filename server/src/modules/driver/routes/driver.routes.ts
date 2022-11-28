import { Router } from 'express';
import fileupload from 'express-fileupload';
import ensureAuthenticate from '../../../routes/middleware/ensureAuthenticate';
import { DriverController } from '../controllers/DriverController';

const driverRouter = Router();

const driverController = new DriverController();

driverRouter.post('/', ensureAuthenticate, fileupload(),driverController.create);
driverRouter.get('/', ensureAuthenticate, driverController.findAll);
driverRouter.delete('/:driver', ensureAuthenticate, driverController.delete);


export default driverRouter;