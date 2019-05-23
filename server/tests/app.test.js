import chai from 'chai';
import chaiHttp from "chai-http";
import app from '../server';

chai.use(chaiHttp);
const { expect } = chai;

describe('APP js', () => {

  it('should get welcome page successfully', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err,res) => {
        expect(res.statusCode).to.be.equal(200);
        done();
      });
  });

});