import moment from 'moment';
import loan from './loanModel';

const repayment = [];

class Repayment {
  // Create repayments
  createRepayment (data, loanId) {
    const { paidAmount } = data;
    const loanFound = loan.findOne(loanId);

    const balance = parseFloat(loanFound.Balance) - parseFloat(paidAmount);

    const pAmount = parseFloat(paidAmount);

    const repaymentCreation = {
      repaymentId: repayment.length + 1,
      loanId: loanFound.loanId,
      createdOn: moment().format('LLLL'),
      amount: loanFound.amount,
      monthlyInstallement: loanFound.paymentInstallment,
      paidAmount: pAmount,
      newbalance: balance
    };

    repayment.push(repaymentCreation);
    loanFound.Balance = parseFloat(loanFound.Balance) - parseFloat(paidAmount);

    if (loanFound.Balance <= 0) {
      loanFound.repaid = true;
    }

    return repaymentCreation;
  }

  // Fetch a loan repayment history
  findById (loanId) {
    const id = parseInt(loanId, 10);

    const loanRepaymentRecord = repayment.filter(loan => loan.loanId === id);
    return loanRepaymentRecord;
  }

  // Fetch a loan By Id
  findOne (loanId) {
    const id = parseInt(loanId, 10);

    const loanRepaymentRecord = repayment.find(loan => loan.loanId === id);
    return loanRepaymentRecord;
  }

  // Fetch all loan repayments history
  fetchAllRepayment (loanId) {
    return repayment;
  }
}

export default new Repayment();
