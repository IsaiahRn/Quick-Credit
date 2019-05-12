import request from 'supertest';
import chai from 'chai';
import app from '../server';

const { expect } = chai;

describe('APP js', () => {
  it('should get welcome page successfully', (done) => {
    request(app)
      .get('/')
      .then((res) => {
        expect(res.status).to.be.equal(200);
        done();
      })
      .catch(error => done(error));
  });
  it('should not get welcome page successfully', (done) => {
    request(app)
      .get('/api/v1/home')
      .then((res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body).to.have.property('error');
        done();
      })
      .catch(error => done(error));
  });
});
