const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A genre must have a name'],
  },
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;
