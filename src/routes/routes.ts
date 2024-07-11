import { Router } from 'express';
import userController from '../controllers/userController.js';

const route = Router();

route.get('/api', userController.index);
route.post('/api/register', userController.register);
route.patch('/api/edit/:id', userController.edit);
route.delete('/api/delete/:username', userController.delete);

export default route;