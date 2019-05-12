import { Router } from 'express';
import loanController from '../controllers/loanController';

// Our middlewares
import isAuth from '../middlewares/isAuthenticated';
import isAdmin from '../middlewares/isAdmin';

const router = Router();

// POST api/v1/loans (Users  Create a new loan request)
router.post('/', isAuth, loanController.createLoan);

// GET api/v1/loans (fetch all created loans)
router.get('/', loanController.getAllLoans);

// GET api/v1/loans/<loanId> (fetch a single loan)
router.get('/:loanId', loanController.getLoan);

// PATCH api/v1/loans/<loanId> (Approve Or Reject a loan request)
router.patch('/:loanId', loanController.getApproveReject);

// POST api/v1/loans/<loanId>/repayment (Create a repayment history)
router.post('/:loanId/repayment', loanController.createRepaymentRecord);

// GET api/v1/<loanId>/repayment (fetch a repayment history)
router.get('/:loanId/repayment', loanController.getRepaymentRecords);

export default router;
