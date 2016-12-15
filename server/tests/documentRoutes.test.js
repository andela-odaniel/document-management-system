import supertest from 'supertest';
import app from '../../server';


describe('Document Routes', () => {
  it('GETs the documents home route', (done) => {
    supertest(app)
      .get('/documents')
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.text).toBe('all the documents');
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  it('should fail for non existing routes', (done) => {
    supertest(app)
      .get('/not-existent')
      .end((err, res) => {
        expect(res.statusCode).toBe(400);
        done();
      });
  });
});
