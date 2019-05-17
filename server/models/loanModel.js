import moment from 'moment';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from './userModel';
import generate from '../helpers/jwtVerifyToken';
import isAuth from '../middlewares/isAuthenticated';

dotenv.config();

const loans = [];

class Loan {
  create (data, user) {
    const { tenor, amount } = data;
    const { email, firstname, lastname } = user;
    const inputTenor = parseInt(tenor);
    const inputAmount = parseFloat(amount);
    const interest = parseFloat(0.05);
    const amountInterest = parseFloat(inputAmount * interest);
    const installment = parseFloat((inputAmount + amountInterest) / inputTenor);
    const initialBalance = parseFloat(installment * tenor);
    const newLoan = {
      loanId: loans.length + 1,
      email: email,
      firstname: firstname,
      lastname: lastname,
      createdOn: moment().format('LLLL'),
      status: 'pending',
      repaid: false,
      tenor: inputTenor,
      amount: inputAmount,
      paymentInstallment: installment,
      Balance: initialBalance,
      interest
    };

    loans.push(newLoan);
    return newLoan;
  }

  fetchAllLoans (query = {}) {
    if (query.status && query.repaid) {
      const boolRepaid = JSON.parse(query.repaid);
      return loans.filter(loan => loan.status === query.status.toLowerCase() && loan.repaid === boolRepaid);
    }

    return loans;
  }

  findById (loanId) {
    const id = parseInt(loanId, 10);

    const allLoan = loans.filter(ln => ln.loanId === id);
    return allLoan;
  }

  findOne (loanId) {
    return loans.find(loan => loan.loanId === parseInt(loanId, 10));
  }

  updateOne (loanId, data) {
    const found = this.findOne(loanId);

    const index = loans.indexOf(found);
    if (index === -1) {
      return undefined;
    }

    loans[index].status = data.status || found.status;
    loans[index].modified_at = moment(new Date());

    return loans[index];
  }

  deleteOne (Loanid) {
    const found = this.findOne(Loanid);
    const index = loans.indexOf(found);
    const deletedAccount = loans.splice(index, 1);
    return deletedAccount;
  }
}
export default new Loan();
