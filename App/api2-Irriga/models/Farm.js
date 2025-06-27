const mongoose = require('mongoose');

const FarmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: String, // Pode ser endereço, coordenadas, etc.
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Farm', FarmSchema);