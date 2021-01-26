import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import UsersRouter from './users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/appointments', UsersRouter);

export default routes;
