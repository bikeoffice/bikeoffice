export function types(): string {
  return 'types';
}

export type Test = {
    message: string;
}

import { Sequelize, DataTypes, Model } from 'sequelize';
const sequelize = new Sequelize('postgres://bikeoffice:bikeoffice@localhost:5432/bikeoffice');

export const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  schema: {
      type: DataTypes.STRING,
      allowNull: false,
  }
});

export const Employee = sequelize.define('Employee', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//sequelize.createSchema('MegaRawBar', {});
//sequelize.createSchema('VeloMallorca', {});
//User.sync({force: true});
//Employee.sync({schema: 'MegaRawBar', force: true});
//Employee.sync({schema: 'VeloMallorca', force: true});
