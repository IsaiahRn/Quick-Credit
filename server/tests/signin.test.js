import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';
import generate from '../helpers/jwtVerifyToken';
import generateToken from './Token/generateTokens';

const { UserLogin } = generateToken.login;
const { NewUserData, UserToken } = generateToken.signup;
const token = generate.getToken(UserToken);

chai.use(chaiHttp);

before('Before User make login, should first make signup', () => {
  chai
    .request(app)
    .post('/api/v2/auth/signup')
    .set('Authorization', `${token}`)
    .send(NewUserData)
    .end((err, res) => {
      expect(res.body).to.be.an('object');
    });
});

describe('POST /api/v2/auth/login', () => {
  it('Should login a client', () => {
    chai
      .request(app)
      .post('/api/v2/auth/login')
      .set('Authorization', `${token}`)
      .send(UserLogin)
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.deep.equal('Login successful!');
      });
  });

  it('Should return email field is required', () => {
    chai
      .request(app)
      .post('/api/v2/auth/login')
      .set('Authorization', `${token}`)
      .send({ password: 'Own1234@56789' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
      });
  });

  it('Should return password field is required', () => {
    chai
      .request(app)
      .post('/api/v2/auth/login')
      .set('Authorization', `${token}`)
      .send({ email: 'joe.test@gmail.com' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
      });
  });

  it('it should return error message, Once you provided the unregistered email', () => {
    chai
      .request(app)
      .post('/api/v2/auth/login')
      .set('Authorization', `${token}`)
      .send({ email: 'joe.test@gmail.com', password: '1234568686' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('This e-mail is not yet registered!');
      });
  });

});
