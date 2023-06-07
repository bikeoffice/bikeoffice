import { DataTypes } from "sequelize";

export type TEmployee = {
	name: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
};

export const EmployeeDefinition = {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
};

export const EmployeeConfig = {
	tableName: "employees",
};
