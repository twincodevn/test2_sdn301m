const Book = require('../models/bookModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllBooks = catchAsync(async (req, res, next) => {
  const books = await Book.find().populate('genre');
  res.status(200).json({
    status: 'success',
    results: books.length,
    data: {
      books,
    },
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.bookId).populate('genre');
  if (!book) {
    return next(new AppError('No book found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
});

exports.addBook = catchAsync(async (req, res, next) => {
  const newBook = await Book.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      book: newBook,
    },
  });
});

exports.updateBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!book) {
    return next(new AppError('No book found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.bookId);
  if (!book) {
    return next(new AppError('No book found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getAllComments = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.bookId);
  if (!book) {
    return next(new AppError('No book found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: book.comments.length,
    data: {
      comments: book.comments,
    },
  });
});

exports.addComment = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.bookId);
  if (!book) {
    return next(new AppError('No book found with that ID', 404));
  }
  book.comments.push(req.body);
  await book.save();
  res.status(201).json({
    status: 'success',
    data: {
      comment: req.body,
    },
  });
});

exports.updateComment = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.bookId);
  if (!book) {
    return next(new AppError('No book found with that ID', 404));
  }
  const comment = book.comments.id(req.params.commentId);
  if (!comment) {
    return next(new AppError('No comment found with that ID', 404));
  }
  comment.set(req.body);
  await book.save();
  res.status(200).json({
    status: 'success',
    data: {
      comment,
    },
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.bookId);
  if (!book) {
    return next(new AppError('No book found with that ID', 404));
  }
  const comment = book.comments.id(req.params.commentId);
  if (!comment) {
    return next(new AppError('No comment found with that ID', 404));
  }
  comment.remove();
  await book.save();
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getBooksByPrice = catchAsync(async (req, res, next) => {
  const price = req.params.price;
  const books = await Book.find({ price: { $lt: price } });
  res.status(200).json({
    status: 'success',
    results: books.length,
    data: {
      books,
    },
  });
});
