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

    // aqui va un id a Category (donde ya me relaciona name y type)

    // aqui hay un stock => 1 = abierto, 0 = cobrado

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