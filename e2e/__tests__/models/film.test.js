// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const Film = require('../../../lib/models/film');
const { ObjectId } = require('mongoose').Types;

describe('Film Model', ()=> {
  it('validates a film model', () => {
    const data = {
      title: 'Spider-man',
      studio: new ObjectId,
      released: 2017,
      cast: [{
        role: 'Spider-man',
        actor: new ObjectId()
      }]
    };
    const film = new Film(data);
    const errors = film.validateSync();
    expect(errors).toBeUndefined();

    const json = film.toJSON(); 
    console.log(json);
    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
      ...data,
      cast: [{
        _id: expect.any(Object)
      }]
      
    });
  });
  it.skip('enforced required fields', ()=> {
    const data = {
      studio: new mongoose.Types.ObjectId,
      released: 2017,
      cast: [{
        role: 'Spider-man',
        actor: new ObjectId()
      }]
    };
    const film = new Film(data);
    const { errors } = film.validateSync();
    expect(errors.name.kind).toBe('required');
  });
});