import { DataTypes } from "sequelize";

export const BikeSizeDefinition = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},

	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
};

export const BikeSizeConfig = {
	tableName: "bikeSizes",
};
