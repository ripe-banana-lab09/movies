const request = require('../../request');
const db = require('../../db');

describe('Studios Route Test', ()=> {
  beforeEach(() => {
    return db.dropCollection('studios');
  });
  const marvel = {
    name: 'Marvel',
    address: { 
      city: 'Burbank',
      state: 'California',
      country: 'USA'
    }
  };
	
  function postStudio(studio) {
    return request
      .post('/api/studios')
      .send(studio)
      .expect(200)
      .then(({ body }) => body);
  }
  it('posts a studio', () => {
    return postStudio(marvel).then(studio => {
      expect(studio).toEqual({
        _id: expect.any(String),
        __v: 0,
        ...marvel
      });
    });
  });

  it('gets a studio by id', () => {
    return postStudio(marvel).then(studio => {
      return request.get(`/api/studios/${studio._id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(studio);
        });
    });
  });
});
	

	
	// it('gets a list of studios', () => {

	// })




