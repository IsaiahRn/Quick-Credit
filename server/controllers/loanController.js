import _ from 'lodash';
import model from '../models/loanModel';
import users from '../models/userModel';
import repayment from '../models/repaymentModel';
import validation from '../validations/loanValidation';

class Loans {
  // create loan request
  static createLoan(req, res) {
    // check if there's invalid data in request body
    const { error } = validation.createLoan(req.body);
    if (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: error.details[0].message,
      });
    }
    const ownerId = String(req.body.email, 10);
    const ownerInfo = users.findById(ownerId);

    if (!ownerId) {
      return res.status(404).send({
        status: 404,
        error: 'User Info Not Found!',
      });
    }

    const loan = model.create(req.body);
    return res.status(201).send({
      status: res.statusCode,
      data: loan,
    });
  }

  // Get all loans
  static getAllLoans(req, res) {
    const foundLoans = model.fetchAllLoans(req.query);
    if (!foundLoans) {
      return res.status(404).send({
        status: res.statusCode,
        error: 'Query not found',
      });
    }
    return res.status(200).send({
      status: res.statusCode,
      message: 'Here is All your loans!',
      data: foundLoans,
    });
  }

  // Get a specific loan application
  static getLoan(req, res) {
    const loanID = parseInt(req.params.loanId, 10);
    const findID = model.findOne(loanID);

    if (!findID) {
      return res.status(404).send({
        status: res.statusCode,
        error: 'Loan with this ID not found',
      });
    }

    const findLoan = model.findById(loanID);
    return res.status(200).send({
      status: res.statusCode,
      message: 'Here is your loan!',
      data: findLoan[0],
    });
  }


  // Approve or reject a loan application
  static getApproveReject(req, res) {
    const { loanId } = req.params;
    const loanFound = model.findOne(loanId);
    if (!loanFound) {
      return res.status(404).send({
        status: res.statusCode,
        error: 'Loan with this ID not found',
      });
    }

    const updatedLoan = model.updateOne(loanId, req.body);
    return res.status(200).send({
      status: res.statusCode,
      message: 'Status successfully updated!',
      data: updatedLoan,
    });
  }

  // Create a loan repayment record
  static createRepaymentRecord(req, res) {
    const { loanId } = req.params;
    const { paidAmount } = req.body;
    const loanFound = model.findOne(loanId);

    if (!loanFound) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'Wrong Loan ID!',
      });
    }
    if (loanFound) {
      if (parseFloat(loanFound.Balance) < paidAmount) {
        return res.status(400).send({
          status: res.statusCode,
          error: 'You have fully repaid your loan',
        });
      }
      if (loanFound.status != 'approved') {
        return res.status(400).send({
          status: res.statusCode,
          error: 'Please, loan need to be approved!',
        });
      }
    }


    const repaymentInfo = repayment.createRepayment(req.body, loanId);
    return res.status(200).send({
      status: res.statusCode,
      message: 'Repayment record created!',
      data: repaymentInfo,
    });
  }

  // Get a loan repayment history
  // static getRepaymentRecord(req, res) {
  //  const loanID = parseInt(req.params.loanId, 10);
  //   const findLoanRecord = repayment.findById(loanID);

  //   if (!findLoanRecord) {
  //     return res.status(404).send({
  //       status: res.statusCode,
  //       error: 'Loan record with this ID not found',
  //     });
  //   }

  //   return res.status(200).send({
  //     status: res.statusCode,
  //     message: 'Here is your loan repayment history!',
  //     data: _.pick(findLoanRecord[0], [
  //         'loanId',
  //         'createdOn',
  //         'amount',
  //         'monthlyInstallement',
  //         'newbalance',
  //       ]),
  //   });
  // }

  // Get a loan repayment history
  static getRepaymentRecords(req, res) {
    const loanID = parseInt(req.params.loanId, 10);
    const findLoanRecord = repayment.findById(loanID);

    if (findLoanRecord.length <= 0) {
      return res.status(404).send({
        status: res.statusCode,
        error: 'Repayment history not found',
      });
    }
    return res.status(200).send({
      status: res.statusCode,
      message: 'Here is your loan repayment history!',
      data: findLoanRecord,
    });
  }
}
export default Loans;
