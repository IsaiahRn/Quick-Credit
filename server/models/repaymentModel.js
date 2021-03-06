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

  // Fetch a loan repayment history
  async findById (loanId) {
    const queryText = 'SELECT repayments.id AS id, repayments.created_on AS createdOn, repayments.amount AS amount, loans.id AS loanId, repayments.paidamount AS paidAmount, repayments.paymentInstallment AS monthlyInstallement, repayments.balance AS newbalance FROM repayments INNER JOIN loans ON loans.id = $1;';
    const response = await db.query(queryText, [loanId]);
    return response;
  }


  // Fetch a loan By Id
  async findOne (loanId) {
    const queryText = 'SELECT * FROM repayments WHERE loan_id=$1;'
    const response = await db.query(queryText, [loanId]);
    return response;
  }
  
}

export default new Repayment();
