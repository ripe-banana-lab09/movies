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
  it('gets reviewer by id', () => {
    return postReviewer(data).then(reviewer => {
      return request.get(`/api/reviewers/${reviewer._id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(reviewer);
        });
    });
  });
  it('gets all reviewers', () => {
    return Promise.all([
      postReviewer({
        name: 'Gene Siskel',
        company: 'Chicago Tribune'
      }),
      postReviewer({
        name: 'Peter Travers',
        company: 'Rolling Stone'
      })])
      .then(() => {
        return request
          .get('/api/reviewers')
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(2);
      });
  });
  
});