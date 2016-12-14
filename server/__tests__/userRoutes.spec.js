import request from 'supertest';
import app from '../../index';

test('it can GET the users home route', () => {
  request(app)
    .get('/users')
    .expect(200);
});
