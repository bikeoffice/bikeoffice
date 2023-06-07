import { DataTypes } from "sequelize";

export const BikeDetailDefinition = {
	sizeId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	price: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	stock: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			min: 0,
		},
	},
};

export const BikeDetailConfig = {
	tableName: "bikeDetails",
};
