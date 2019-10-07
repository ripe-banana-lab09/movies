// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const Reviewer = require('../../../lib/models/reviewer');

describe('Reviewer Model', ()=> {
  it('Validates a Reviewer Model', ()=> {
    const data = {
      name: 'Roger Ebert',
      company: 'Chicago Sun'
    };
    const reviewer = new Reviewer(data);
    const errors = reviewer.validateSync();
    expect(errors).toBeUndefined();
		
    const json = reviewer.toJSON();
    expect(json).toEqual({
      ...data,
      _id: expect.any(Object)
    });
		
  });


});