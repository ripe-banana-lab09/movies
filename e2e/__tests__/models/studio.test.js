// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const Studio = require('../../../lib/models/studio');

describe('Studio Model', ()=> {
  it('validates a studio model', () => {
    const data = {
      name: 'Marvel',
      address: { 
        city: 'Burbank',
        state: 'California',
        country: 'USA'
      }
    };
    const studio = new Studio(data);
    const errors = studio.validateSync();
    expect(errors).toBeUndefined();

    const json = studio.toJSON();
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
    const studio = new Studio(data);
    const { errors } = studio.validateSync();
    expect(errors.name.kind).toBe('required');
  });
});