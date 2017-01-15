import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../../../server';
import CreateTables from '../../scripts/createtables';
import DropTables from '../../scripts/droptables';
import { SeedRoles, UnseedRoles } from '../../scripts/seedrolestable';
import roleFixtures from './role.fixture';
import userFixtures from './user.fixture';

dotenv.config();

const roleData = { 1: 'admin', 2: 'regular' };

const JWT_SECRET = process.env.SECRET;
const adminToken = jwt.sign({ id: '1', username: userFixtures[0].username, role: roleData[userFixtures[0].roleId] }, JWT_SECRET);
const userToken = jwt.sign({ id: '1', username: userFixtures[1].username, role: roleData[userFixtures[1].roleId] }, JWT_SECRET);

describe('Role Routes', () => {
  beforeAll((done) => {
    CreateTables(done);
  });

  beforeEach((done) => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    SeedRoles(done);
  });

  afterEach((done) => {
    UnseedRoles(done);
  });

  afterAll((done) => {
    DropTables(done);
  });

  it('admin should be able to create a new role', (done) => {
    supertest(app)
      .post('/roles')
      .send(roleFixtures[0])
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Role created successfully');
        done();
      });
  });

  it('admin should not be able to create a duplicate role', (done) => {
    supertest(app)
      .post('/roles')
      .send(roleFixtures[0])
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Role created successfully');
        supertest(app)
          .post('/roles')
          .send(roleFixtures[0])
          .set('authorization', adminToken)
          .end((err, res) => {
            expect(res.statusCode).toBe(422);
            expect(res.body.message).toBe('This role already exists in the database');
            done();
          });
      });
  });

  it('admin should be able to get all roles', (done) => {
    supertest(app)
      .get('/roles/')
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  it('admin should be able to delete a role', (done) => {
    supertest(app)
      .delete('/roles/2')
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Role deleted successfully');
        done();
      });
  });

  it('admin should not be able to delete a role that doesn\'t exist', (done) => {
    supertest(app)
      .delete('/roles/123456789')
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('Role not found');
        done();
      });
  });

  it('regular users should not be able to create a new role', (done) => {
    supertest(app)
      .post('/roles')
      .send(roleFixtures[0])
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(403);
        expect(res.body.message).toBe('You are not authorized to access the resource');
        done();
      });
  });

  it('regular users should be able to get a role', (done) => {
    supertest(app)
      .get('/roles/1')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  it('regular users should not be able to get all roles', (done) => {
    supertest(app)
      .get('/roles')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(403);
        expect(res.body.message).toBe('You are not authorized to access the resource');
        done();
      });
  });

  it('regular users should be not able to delete a role', (done) => {
    supertest(app)
      .delete('/roles/1')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(403);
        expect(res.body.message).toBe('You are not authorized to access the resource');
        done();
      });
  });
});
