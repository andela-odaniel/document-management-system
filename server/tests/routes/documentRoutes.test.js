import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../../../server';
import CreateTables from '../../scripts/createtables';
import DropTables from '../../scripts/droptables';
import userFixtures from './user.fixture';
import documentFixtures from './document.fixture';

const roleData = { 1: 'admin', 2: 'regular' };
dotenv.config();

const JWT_SECRET = process.env.SECRET;
const adminToken = jwt.sign({ id: '1', username: userFixtures[0].username, role: roleData[userFixtures[0].roleId] }, JWT_SECRET);
const userToken = jwt.sign({ id: '1', username: userFixtures[1].username, role: roleData[userFixtures[1].roleId] }, JWT_SECRET);
let createdDocument = '';
let secondCreatedDocument = '';

describe('Document Routes', () => {
  beforeAll((done) => {
    CreateTables(done);
  });

  afterAll((done) => {
    DropTables(done);
  });


  it('an authorized user should be able to add a document', () => {
    supertest(app)
      .post('/documents')
      .send(documentFixtures[0])
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Document created successfully');
        expect(res.body.document.title).toBe(documentFixtures[0].title);
        expect(res.body.document.access).toBe(documentFixtures[0].access);
        expect(res.body.document.content).toBe(documentFixtures[0].content);
        createdDocument = res.body.document;
      });
  });

  it('an authorized user should not be able to add a duplicate document', () => {
    supertest(app)
      .post('/documents')
      .send(documentFixtures[1])
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Document created successfully');
        secondCreatedDocument = res.body.document;
        supertest(app)
          .post('/documents')
          .send(documentFixtures[1])
          .set('authorization', adminToken)
          .end((err, res) => {
            expect(res.statusCode).toBe(422);
          });
      });
  });

  it('an authorized user should be able to get a document', () => {
    supertest(app)
      .get(`/documents/${createdDocument.id}`)
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
      });
  });

  it('an authorized user should not be able to get a private document', () => {
    supertest(app)
      .get(`/documents/${secondCreatedDocument.id}`)
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
      });
  });

  it('an admin user should be able to get all documents', () => {
    supertest(app)
      .get('/documents')
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
      });
  });


  it('an regular user should be not able to get all documents', () => {
    supertest(app)
      .get('/documents')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(403);
      });
  });

  it('an regular user should be able to get all documents for his role', () => {
    supertest(app)
      .get(`/documents/${userToken.role}`)
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
      });
  });

  it('an admin user should be able to get all documents', () => {
    supertest(app)
      .get('/documents')
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
      });
  });

  it('an authorized user should be able to edit his document', () => {
    supertest(app)
      .put(`/documents/${createdDocument.id}`)
      .send({ title: 'malarkey' })
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Document edited successfully');
      });
  });

  it('an authorized user should not be able to edit another user\'s document', () => {
    supertest(app)
      .put(`/documents/${createdDocument.id}`)
      .send({ title: 'malarkey' })
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(404);
      });
  });

  it('an authorized user should be able to delete his document', () => {
    supertest(app)
      .delete(`/documents/${createdDocument.id}`)
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
      });
  });

  it('an authorized user should not be able to delete another user\'s document', () => {
    supertest(app)
      .delete(`/documents/${secondCreatedDocument.id}`)
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(404);
      });
  });
});
