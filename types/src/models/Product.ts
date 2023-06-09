import { DataTypes } from "sequelize";

export const ProductDefinition = {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	// total price per day
	price: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	iva: {
		type: DataTypes.FLOAT,
		allowNull: false,
		defaultValue: 21,
	},
	// trick for pending to charge
	stock: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 1,
		validate: {
			min: 0,
		},
	},
};

export const ProductConfig = {
	tableName: "products",
};
