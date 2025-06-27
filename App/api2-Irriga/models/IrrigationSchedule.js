const mongoose = require('mongoose');

const IrrigationScheduleSchema = new mongoose.Schema({
  zone: { type: mongoose.Schema.Types.ObjectId, ref: 'IrrigationZone' },
  startTime: Date,
  endTime: Date,
  frequency: String, // Ex: 'daily', 'weekly'
  enabled: { type: Boolean, default: true },
});

module.exports = mongoose.model('IrrigationSchedule', IrrigationScheduleSchema);