const request = require('supertest');
const app = require('../server')

test('should return -1 when the value is not present', function(done) {
  request(app)
  .post('/api/login')
  .expect('Content-Type', "application/json")
  .expect('Content-Length', '15')
  .expect(400)
  .end(function(err) {
    if (err) throw err;
    done()
  });
  // expect([1, 2, 3].indexOf(4)).toBe(-1);
});