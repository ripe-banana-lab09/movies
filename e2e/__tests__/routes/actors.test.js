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
  it('gets all actors', () => {
    return Promise.all([
      postActor({
        name: 'Tom Holland',
        dob: '1996-06-01',
        pob: 'United Kingdom'
      }),
      postActor({
        name: 'Robert Downey Jr.',
        dob: '1965-04-04',
        pob: 'United States'
      })])
      .then(() => {
        return request
          .get('/api/actors')
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(2);
      });
  });
  it('Deletes an Actor', () => {
    return postActor(data).then(actor => {
      return request.delete(`/api/actors/${actor._id}`).expect(200);
    });
  });
});