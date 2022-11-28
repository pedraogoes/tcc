import { Router } from 'express';

import userRoutes from '../modules/user/routes/user.routes';
import sessionRoutes from '../modules/user/routes/session.routes';
import businessRoutes from '../modules/business/routes/bussiness.routes';
import truckRoutes from '../modules/truck/routes/truck.routes';
import driverRoutes from '../modules/driver/routes/driver.routes';
import chargeRoutes from '../modules/charge/routes/charge.routes';
import invoiceRoutes from '../modules/charge/routes/invoice.routes';
import proposalsRoutes from '../modules/proposals/routes/proposals.routes';

export const routes = Router();

routes.use('/user', userRoutes);
routes.use('/session', sessionRoutes);
routes.use('/business', businessRoutes);
routes.use('/truck', truckRoutes);
routes.use('/driver', driverRoutes);
routes.use('/charge', chargeRoutes);
routes.use('/invoice', invoiceRoutes);
routes.use('/proposals', proposalsRoutes);