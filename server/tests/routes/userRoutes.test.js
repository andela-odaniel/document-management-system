import supertest from 'supertest';
import app from '../../../server';

describe('User Routes', () => {
  it('should GET the users home route', (done) => {
    supertest(app)
      .get('/users')
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.text).toBe('all the users');
        expect(res.statusCode).toBe(200);
        done();
      });
  });
});
