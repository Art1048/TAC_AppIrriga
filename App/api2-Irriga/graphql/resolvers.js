const Farm = require('../models/Farm');
const IrrigationZone = require('../models/IrrigationZone');
const IrrigationSchedule = require('../models/IrrigationSchedule');
const Sensor = require('../models/Sensor');
const Reservoir = require('../models/Reservoir');

module.exports = {
  Query: {
    farms: async () => await Farm.find(),
    farm: async (_, { id }) => await Farm.findById(id),

    irrigationZones: async () => await IrrigationZone.find().populate('farm sensors'),
    irrigationZone: async (_, { id }) => await IrrigationZone.findById(id).populate('farm sensors'),

    irrigationSchedules: async () => await IrrigationSchedule.find().populate('zone'),
    irrigationSchedule: async (_, { id }) => await IrrigationSchedule.findById(id).populate('zone'),

    sensors: async () => await Sensor.find().populate('zone'),
    sensor: async (_, { id }) => await Sensor.findById(id).populate('zone'),

    reservoirs: async () => await Reservoir.find().populate('farm'),
    reservoir: async (_, { id }) => await Reservoir.findById(id).populate('farm'),
  },
  Mutation: {
    createFarm: async (_, { name, location }) => {
      const farm = new Farm({ name, location });
      return await farm.save();
    },
    updateFarm: async (_, { id, ...fields }) => {
      return await Farm.findByIdAndUpdate(id, fields, { new: true });
    },
    deleteFarm: async (_, { id }) => {
      await Farm.findByIdAndDelete(id);
      return true;
    },

    createIrrigationZone: async (_, { name, farm, area }) => {
      const zone = new IrrigationZone({ name, farm, area });
      return await zone.save();
    },
    updateIrrigationZone: async (_, { id, ...fields }) => {
      return await IrrigationZone.findByIdAndUpdate(id, fields, { new: true });
    },
    deleteIrrigationZone: async (_, { id }) => {
      await IrrigationZone.findByIdAndDelete(id);
      return true;
    },

    createIrrigationSchedule: async (_, { zone, startTime, endTime, frequency, enabled }) => {
      const schedule = new IrrigationSchedule({ zone, startTime, endTime, frequency, enabled });
      return await schedule.save();
    },
    updateIrrigationSchedule: async (_, { id, ...fields }) => {
      return await IrrigationSchedule.findByIdAndUpdate(id, fields, { new: true });
    },
    deleteIrrigationSchedule: async (_, { id }) => {
      await IrrigationSchedule.findByIdAndDelete(id);
      return true;
    },

    createSensor: async (_, { type, zone, unit }) => {
      const sensor = new Sensor({ type, zone, unit });
      return await sensor.save();
    },
    updateSensor: async (_, { id, ...fields }) => {
      return await Sensor.findByIdAndUpdate(id, fields, { new: true });
    },
    deleteSensor: async (_, { id }) => {
      await Sensor.findByIdAndDelete(id);
      return true;
    },

    createReservoir: async (_, { name, capacity, currentLevel, farm, location }) => {
      const reservoir = new Reservoir({ name, capacity, currentLevel, farm, location });
      return await reservoir.save();
    },
    updateReservoir: async (_, { id, ...fields }) => {
      return await Reservoir.findByIdAndUpdate(id, fields, { new: true });
    },
    deleteReservoir: async (_, { id }) => {
      await Reservoir.findByIdAndDelete(id);
      return true;
    },
  },
};