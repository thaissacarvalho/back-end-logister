import { Router } from 'express';
import userController from '../controllers/userController.js';
import { authJwt } from '../middlewares/authJWT.js';
import loginController from '../controllers/loginController.js';

const route = Router();

route.get('', userController.index);
route.post('/register', userController.register);
route.patch('/edit/:_id', userController.edit);
route.delete('/delete/:username', userController.delete);
route.post('/login', authJwt, loginController);

export default route;