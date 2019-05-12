/* eslint-disable no-unused-vars */
import { expect } from 'chai';
import authValidate from '../validations/authValidation';
import loanValidate from '../validations/loanValidation';

const login = {
  email: 'testingapp@gmail.com',
  password: 'Kazeem27',
};

const user = {
  email: 'testingapp@gmail.com',
  firstname: 'tester',
  lastname: 'testing',
  password: 'Kazeem27',
  address: '27, tunji Olaiya street',
};

const loan = {
  firstname: 'karenzi',
  lastname: 'david',
  email: 'karenzi@mail.com',
  tenor: 5,
  amount: 2000.567,
};

const approveReject = {
  status: 'approved',
};


describe('validation', () => {
  let result;
  it('Should validate user', () => {
    result = authValidate.signup(user);
    expect(result).to.be.a('object');
  });
  it('Should validate login', () => {
    result = authValidate.login(login);
    expect(result).to.be.a('object');
  });
  it('Should successfully validate a loan', () => {
    result = loanValidate.createLoan(loan);
    expect(result).to.be.a('object');
  });
  it('Should successfully validate approveOrreject a loan request', () => {
    result = loanValidate.ApproveReject(approveReject);
    expect(result).to.be.a('object');
  });
});
