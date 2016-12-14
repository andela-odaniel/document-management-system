import request from 'supertest';
import app from '../../index';

test('it can GET the dcocuments home route', () => {
  request(app)
    .get('/documents')
    .expect(200);
});
