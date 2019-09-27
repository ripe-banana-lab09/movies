const request = require('../../request');
const db = require('../../db');

describe('Tests actor API routes', ()=> {
  beforeEach(() => {
    return db.dropCollection('actors');
  });	
  const data = {
    name: 'Rutger Hauer',
    dob: '1944-01-23',
    pob: 'Netherlands'
  };
  function postActor(actor) {
    return request
      .post('/api/actors')
      .send(actor)
      .expect(200)
      .then(({ body }) => body);		
  }
  it('posts an actor', ()=> {
    return postActor(data).then(actor => {
      expect(actor).toEqual({
        __v: 0,
        _id: expect.any(String),
        dob: expect.any(String),
        ...data,
      });
    });
  });
  it('gets actor by ID', () => {
    return postActor(data).then(actor => {
      return request.get(`/api/actors/${actor._id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(actor);
        });
    });
  });
});