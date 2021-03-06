import { Router } from 'express';
import userController from '../controllers/userController';

// Our middlewares
import isAuth from '../middlewares/isAuthenticated';
import isAdmin from '../middlewares/isAdmin';

const router = Router();

// PATCH api/v1/users/<email>/verify (Verify user account)
router.patch('/:email/verify', isAuth, isAdmin, userController.verifyAccount);

export default router;
