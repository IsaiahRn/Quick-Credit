import { Router } from 'express';
import authController from '../controllers/authController';

const router = Router();

// POST api/v1/auth/signup (Users create their acccounts)
router.post('/signup', authController.signup);

// POST api/v1/auth/login (Users Login into their accounts)
router.post('/login', authController.login);

//GET api/v1/auth/users
router.get('/users', authController.getAllUsers);

export default router;
