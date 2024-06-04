const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: [true, 'Comment cannot be empty'],
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: [true, 'A book must have an ISBN'],
  },
  title: {
    type: String,
    required: [true, 'A book must have a title'],
  },
  subTitle: String,
  publish_date: Date,
  publisher: String,
  pages: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A book must have a price'],
  },
  description: String,
  website: String,
  comments: [commentSchema],
  genre: {
    type: mongoose.Schema.ObjectId,
    ref: 'Genre',
    required: [true, 'A book must have a genre'],
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
