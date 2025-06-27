const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
  type: String, // Ex: 'humidity', 'rain', 'temperature'
  zone: { type: mongoose.Schema.Types.ObjectId, ref: 'IrrigationZone' },
  lastValue: Number,
  lastUpdate: Date,
  unit: String, // Ex: '%', 'mm', '°C'
});

module.exports = mongoose.model('Sensor', SensorSchema);