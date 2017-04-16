
var mockery = require('mockery');
var request = require('supertest');
var expect = require('chai').expect;

describe('Notes', () => {

    before('init mocks', () => {
        var mock = (NoteSchema) => {
            return {
                save: (newNote) => Promise.resolve(),
                findAll: () => {
                  return Promise.resolve([  {
                    "_id": "58f3ee1bac0e2a344e470190",
                    "title": "title test",
                    "description": "lorem",
                    "__v": 0,
                    "created_at": "2017-05-30T00:00:00.000Z"
                  }])
                }                
            }
        }
        mockery.registerMock('../repository/notes_repository', mock);
        mockery.enable({
            warnOnUnregistered: false
        });
    })

    describe('GET /note/v1/notes/', () => {
      it('respond with success', done => {
        var app = require('../src/server');

        request(app)
          .get('/note/v1/notes/')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(res => {
            expect(res.body).to.have.lengthOf(1);
            expect(res.body[0].title).to.equal('title test');
            expect(res.body[0].description).to.equal('lorem');
          })
          .expect(200, done);
      });
    });    

    describe('POST /note/v1/notes/', () => {
      it('success case', done => {
        var app = require('../src/server');

        const note = {title: 'title ok', description: 'description ok'}
        request(app)
          .post('/note/v1/notes/')
          .send(note)
          .expect(200, done);
      });

      it('title is required field', done => {
        var app = require('../src/server');

        const note = {description: 'description ok'}
        request(app)
          .post('/note/v1/notes/')
          .send(note)
          .expect(res => {
            res.body.lenght = 1;
            res.body[0].param = 'title';
            res.body[0].msg = 'required';
          })
          .expect(400, done);
      });

      it('description is required field', done => {
        var app = require('../src/server');

        const note = {title: 'test'}
        request(app)
          .post('/note/v1/notes/')
          .send(note)
          .expect(res => {
            res.body.lenght = 1;
            res.body[0].param = 'description';
            res.body[0].msg = 'required';
          })
          .expect(400, done);
      });

      it('send any required field', done => {
        var app = require('../src/server');

        const note = {title: 'test'}
        request(app)
          .post('/note/v1/notes/')
          .send(note)
          .expect(res => {
            res.body.lenght = 2;
          })
          .expect(400, done);
      });  

    });

});