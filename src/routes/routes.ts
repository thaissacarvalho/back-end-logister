import { Router } from 'express';
import userController from '../controllers/userController.js';

const route = Router();

route.get('/', userController.index);
route.post('/register', userController.register);
route.patch('/edit/:id', userController.edit);

export default route;