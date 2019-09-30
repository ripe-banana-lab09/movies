// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const Review = require('../../../lib/models/review');
const { ObjectId } = require('mongoose').Types;

describe('Review Model Test', () => {
  it('Validates a Review Model', ()=> {
    const data = {
      rating: 5,
      reviewer: new ObjectId(),
      review: 'It was Gud,',
      film: new ObjectId()
    };
    const review = new Review(data);
    const errors = review.validateSync();
    expect(errors).toBeUndefined();
		
    const json = review.toJSON();
    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
      rating: expect.any(Number),
      reviewer: expect.any(Object),
      review: expect.any(String),
      film: expect.any(Object),
    });
  });
  it('Enforces Required Fields', ()=> {
    const data = {
      rating: 5,
      reviewer: new mongoose.Types.ObjectId,
      review: 'It was Gud,',
      film: new mongoose.Types.ObjectId,
    };
  });
});
