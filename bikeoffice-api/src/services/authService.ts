import { sequelize } from "@bikeoffice/types";

async function validateUser(username, password): Promise<boolean> {
    console.log('schemas: ', checkSchemaExists(''));
    return true;
}

async function checkSchemaExists(schemaName) {
    const schemas = await sequelize.getQueryInterface().showAllSchemas();
    return schemas;
}


export { validateUser }
