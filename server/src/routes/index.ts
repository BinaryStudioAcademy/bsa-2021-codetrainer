import { Router } from 'express';
import example from './example.routes';

const routes = Router();

routes.use('/example', example);

export default routes;
