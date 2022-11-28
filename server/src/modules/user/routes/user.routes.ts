import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import ensureAuthenticate from '../../../routes/middleware/ensureAuthenticate';

const useRouter = Router();

const userController = new UserController();

useRouter.get('/:id', ensureAuthenticate, userController.findById);
useRouter.post('/', userController.create);
useRouter.post('/user', userController.createUser);
useRouter.get('/', ensureAuthenticate, userController.findByBusiness);

export default useRouter;