import moment from 'moment';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from './userModel';
import db from './index';


class Loan {
  async create (data, user) {
    const { tenor, amount } = data;
    const { email, firstname, lastname } = user;
    const inputTenor = parseInt(tenor);
    const inputAmount = parseFloat(amount);
    const interest = parseFloat(0.05);
    const amountInterest = parseFloat(inputAmount * interest);
    const installment = parseFloat((inputAmount + amountInterest) / inputTenor);
    const initialBalance = parseFloat(installment * tenor);
    const newLoan = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      createdOn: moment().format('LLLL'),
      modifiedOn: moment().format('LLLL'),
      status: 'pending',
      repaid: false,
      tenor: inputTenor,
      amount: inputAmount,
      paymentInstallment: installment,
      Balance: initialBalance,
      interest
    };

    const queryText = 'INSERT INTO loans(email,firstname,lastname,created_on,modified_on,status,repaid,tenor,amount,paymentInstallment,balance,interest)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)RETURNING*';
    const values = [newLoan.email, newLoan.firstname, newLoan.lastname, newLoan.createdOn, newLoan.modifiedOn, newLoan.status, newLoan.repaid, newLoan.tenor, newLoan.amount, newLoan.paymentInstallment, newLoan.Balance, newLoan.interest];
    const response = await db.query(queryText, values);
    return response
  }

  async fetchAllLoans () {
    const queryText = "SELECT * FROM loans;";
    const response = await db.query(queryText);
    return response;
  }

  async findById (loanId) {
    const queryText = 'SELECT * FROM loans WHERE id=$1;';
    const response = await db.query(queryText, [parseInt(loanId, 10)]);
    return response;
  }

  async findOne (loanId) {
    const queryText = 'SELECT * FROM loans WHERE id=$1;';
    const response = await db.query(queryText, [parseInt(loanId, 10)]);
    return response;
  }

  async updateOne (loanId, data) {
    const { rows } = await this.findById(loanId);

    if(rows.length === 0){
      return undefined;
    }

    const status = data.status || rows[0].status;
    const modified_at = moment().format('LLLL');

    const queryText = 'UPDATE loans SET status=$1,modified_on=$2 WHERE id=$3 RETURNING *;';
    const response = await db.query(queryText, [status, modified_at, rows[0].id]);
    return response;
  }

  deleteOne (Loanid) {
    const found = this.findOne(Loanid);
    const index = loans.indexOf(found);
    const deletedAccount = loans.splice(index, 1);
    return deletedAccount;
  }
}
export default new Loan();
