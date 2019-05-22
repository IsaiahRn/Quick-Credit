import moment from 'moment';
import loan from './loanModel';
import db from './index';


class Repayment {
  // Create repayments
  async createRepayment (data, loanId) {
    const { paidAmount } = data;
    const { rows } = await loan.findOne(loanId);

    const balance = parseFloat(rows[0].balance) - parseFloat(paidAmount);
    await loan.updateBalance(rows[0].id, balance);

    const pAmount = parseFloat(paidAmount);

    const repaymentCreation = {
      loanId: rows[0].id,
      amount: rows[0].amount,
      paidAmount: pAmount,
      monthlyInstallement: rows[0].paymentinstallment,
      newbalance: balance,
      createdOn: moment().format('LLLL'),
    };

    if (rows[0].balance <= 0) {
      rows[0].repaid = true;
    }

    const queryText = 'INSERT INTO repayments(loan_id,amount,paidamount,paymentinstallment,balance,created_on)VALUES($1,$2,$3,$4,$5,$6)RETURNING*;';
    const values = [
      repaymentCreation.loanId,
      repaymentCreation.amount,
      repaymentCreation.paidAmount,
      repaymentCreation.monthlyInstallement,
      repaymentCreation.newbalance,
      repaymentCreation.createdOn,
    ];
    const response = await db.query(queryText, values);
    return response;

  }

}

export default new Repayment();
