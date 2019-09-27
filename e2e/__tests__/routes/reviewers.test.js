const request = require('../../request');
const db = require('../../db');

describe('Reviewers Route Test', ()=> {
  beforeEach(() => {
    return db.dropCollection('reviewers');
  });
  const data = {
    name: 'Roger Ebert',
    company: 'Chicago Sun'
  };
	
  function postReviewer(reviewer) {
    return request
      .post('/api/reviewers')
      .send(reviewer)
      .expect(200)
      .then(({ body }) => body);
  }
  it('posts a reviewer', () => {
    return postReviewer(data).then(reviewer => {
      expect(reviewer).toEqual({
        _id: expect.any(String),
        __v: 0,
        ...data
      });
    });
  });
	
});