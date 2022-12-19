const express = require('express')
const router = express.Router()
const bookController = require('../controllers/Library.controller');

// Retrieve all books
router.get('/', bookController.findAll);

// Create a new book
router.post('/', bookController.create);

// Retrieve a single book with id
router.get('/searchBook', bookController.search);

// Delete a book with id
router.delete('/removeBook', bookController.delete);

module.exports = router