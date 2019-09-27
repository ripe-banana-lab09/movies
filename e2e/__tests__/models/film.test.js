// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const Film = require('../../../lib/models/film');
const { ObjectId } = require('mongoose').Types;

describe('Film Model', ()=> {
  it('validates a film model', () => {
    const data = {
      title: '',
      studio: [new ObjectId()],


    };
    const film = new Film(data);
    const errors = film.validateSync();
    expect(errors).toBeUndefined();

    const json = film.toJSON();
    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
    });
  });
  it('enforced required fields', ()=> {
    const data = {
      address: { 
        city: 'Burbank',
        state: 'California',
        country: 'USA'
      }
    };
    const film = new Film(data);
    const { errors } = film.validateSync();
    expect(errors.name.kind).toBe('required');
  });
});