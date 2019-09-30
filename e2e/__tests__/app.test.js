const request = require('../request');

describe('test to see we have an app', ()=> {
  it('works?', ()=> {
    return request
      .get('/hello')
      .expect(200)
      .then(res => {
        expect(res.text).toBe('hellloooo, you alive in there? What you got thats worth living for?');
      });
  });
});