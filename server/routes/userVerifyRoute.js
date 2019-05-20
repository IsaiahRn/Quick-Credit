import { Router } from 'express';
import userController from '../controllers/userController';

// @Bring in our custom middlewares
import isAuth from '../middlewares/isAuthenticated';
import isAdmin from '../middlewares/isAdmin';

const router = Router();

// PATCH api/v1/users/<email>/verify (Verify user account)
router.patch('/:email/verify', isAuth, userController.verifyAccount);

export default router;
