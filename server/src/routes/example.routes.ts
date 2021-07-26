import { Router } from 'express';
import ExampleController from '../controllers/example.controllers';

const router = Router();
const exampleController = new ExampleController();

router.get('/text/:name', exampleController.getExample);

export default router;
