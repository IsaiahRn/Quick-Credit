import loan from '../models/loan';

const checkBalance = (req, res, next) => {
  const { amount } = req.body;

  // check if the provided account number exist
  const foundLoan = loan.findOne(req.params.loanId);
  if (!foundLoan) {
    return res.status(404).send({
      status: res.statusCode,
      error: 'Loan ID Not found!',
    });
  }

  /**
   * check if the repaid amount is
   * greater than the current loan balance
  */
  const repaidAmount = parseFloat(amount);
  if (repaidAmount > parseFloat(foundLoan.initialBalance)) {
    return res.status(400).send({
      status: res.statusCode,
      error: 'loan fully repaid!',
    });
  }
  return next();
};
export default checkBalance;
