import { DataTypes } from "sequelize"

export const CategoryDefinition = {
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
