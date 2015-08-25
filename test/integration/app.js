import request from 'supertest';
import app from '../../app';

describe('application', () => {
  it('is up', (done) => {
    request(app)
      .get('/ping')
      .expect('pong')
      .expect(200, done);
  });
});
