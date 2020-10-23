const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  born: {
    type: Number,
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book' 
  }],
  bookCount: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Author', schema)