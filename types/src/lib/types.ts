import { Sequelize } from 'sequelize';
import { UserConfig, UserDefinition } from '../models/User';
import { EmployeeConfig, EmployeeDefinition } from '../models/Employee';
export const sequelize = new Sequelize('postgres://bikeoffice:bikeoffice@localhost:5432/bikeoffice');

export const Employee = sequelize.define('Employee', EmployeeDefinition, EmployeeConfig);
export const User = sequelize.define('User', UserDefinition, UserConfig);

User.sync();

