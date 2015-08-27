import request from 'supertest';
import app from '../app';

describe('application', () => {
  it('is up', (done) => {
    request(app)
      .get('/ping')
      .expect(200)
      .expect('pong')
      .end(done);
  });

  it('serves cycle time api', (done) => {
    request(app)
      .get('/api/cycle-times')
      .expect(200)
      .expect((res) => {
        var latest = res.body.stories[0];
        if (latest.name !== 'latest done') {
	  throw new Error('Expected last name to be lastest done but was ' + latest.name);
	}
       })
      .end(done);
  });
});
