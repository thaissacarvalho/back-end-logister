import { Router } from 'express';
import userController from '../controllers/userController';
import { loginController } from '../controllers/loginController';
// import { authMiddleware } from '../middlewares/authMiddleware';

const route = Router();

route.get('', userController.index);
route.post('/register', userController.register);
route.patch('/edit/:_id', userController.edit);
route.delete('/delete/:username', userController.delete);
route.post('/login', loginController);

export default route;   