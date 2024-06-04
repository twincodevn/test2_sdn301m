const Genre = require('../models/genreModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllGenres = catchAsync(async (req, res, next) => {
  const genres = await Genre.find();
  res.status(200).json({
    status: 'success',
    results: genres.length,
    data: {
      genres,
    },
  });
});

exports.getGenre = catchAsync(async (req, res, next) => {
  const genre = await Genre.findById(req.params.genreId);
  if (!genre) {
    return next(new AppError('No genre found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      genre,
    },
  });
});

exports.addGenre = catchAsync(async (req, res, next) => {
  const newGenre = await Genre.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      genre: newGenre,
    },
  });
});

exports.updateGenre = catchAsync(async (req, res, next) => {
  const genre = await Genre.findByIdAndUpdate(req.params.genreId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!genre) {
    return next(new AppError('No genre found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      genre,
    },
  });
});

exports.deleteGenre = catchAsync(async (req, res, next) => {
  const genre = await Genre.findByIdAndDelete(req.params.genreId);
  if (!genre) {
    return next(new AppError('No genre found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
