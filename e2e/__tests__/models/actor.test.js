// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const Actor = require('../../../lib/models/actor');

describe('Actor Model', () => {
  it('validates an actor model', () => {
    const data = {
      name: 'Rutger Hauer',
      dob: '1944-01-23',
      pob: 'Netherlands'
    };
    const actor = new Actor(data);
    const errors = actor.validateSync();
    expect(errors).toBeUndefined();

    const json = actor.toJSON();
    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
      dob: expect.any(String),
    });
  });
});