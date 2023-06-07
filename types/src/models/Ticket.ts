import { DataTypes } from "sequelize";

export const TicketProductsDefinition = {
	quantity: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	modifiedPrice: {
		type: DataTypes.FLOAT,
		allowNull: true,
		defaultValue: null,
	},
	discount: {
		type: DataTypes.FLOAT,
		allowNull: false,
		defaultValue: 0,
	},
};

export const TicketDefinition = {
	status: {
		type: DataTypes.ENUM("open", "closed"),
		allowNull: false,
		defaultValue: "open",
	},
	payment: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "cash",
	},
	cashAmount: {
		type: DataTypes.FLOAT,
		allowNull: true,
		defaultValue: null,
	},
	total: {
		type: DataTypes.FLOAT,
		allowNull: false,
		defaultValue: 0,
	},
	discount: {
		type: DataTypes.FLOAT,
		allowNull: false,
		defaultValue: 0,
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW,
	},
};
