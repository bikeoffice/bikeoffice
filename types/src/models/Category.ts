import { DataTypes } from "sequelize"

export const CategoryDefinition = {
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
        type:DataTypes.STRING,
        allowNull: false
    }
}

export const CategoryConfig = {
    tableName: 'categories'
}