import { DataTypes } from "sequelize";

export const ProductDefinition = {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  iva: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}
