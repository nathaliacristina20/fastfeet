import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.get('/deliverymans/:id', DeliverymanController.show);
routes.get('/deliveryman/:id/deliveries', DeliveryController.show);

routes.get('/delivery/:id/problems', DeliveryProblemsController.show);
routes.post('/delivery/:id/problems', DeliveryProblemsController.store);
routes.put(
  '/deliveryman/:deliveryman_id/deliveries/:delivery_id',
  DeliveryController.update
);

routes.post('/files', upload.single('file'), FileController.store);

routes.use(authMiddleware);

routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);

routes.delete('/deliveries/:id', DeliveryController.delete);

routes.get('/deliverymans', DeliverymanController.index);
routes.post('/deliverymans', DeliverymanController.store);
routes.put('/deliverymans/:id', DeliverymanController.update);
routes.delete('/deliverymans/:id', DeliverymanController.delete);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.delete(
  '/problem/:id/cancel-delivery',
  DeliveryProblemsController.delete
);
routes.get('/delivery/problems', DeliveryProblemsController.index);

export default routes;
