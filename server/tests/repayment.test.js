import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

import generateToken from './Token/generateTokens';
import generate from '../helpers/jwtVerifyToken';

const { AdminToken, NewUserToken } = generateToken.signup;

const adminToken = generate.getToken(AdminToken);
const userToken = generate.getToken(NewUserToken);

chai.use(chaiHttp);

before('create a loan request', () => {
  const validLoanData2 = {
    tenor: 5,
    amount: 20000.587
  };
  chai
    .request(app)
    .post('/api/v2/loans')
    .set('Authorization', `${userToken}`)
    .send(validLoanData2)
    .end((err, res) => {
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal(201);
      expect(res.body.data).to.be.an('object');
    });
});

describe('POST /loans/<:loan-id>/repayment', () => {
  it('It should not repay, when loan is fully repaid', () => {
    const moreAmountInfo = {
      paidAmount: 500000.75
    };
    chai
      .request(app)
      .post('/api/v2/loans/1/repayment')
      .set('Authorization', `${adminToken}`)
      .send(moreAmountInfo)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('You have fully repaid your loan');
      });
  });

  it('It should not repay, when loan is not approved', () => {
    const validInfo = {
      paidAmount: 2625
    };
    chai
      .request(app)
      .post('/api/v2/loans/1/repayment')
      .set('Authorization', `${adminToken}`)
      .send(validInfo)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
      });
  });

  it('It should repay some amount on the existing loan', () => {
    const validInfo = {
      paidAmount: 2625
    };
    chai
      .request(app)
      .post('/api/v2/loans/1/repayment')
      .set('Authorization', `${adminToken}`)
      .send(validInfo)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
      });
  });

  it('should not repay some amount on the unexisting loan', () => {
    const validInfo = {
      paidAmount: 2625
    };
    chai
      .request(app)
      .post('/api/v2/loans/200/repayment')
      .set('Authorization', `${adminToken}`)
      .send(validInfo)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('Wrong Loan ID!');
      });
  });

  it('should error message for setting the Authorization header', () => {
    const validInfo = {
      paidAmount: 2625
    };
    chai
      .request(app)
      .post('/api/v2/loans/1/repayment')
      .send(validInfo)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(400);
        expect(res.body.error).to.be.a('string');
      });
  });

  it('should return error message - Only admin are allowed to perform this operation', () => {
    const validInfo = {
      paidAmount: 2625
    };
    chai
      .request(app)
      .post('/api/v2/loans/1/repayment')
      .set('Authorization', `${adminToken}`)
      .send(validInfo)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(400);
        expect(res.body.error).to.be.a('string');
      });
  });
});
