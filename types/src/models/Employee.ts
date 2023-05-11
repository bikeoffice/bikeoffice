import { DataTypes } from "sequelize";

export const EmployeeDefinition = {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}
