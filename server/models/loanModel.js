import moment from 'moment';
import users from './userModel';

const loans = [];

class Loan {
  create(data) {
    const { tenor, amount } = data;
    const inputTenor = parseInt(tenor);
    const inputAmount = parseFloat(amount);
    const interest = parseFloat(0.05);
    const amountInterest = parseFloat(inputAmount * interest);
    const installment = parseFloat((inputAmount + amountInterest) / inputTenor);
    const initialBalance = parseFloat(installment * tenor);
    const newLoan = {
      loanId: loans.length + 1,
      firstname: data.firstname || '',
      lastname: data.lastname || '',
      email: data.email || '',
      createdOn: moment().format('LLLL'),
      status: 'pending',
      repaid: false,
      tenor: inputTenor,
      amount: inputAmount,
      paymentInstallment: installment,
      Balance: initialBalance,
      interest,
    };

    loans.push(newLoan);
    return newLoan;
  }


  fetchAllLoans(query = {}) {
    // if (query.status) {
    //   return loans.find(loan => (loan.status === query.status));
    // }
    // if (query.repaid) {
    //   return loans.find(loan => (loan.repaid === query.repaid));
    // }

    // return loans;

    if (query.status && query.repaid) {
      const boolRepaid = JSON.parse(query.repaid);
      return loans.filter(loan => loan.status === query.status.toLowerCase() && loan.repaid === boolRepaid);
    }

    return loans;
  }


  findById(loanId) {
    const id = parseInt(loanId, 10);

    const allLoan = loans.filter(ln => ln.loanId === id);
    return allLoan;
  }


  findOne(loanId) {
    return loans.find(loan => loan.loanId === parseInt(loanId, 10));
  }


  updateOne(loanId, data) {
    const found = this.findOne(loanId);

    const index = loans.indexOf(found);
    if (index === -1) {
      return undefined;
    }

    loans[index].status = data.status || found.status;
    loans[index].modified_at = moment(new Date());

    return loans[index];
  }

  deleteOne(Loanid) {
    const found = this.findOne(Loanid);
    const index = loans.indexOf(found);
    const deletedAccount = loans.splice(index, 1);
    return deletedAccount;
  }
}
export default new Loan();
