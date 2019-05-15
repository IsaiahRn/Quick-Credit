import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

import dotenv from "dotenv";
dotenv.config();

import generateToken from './Token/generateTokens';
import generate from '../helpers/jwtVerifyToken';

const {
  NewUserData2Token, UserToken, NewUserData2, missingUserInfo,
} = generateToken.signup;
const token = generate.getToken(NewUserData2Token);

chai.use(chaiHttp);


describe('POST /api/v1/auth/signup', () => {
  it('should create a new user', () => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set('Authorization', `${token}`)
      .send(NewUserData2)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal('User account created!');
        expect(res.body.data).to.be.an('object');
      });
  });

  it('User should not registered Twice with the same e-mail', () => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set('Authorization', `${token}`)
      .send(NewUserData2)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(400);
        expect(res.body.error).to.deep.equal('This e-mail is already registered!');
        expect(res.body.error).to.be.a('string');
      });
  });

  it('Once you provided any invalid values in request body, It should return an error message', () => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set('Authorization', `${token}`)
      .send(missingUserInfo)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
      });
  });
});
