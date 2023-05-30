import { DataTypes } from "sequelize";

export type TRent = {
    id: number;
    startDate: Date;
    endDate: Date;
}

export const RentDefinition = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}

export const RentConfig = {
    tableName: 'rents'
}