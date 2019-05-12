import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

import generateToken from './Token/generateTokens';
import generate from '../helpers/jwtVerifyToken';

const { UserData, AdminToken, UserToken } = generateToken.signup;

const token = generate.getToken(UserToken);
const adminToken = generate.getToken(AdminToken);

chai.use(chaiHttp);

before('Before Test,User should make signup', () => {
  chai
    .request(app)
    .post('/api/v1/auth/signup')
    .set('Authorization', `${token}`)
    .send(UserData)
    .end((err, res) => {
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.deep.equal(201);
      expect(res.body.message).to.be.a('string');
      expect(res.body.data).to.be.an('object');
    });
});


describe('POST /api/v1/loans', () => {
  it('should create a new loan', () => {
    const validLoanData = {
      firstname: 'karenzi',
      lastname: 'david',
      email: 'test@test.com',
      tenor: 5,
      amount: 20000.587,
    };
    chai
      .request(app)
      .post('/api/v1/loans')
      .set('Authorization', `${token}`)
      .send(validLoanData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(201);
        expect(res.body.data).to.be.an('object');
      });
  });

  it('should return error message once you provide LoanId', () => {
    const invalidLoanId = {
      firstname: 'dhj',
      lastname: 'david',
      email: 'test@test.com',
      tenor: 5,
      amount: 20000.587,
    };
    chai
      .request(app)
      .post('/api/v1/loans')
      .set('Authorization', `${token}`)
      .send(invalidLoanId)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(201);
        expect(res.body.data).to.be.an('object');
      });
  });

  it('should return error message, once you provided the invalid value for creating loan request', () => {
    const invalidLoanData = {
      loanId: 1,
      tenor: 'tenor',
      amount: 'amount',
    };
    chai
      .request(app)
      .post('/api/v1/loans')
      .send(invalidLoanData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(400);
        expect(res.body.error).to.be.a('string');
      });
  });
});


describe('PATCH /api/v1/loans/<loan-id>', () => {
  it('should update an existing Loan request', () => {
    const updateLoanData = {
      loanId: 1,
      firstname: 'karenzi',
      lastname: 'david',
      email: 'test@test.com',
      tenor: 5,
      amount: 20000.587,
    };
    chai
      .request(app)
      .patch('/api/v1/loans/1')
      .set('Authorization', `${token}`)
      .send(updateLoanData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(200);
        expect(res.body.data).to.be.an('object');
      });
  });

  it('should error message for setting Authorization header', () => {
    const updateLoanData = {
      loanId: 1,
      firstname: 'karenzi',
      lastname: 'david',
      email: 'test@test.com',
      tenor: 5,
      amount: 20000.587,
    };
    chai
      .request(app)
      .patch('/api/v1/loan/1')
      .set('Authooorization', `${token}`)
      .send(updateLoanData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(404);
        expect(res.body.error).to.be.a('string');
      });
  });

  it('should return error message for invalid token provided', () => {
    const updateLoanData = {
      loanId: 1,
      firstname: 'karenzi',
      lastname: 'david',
      email: 'test@test.com',
      tenor: 5,
      amount: 20000.587,
    };
    chai
      .request(app)
      .patch('/api/v1/loan/1')
      .set('Authorization', 'kjkjkjkj$4bnnn')
      .send(updateLoanData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(404);
        expect(res.body.error).to.be.a('string');
      });
  });

  it('should return error message if no token provided', () => {
    const updateLoanData = {
      loanId: 1,
      firstname: 'karenzi',
      lastname: 'david',
      email: 'test@test.com',
      tenor: 5,
      amount: 20000.587,
    };
    chai
      .request(app)
      .patch('/api/v1/loan/1')
      .set('Authorization', '')
      .send(updateLoanData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(404);
        expect(res.body.error).to.be.a('string');
      });
  });

  it('should return error message - Admin permission is required', () => {
    const updateLoanData = {
      loanId: 1,
      firstname: 'karenzi',
      lastname: 'david',
      email: 'test@test.com',
      tenor: 5,
      amount: 20000.587,
    };
    chai
      .request(app)
      .patch('/api/v1/loans/100')
      .set('Authorization', `${token}`)
      .send(updateLoanData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(404);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('Loan with this ID not found');
      });
  });

  it('should not update an unexisting Loan request', () => {
    const updateLoanData = {
      loanId: 1,
      firstname: 'karenzi',
      lastname: 'david',
      email: 'test@test.com',
      tenor: 5,
      amount: 20000.587,
    };
    chai
      .request(app)
      .patch('/api/v1/loans/100')
      .set('Authorization', `${adminToken}`)
      .send(updateLoanData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(404);
        expect(res.body.error).to.be.a('string');
      });
  });
});

describe('GET /api/v1/loans/<loan-id>', () => {
  it('should return error message for not loan user', () => {
    chai
      .request(app)
      .get('/api/v1/loans/100')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(404);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('Loan with this ID not found');
      });
  });

  it('should return all loan requests related to that <loan-id>', () => {
    chai
      .request(app)
      .get('/api/v1/loans/1')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(200);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.deep.equal('Here is your loan!');
      });
  });
});
