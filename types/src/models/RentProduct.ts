import { DataTypes } from "sequelize";

export type TRentProduct = {

}

export const RentProductDefinition = {

    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    iva: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 21,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'rent',
    },

    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'service',
    },
}

export const RentProductConfig = {
    tableName: 'rentProducts'
}