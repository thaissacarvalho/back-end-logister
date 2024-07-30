import { Router } from 'express';
import userController from '../controllers/userController.js';
import authJWT from '../middlewares/authJWT.js';
import loginController from '../controllers/loginController.js';

const route = Router();

route.get('/api', userController.index);
route.post('/api/register', userController.register);
route.patch('/api/edit/:id', userController.edit);
route.delete('/api/delete/:username', userController.delete);
route.post('api/login', authJWT, loginController.login);

export default route;