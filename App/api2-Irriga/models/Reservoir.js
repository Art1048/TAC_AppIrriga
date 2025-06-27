const mongoose = require('mongoose');

const ReservoirSchema = new mongoose.Schema({
  name: String,
  capacity: Number, // Capacidade total em litros
  currentLevel: Number, // Nível atual em litros
  farm: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm' },
  location: String,
});

module.exports = mongoose.model('Reservoir', ReservoirSchema);