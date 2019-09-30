const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  reviewer: {
    type: ObjectId,
    ref: 'Reviewer'
  },
  review: {
    type: String,
    required: true,
    maxlength: 140, 
  },
  film: {
    type: ObjectId,
    ref: 'film'
  },

});

module.exports = mongoose.model('Review', schema);