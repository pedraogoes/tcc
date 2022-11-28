import { Router } from 'express';
import ensureAuthenticate from '../../../routes/middleware/ensureAuthenticate';
import { ProposalsController } from '../controllers/ProposalsController';

const proposalsController = new ProposalsController();

const proposalsRouter = Router();


proposalsRouter.post('/', ensureAuthenticate, proposalsController.create);
proposalsRouter.get('/:charge', ensureAuthenticate, proposalsController.findByCharge);


export default proposalsRouter;