const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Book routes
router.route('/').get(bookController.getAllBooks).post(bookController.addBook);

router.route('/:bookId').get(bookController.getBook).patch(bookController.updateBook).delete(bookController.deleteBook);

router.route('/:bookId/comments').get(bookController.getAllComments).post(bookController.addComment);

router.route('/:bookId/comments/:commentId').patch(bookController.updateComment).delete(bookController.deleteComment);

router.route('/price/:price').get(bookController.getBooksByPrice);

module.exports = router;
