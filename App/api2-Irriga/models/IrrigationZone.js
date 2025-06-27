const mongoose = require('mongoose');

const IrrigationZoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  farm: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Farm',
    required: true
  },
  sensors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sensor'
  }],
  area: Number // área em metros quadrados, por exemplo
});

module.exports = mongoose.model('IrrigationZone', IrrigationZoneSchema);