import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../../../server';
import Role from '../../models/role.model';
import CreateTables from '../../scripts/createtables';
import DropTables from '../../scripts/droptables';
import { SeedRoles } from '../../scripts/seedrolestable';
import userFixtures from './user.fixture';

const roleData = { 1: 'admin', 2: 'regular' };
dotenv.config();

const JWT_SECRET = process.env.SECRET;
const adminToken = jwt.sign({ id: '1', username: userFixtures[0].username, role: roleData[userFixtures[0].roleId] }, JWT_SECRET);
const userToken = jwt.sign({ id: '1', username: userFixtures[1].username, role: roleData[userFixtures[1].roleId] }, JWT_SECRET);
const badToken = jwt.sign({ id: '1', username: userFixtures[1].username, role: roleData[userFixtures[1].roleId] }, 'WRONG_SECRET');

let createdUserToken = '';
let createdUser = {};
const jwtRegex = /[(\w)-]+?\.[(\w)-]+?\.([(\w)-]+)$/;

describe('User Routes', () => {
  beforeAll((done) => {
    CreateTables(done);
  });

  afterAll((done) => {
    DropTables(done);
  });

  afterAll((done) => {
    DropTables(done);
  });

  it('users not should be able to access protected routes without a token', (done) => {
    supertest(app)
      .get('/users')
      .end((err, res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Token missing');
        done();
      });
  });

  it('users not should be able to access protected routes without a wrong token', (done) => {
    supertest(app)
      .get('/users')
      .set('authorization', badToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Token authentication failed');
        done();
      });
  });


  it('regular users should be able to get a user', (done) => {
    SeedRoles(() => {
      supertest(app)
        .get('/users/1')
        .set('authorization', userToken)
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          done();
        });
    });
  });

  it('regular users not should be able to get all users', (done) => {
    supertest(app)
      .get('/users')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(403);
        done();
      });
  });

  it('admin should be able to get all users', (done) => {
    supertest(app)
      .get('/users')
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  it('a user should be able to sign up', (done) => {
    supertest(app)
      .post('/users')
      .send(userFixtures[1])
      .end((err, res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('User created successfully');
        expect(jwtRegex.test(res.body.token)).toBeTruthy();
        expect(res.body.user.username).toBe(userFixtures[1].username);
        expect(res.body.user.firstName).toBe(userFixtures[1].firstName);
        expect(res.body.user.lastName).toBe(userFixtures[1].lastName);
        createdUserToken = res.body.token;
        createdUser = res.body.user;
        done();
      });
  });


  it('a user should not be able to sign up without a password', (done) => {
    supertest(app)
      .post('/users')
      .send(userFixtures[2])
      .end((err, res) => {
        const error = JSON.parse(res.error.text);
        expect(res.statusCode).toBe(422);
        expect(error.message).toContain('password cannot be null');
        expect(error.message).toContain('password_hash cannot be null');
        done();
      });
  });

  it('a user should not be able to sign up with a password shorter than 6 characters', (done) => {
    supertest(app)
      .post('/users')
      .send(userFixtures[3])
      .end((err, res) => {
        const error = JSON.parse(res.error.text);
        expect(res.statusCode).toBe(422);
        expect(error.message).toContain('Passwords must be at least six characters');
        done();
      });
  });

  it('a user should be able to edit his information', (done) => {
    supertest(app)
      .put(`/users/${createdUser.id}`)
      .send({ firstName: 'Johnny' })
      .set('authorization', createdUserToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('User edited successfully');
        done();
      });
  });

  it('a user should not be able to edit a user that doesn\'t exist', (done) => {
    supertest(app)
      .put('/users/123456')
      .send({ firstName: 'Johnny' })
      .set('authorization', createdUserToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('User not found');
        done();
      });
  });

  it('a user should not be able to delete other users', (done) => {
    supertest(app)
      .delete(`/users/${createdUser.id}`)
      .set('authorization', createdUserToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(403);
        expect(res.body.message).toBe('You are not authorized to access the resource');
        done();
      });
  });

  it('a user should be able to login', (done) => {
    supertest(app)
      .post('/users/login')
      .send({ username: userFixtures[1].username, password: userFixtures[1].password })
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
        expect(jwtRegex.test(res.body.token)).toBeTruthy();
        expect(res.body.message).toBe('Login successful');
        done();
      });
  });

  it('a user should be not able to login with a wrong username or password', (done) => {
    supertest(app)
      .post('/users/login')
      .send({ username: 'thesandman', password: 'whimsical' })
      .end((err, res) => {
        expect(res.statusCode).toBe(403);
        expect(res.body.message).toBe('Authentication failed. Username or Password incorrect');
        done();
      });
  });

  it('a user should be not able to login without username and password', (done) => {
    supertest(app)
      .post('/users/login')
      .send({})
      .end((err, res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Please fill required fields');
        done();
      });
  });

  it('admin should be able to delete users', (done) => {
    supertest(app)
      .delete(`/users/${createdUser.id}`)
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('User deleted successfully');
        done();
      });
  });

  it('admin should not be able to delete a user that doesn\'t exist', (done) => {
    supertest(app)
      .delete('/users/123456789')
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('User not found');
        done();
      });
  });

  it('a user should be able to get her documents', (done) => {
    supertest(app)
      .get('/users/1/documents')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });
});
