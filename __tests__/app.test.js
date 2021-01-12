const request = require('supertest');
process.env.NODE_ENV = 'test';
const app = require('../app');

describe('/api', () => {
  describe('/topics', () => {
    it('responds with an array of topics', () => {
      request(app).get('api/topics').expect(200);
    });
  });
});
