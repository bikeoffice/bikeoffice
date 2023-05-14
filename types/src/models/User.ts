import { DataTypes } from "sequelize";

export type TUser = {
    id: number;
    name: string;
    password: string;
    schema: string;
    createdAt: Date;
    updatedAt: Date;
}

export const UserDefinition = {
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
}

export const UserConfig = {
  tableName: 'users'
}
