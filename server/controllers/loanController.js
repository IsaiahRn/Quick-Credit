import _ from 'lodash';
import model from '../models/loanModel';
import users from '../models/userModel';
import repayment from '../models/repaymentModel';
import validation from '../validations/loanValidation';

class Loans {
  // create loan request
  static async createLoan (req, res) {
    // check if there's invalid data in request body
    const { error } = validation.createLoan(req.body);

    const arrErrorList = [];
    const errorValidator = () => {
      for (let i = 0; i < error.details.length; i++) {
        arrErrorList.push(error.details[i].message);
      }
    };

    if (error) {
      `${errorValidator()}`;
      if (error) {
        return res.status(400).send({
          status: res.statusCode,
          error: arrErrorList
        });
      }
    }
    const ownerId = parseInt(req.user.id, 10);
    const ownerInfo = await users.findById(ownerId);

    if (ownerInfo.rows.length === 0) {
      return res.status(404).send({
        status: res.statusCode,
        error: 'User Info Not Found!'
      });
    }

    const { rows } = await model.create(req.body, req.user, ownerInfo.rows[0].id);
    rows[0].firstname = ownerInfo.rows[0].firstname;
    rows[0].lastname = ownerInfo.rows[0].lastname;
    rows[0].email = ownerInfo.rows[0].email;
    return res.status(201).send({
      message: 'Loan created successfully!',
      status: res.statusCode,
      data: rows[0],
    });
  }

  // Get all loans
  static async getAllLoans (req, res) {
    const reqStatus = req.query.status;
    const reqRepaid = req.query.repaid;
    
    const reqLoans = await model.fetchAllByQuery(reqStatus, reqRepaid);
    if(reqLoans.rows.length !== 0){
      return res.status(200).json({
        status: res.statusCode,
        data: reqLoans.rows,
      })
    }
    const { rows } = await model.fetchAllLoans();
    if(reqStatus == null && reqRepaid == null && rows.length !== 0){
    return res.status(200).send({
      status: res.statusCode,
      message: "Here is All your loans!",
      data: rows
    });
  }

  return res.status(404).send({
    status: res.statusCode,
    error: 'No loan Found',
  });
  
  }

  // Get a specific loan application
  static async getLoan (req, res) {
    const loanID = parseInt(req.params.loanId, 10);
    const { rows } = await model.findOne(loanID);

    if (rows.length === 0) {
      return res.status(404).send({
        status: res.statusCode,
        error: 'Loan with this ID not found'
      });
    }

    return res.status(200).send({
      status: res.statusCode,
      message: 'Here is your loan!',
      data: rows[0]
    });
  }

  // Approve or reject a loan application
  static async getApproveReject (req, res) {
    const { loanId } = req.params;
    const loanFound = await model.findOne(loanId);
    if (loanFound.rows.length === 0) {
      return res.status(404).send({
        status: res.statusCode,
        error: 'Loan with this ID not found'
      });
    }

    const { rows } = await model.updateOne(loanId, req.body);
    console.log(rows);
    return res.status(200).send({
      status: res.statusCode,
      message: 'Status successfully updated!',
      data: rows[0],
    });
  }

  // Create a loan repayment record
  static async createRepaymentRecord (req, res) {
    const { loanId } = req.params;
    const { paidAmount } = req.body;
    const loanFound = await model.findOne(loanId);

    if (loanFound.rows.length === 0) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'Wrong Loan ID!'
      });
    }
    if (loanFound.rows.length !== 0) {
      if (parseFloat(loanFound.rows[0].balance) < paidAmount) {
        await model.updateStatus(loanId,true);
        return res.status(400).send({
          status: res.statusCode,
          error: 'You have fully repaid your loan'
        });
      }
      if (loanFound.rows[0].status != 'approved') {
        return res.status(400).send({
          status: res.statusCode,
          error: 'Please, loan need to be approved!'
        });
      }
    }

    const { rows } = await repayment.createRepayment(req.body, loanId);
    return res.status(200).send({
      status: res.statusCode,
      message: 'Repayment record created!',
      data: rows[0],
    });
  }

  // Get a loan repayment history
  static async getRepaymentRecords (req, res) {

    const loanID = parseInt(req.params.loanId, 10);
    const { rows } = await repayment.findOne(loanID);
    
    if (rows.length === 0) {
      return res.status(404).send({
        status: res.statusCode,
        error: "Repayment history not found"
      })
    }

    return res.status(200).send({
      status: res.statusCode,
      message: 'Here is your loan repayment history!',
      data: rows
    });
  }
}
export default Loans;
