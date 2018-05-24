const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const User = require('../models').User;

describe('GET /user/me', () => {
  it('should return user if authenticated', done => {
    request(app)
      .get('/user/me')
      .set('x-auth', user.token)
      .expect(200)
      .expect(res => {
        expect(res.body.id).toBe(user.id);
        expect(res.body.email).toBe(user.email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', done => {
    request(app)
      .get('/user/me')
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /user', () => {
  it('should create a user', done => {
    var newUser = {
      first_name: 'Sam',
      last_name: 'Smith',
      email: 'samsmith@test.com',
      password: 'mypassword!'
    };
    request(app)
      .post('/user')
      .send(newUser)
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body.id).toBeTruthy();
        expect(res.body.email).toBe(newUser.email);
      })
      .end(err => {
        if (err) {
          return done(err);
        }

        User.findOne({ where: { email: newUser.email } }).then(user => {
          expect(user).toExist();
          expect(user.password).toNotBe(newUser.password);
          done();
        });
      });
  });

  it('should return validation errors if request invalid', done => {
    request(app)
      .post('/user')
      .send({
        email: 'and',
        password: '123'
      })
      .expect(400)
      .end(done);
  });

  it('should not create user if email in use', done => {
    request(app)
      .post('/user')
      .send({
        email: user.email,
        password: 'Password123!'
      })
      .expect(400)
      .end(done);
  });
});

describe('POST /login', () => {
  it('should log user in and return auth token in header', done => {
    request(app)
      .post('/login')
      .send({
        email: user.email,
        password: 'helloworld'
      })
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toBeTruthy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(user.id)
          .then(user => {
            expect(typeof user.token).toBe('string');
            done();
          })
          .catch(e => {
            done(e);
          });
      });
  });

  it('should not log user in if credentials invalid', done => {
    request(app)
      .post('/login')
      .send({
        email: user.email,
        password: user.password + 'random'
      })
      .expect(400)
      .expect(res => {
        expect(res.headers['x-auth']).toBeFalsy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(user.id)
          .then(user => {
            expect(user.token.length).toBe(0);
            done();
          })
          .catch(e => {
            done(e);
          });
      });
  });
});
