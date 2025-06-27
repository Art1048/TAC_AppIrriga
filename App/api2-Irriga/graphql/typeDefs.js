const { gql } = require('apollo-server-express');

module.exports = gql`
  type Farm {
    id: ID!
    name: String!
    location: String
    createdAt: String
  }

  type IrrigationZone {
    id: ID!
    name: String!
    farm: Farm!
    sensors: [Sensor]
    area: Float
  }

  type IrrigationSchedule {
    id: ID!
    zone: IrrigationZone!
    startTime: String!
    endTime: String!
    frequency: String!
    enabled: Boolean!
  }

  type Sensor {
    id: ID!
    type: String!
    zone: IrrigationZone
    lastValue: Float
    lastUpdate: String
    unit: String
  }

  type Reservoir {
    id: ID!
    name: String!
    capacity: Float
    currentLevel: Float
    farm: Farm
    location: String
  }

  type Query {
    farms: [Farm]
    farm(id: ID!): Farm

    irrigationZones: [IrrigationZone]
    irrigationZone(id: ID!): IrrigationZone

    irrigationSchedules: [IrrigationSchedule]
    irrigationSchedule(id: ID!): IrrigationSchedule

    sensors: [Sensor]
    sensor(id: ID!): Sensor

    reservoirs: [Reservoir]
    reservoir(id: ID!): Reservoir
  }

  type Mutation {
    createFarm(name: String!, location: String): Farm
    updateFarm(id: ID!, name: String, location: String): Farm
    deleteFarm(id: ID!): Boolean

    createIrrigationZone(name: String!, farm: ID!, area: Float): IrrigationZone
    updateIrrigationZone(id: ID!, name: String, farm: ID, area: Float): IrrigationZone
    deleteIrrigationZone(id: ID!): Boolean

    createIrrigationSchedule(zone: ID!, startTime: String!, endTime: String!, frequency: String!, enabled: Boolean): IrrigationSchedule
    updateIrrigationSchedule(id: ID!, zone: ID, startTime: String, endTime: String, frequency: String, enabled: Boolean): IrrigationSchedule
    deleteIrrigationSchedule(id: ID!): Boolean

    createSensor(type: String!, zone: ID, unit: String): Sensor
    updateSensor(id: ID!, type: String, zone: ID, lastValue: Float, lastUpdate: String, unit: String): Sensor
    deleteSensor(id: ID!): Boolean

    createReservoir(name: String!, capacity: Float, currentLevel: Float, farm: ID, location: String): Reservoir
    updateReservoir(id: ID!, name: String, capacity: Float, currentLevel: Float, farm: ID, location: String): Reservoir
    deleteReservoir(id: ID!): Boolean
  }
`;