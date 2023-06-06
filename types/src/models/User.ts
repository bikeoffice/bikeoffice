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
  username: {
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
  },
  logo: {
      type: DataTypes.STRING,
      allowNull: true,
  },
  address: {
      type: DataTypes.STRING,
      allowNull: true,
  },
  city: {
      type: DataTypes.STRING,
      allowNull: true,
  },

  tel: {
      type: DataTypes.STRING,
      allowNull: true,
  },
  website: {
      type: DataTypes.STRING,
      allowNull: true,
  },
}

export const UserConfig = {
  tableName: 'users'
}
