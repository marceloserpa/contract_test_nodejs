

var request = require('supertest');
var app = require('../src/server');
var assert = require('assert');

describe('GET /note/v1/notes/', function() {
  it('respond with success', function(done) {
    request(app)
      .get('/note/v1/notes/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('POST /note/v1/notes/', function() {
  it('success case', function(done) {
    const note = {title: 'title ok', description: 'description ok'}
    request(app)
      .post('/note/v1/notes/')
      .send(note)
      .expect(200, done);
  });

  it('should throw errors', function(done) {
    const note = {description: 'description ok'}
    request(app)
      .post('/note/v1/notes/')
      .send(note)
      .expect(400, done);
  });
});