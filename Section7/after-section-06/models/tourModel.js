const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name.'],
    unique: [true, 'Tour name is already taken.']
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price.']
  },
  priceDiscount: { type: Number },
  ratingsAverage: { type: Number, default: 4.5 },
  ratingsQuantity: { type: Number, default: 0 },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty.']
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration.']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size.']
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary.']
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description.']
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image.']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  startDates: [Date]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
