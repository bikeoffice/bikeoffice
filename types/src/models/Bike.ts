import { DataTypes } from "sequelize";

export type TBike = {
	id: number;
	name: string;
	type: string;
};

export const BikeDefinition = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	type: {
		type: DataTypes.STRING,
		allowNull: false,
	},
};

export const BikeConfig = {
	tableName: "bikes",
};
