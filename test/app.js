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
	if (latest.number !== '4') {
	  throw new Error('Expected number to be 4, but was ' + latest.number);
	}
        if (latest.name !== 'latest done') {
	  throw new Error('Expected name to be lastest done but was ' + latest.name);
	}
	if (latest.leadTime !== 2) {
	  throw new Error('Expected lead time to be 2 but was ' + latest.leadTime);
	}
	if (latest.cycleTime !== 1) {
	  throw new Error('Expected cycle time to be 1 but was ' + latest.cycleTime);
	}
      })
      .end(done);
  });
});
