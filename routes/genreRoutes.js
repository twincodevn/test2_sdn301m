const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');

router.route('/').get(genreController.getAllGenres).post(genreController.addGenre);

router.route('/:genreId').get(genreController.getGenre).patch(genreController.updateGenre).delete(genreController.deleteGenre);

module.exports = router;
